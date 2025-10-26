import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rate-limit'
import { validateEmail, validatePhone, sanitizeInput } from '@/lib/security'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// Rate limiting configuration
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const identifier = request.url ?? 'anonymous'
    const isRateLimited = await limiter.check(identifier, 5) // 5 requests per minute
    
    if (isRateLimited) {
      return NextResponse.json(
        { 
          error: 'Trop de tentatives. Veuillez réessayer dans 1 minute.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      )
    }

    // Validate content type
    const contentType = request.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { 
          error: 'Type de contenu non supporté',
          code: 'INVALID_CONTENT_TYPE'
        },
        { status: 415 }
      )
    }

    // Parse and validate request body
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      return NextResponse.json(
        { 
          error: 'Données JSON invalides',
          code: 'INVALID_JSON'
        },
        { status: 400 }
      )
    }

    const { nom, telephone, email, sujet, message } = body

    // Comprehensive validation
    const validationErrors = validateContactForm({ nom, telephone, email, sujet, message })
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Données du formulaire invalides',
          details: validationErrors,
          code: 'VALIDATION_FAILED'
        },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      nom: sanitizeInput(nom),
      telephone: sanitizeInput(telephone),
      email: sanitizeInput(email).toLowerCase(),
      sujet: sanitizeInput(sujet),
      message: sanitizeInput(message)
    }

    // Check for spam patterns
    // if (isPotentialSpam(sanitizedData)) {
    //   return NextResponse.json(
    //     { 
    //       error: 'Message détecté comme potentiel spam',
    //       code: 'POTENTIAL_SPAM'
    //     },
    //     { status: 400 }
    //   )
    // }

    // Send email to Vision Business Microfinance with retry logic
    let businessEmailResult
    try {
      businessEmailResult = await resend.emails.send({
        from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
        to: [process.env.CONTACT_EMAIL!],
        replyTo: sanitizedData.email,
        subject: `📩 Nouveau Contact: ${getSubjectLabel(sanitizedData.sujet)} - ${sanitizedData.nom}`,
        html: generateBusinessEmailHTML(sanitizedData),
        text: generateBusinessEmailText(sanitizedData),
        tags: [
          { name: 'category', value: 'contact-form' },
          { name: 'priority', value: 'high' }
        ],
      })

      if (businessEmailResult.error) {
        throw new Error(businessEmailResult.error.message)
      }
    } catch (emailError) {
      console.error('Business email error:', emailError)
      // Don't fail the request if business email fails, but log it
    }

    // Send confirmation email to client/user
    try {
      await resend.emails.send({
        from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
        to: [sanitizedData.email],
        subject: '✅ Confirmation de Réception - Vision Business',
        html: generateConfirmationEmailHTML(sanitizedData),
        text: generateConfirmationEmailText(sanitizedData),
        tags: [
          { name: 'category', value: 'confirmation' },
          { name: 'priority', value: 'medium' }
        ],
      })
    } catch (confirmationError) {
      console.error('Confirmation email error:', confirmationError)
      // Continue even if confirmation email fails
    }

    // Log successful submission (for analytics)
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      name: sanitizedData.nom,
      email: sanitizedData.email,
      subject: sanitizedData.sujet,
      businessEmailSent: !!businessEmailResult?.data?.id
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message envoyé avec succès',
        id: businessEmailResult?.data?.id,
        timestamp: new Date().toISOString()
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': '4'
        }
      }
    )

  } catch (error) {
    console.error('Contact form API error:', {
      error,
      timestamp: new Date().toISOString(),
      ip: request.url,
      userAgent: request.headers.get('user-agent')
    })

    return NextResponse.json(
      { 
        error: 'Erreur interne du serveur',
        code: 'INTERNAL_SERVER_ERROR',
        reference: `ERR-${Date.now()}`
      },
      { status: 500 }
    )
  }
}

// Security and Validation Functions
function validateContactForm(data: { nom: string; telephone: string; email: string; sujet: string; message: string }): string[] {
  const errors: string[] = []

  // Name validation
  if (!data.nom?.trim()) {
    errors.push('Le nom est requis')
  } else if (data.nom.length < 2) {
    errors.push('Le nom doit contenir au moins 2 caractères')
  } else if (data.nom.length > 100) {
    errors.push('Le nom ne peut pas dépasser 100 caractères')
  } else if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(data.nom)) {
    errors.push('Le nom contient des caractères non autorisés')
  }

  // Phone validation
  if (!data.telephone?.trim()) {
    errors.push('Le téléphone est requis')
  } else if (!validatePhone(data.telephone)) {
    errors.push('Le format du téléphone est invalide')
  }

  // Email validation
  if (!data.email?.trim()) {
    errors.push('L\'email est requis')
  } else if (!validateEmail(data.email)) {
    errors.push('L\'adresse email est invalide')
  } else if (data.email.length > 254) {
    errors.push('L\'email est trop long')
  }

  // Subject validation
  const validSubjects = ['demande-pret', 'information', 'reclamation', 'partenariat', 'carriere', 'autre']
  if (!data.sujet || !validSubjects.includes(data.sujet)) {
    errors.push('Le sujet sélectionné est invalide')
  }

  // Message validation
  if (!data.message?.trim()) {
    errors.push('Le message est requis')
  } else if (data.message.length < 10) {
    errors.push('Le message doit contenir au moins 10 caractères')
  } else if (data.message.length > 2000) {
    errors.push('Le message ne peut pas dépasser 2000 caractères')
  } else if (data.message.trim().split(/\s+/).length > 400) {
    errors.push('Le message est trop long')
  }

  return errors
}

function isPotentialSpam(data: { nom: string; email: string; message: string }): boolean {
  const spamIndicators = [
    // URL patterns
    /https?:\/\//i,
    /www\./i,
    /\.(com|net|org|info|biz)/i,
    
    // Common spam keywords
    /\b(viagra|cialis|casino|porn|sex|loan|money)\b/i,
    
    // Excessive capitalization
    /[A-Z]{5,}/,
    
    // Suspicious patterns
    /[!@#$%^&*()]{3,}/,
    /\b\d{10,}\b/,
  ]

  const content = `${data.nom} ${data.email} ${data.message}`.toLowerCase()
  
  return spamIndicators.some(pattern => pattern.test(content))
}

// Email Template Functions
function getSubjectLabel(sujet: string): string {
  const subjects: { [key: string]: string } = {
    'demande-pret': 'Demande de Prêt',
    'information': 'Demande d\'Information',
    'reclamation': 'Réclamation Client',
    'partenariat': 'Demande de Partenariat',
    'carriere': 'Candidature Spontanée',
    'autre': 'Autre Demande'
  }
  return subjects[sujet] || 'Demande de Contact'
}

function generateBusinessEmailHTML(data: { nom: string; telephone: string; email: string; sujet: string; message: string }): string {
  const subjectLabel = getSubjectLabel(data.sujet)
  const timestamp = new Date().toLocaleString('fr-FR', {
    timeZone: 'Africa/Kinshasa',
    dateStyle: 'full',
    timeStyle: 'medium'
  })

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau Message de Contact - Vision Business</title>
    <style>
        /* Reset and base styles */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; 
            line-height: 1.6; 
            color: #1f2937; 
            background: #f8fafc;
            -webkit-font-smoothing: antialiased;
        }
        
        /* Container */
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        /* Header */
        .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            padding: 40px 30px; 
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,0 L100,100 Z" fill="rgba(255,255,255,0.1)"/></svg>');
            background-size: cover;
        }
        .header h1 { 
            font-size: 28px; 
            font-weight: 700;
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
        }
        .header p { 
            font-size: 16px; 
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        
        /* Content */
        .content { 
            padding: 40px 30px; 
        }
        
        /* Alert badge */
        .alert-badge {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            padding: 12px 20px;
            border-radius: 12px;
            margin-bottom: 30px;
            text-align: center;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }
        
        /* Info grid */
        .info-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            margin-bottom: 30px;
        }
        @media (min-width: 480px) {
            .info-grid {
                grid-template-columns: 1fr 1fr;
            }
        }
        .info-item {
            background: #f8fafc;
            padding: 20px;
            border-radius: 12px;
            border-left: 4px solid #667eea;
        }
        .info-label {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            color: #667eea;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
        }
        .info-value {
            font-size: 16px;
            font-weight: 500;
            color: #1f2937;
        }
        
        /* Message section */
        .message-section {
            background: #f8fafc;
            padding: 25px;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }
        .message-label {
            font-size: 14px;
            font-weight: 600;
            color: #667eea;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .message-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #10b981;
            font-size: 15px;
            line-height: 1.7;
            color: #374151;
            white-space: pre-wrap;
        }
        
        /* Metadata */
        .metadata {
            background: #f1f5f9;
            padding: 20px;
            border-radius: 12px;
            margin-top: 30px;
            font-size: 13px;
            color: #64748b;
        }
        .metadata-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        .metadata-item:last-child {
            margin-bottom: 0;
        }
        
        /* Footer */
        .footer { 
            background: #1e293b;
            color: #cbd5e1;
            padding: 30px;
            text-align: center;
            font-size: 13px;
        }
        .footer-logo {
            font-size: 20px;
            font-weight: 700;
            color: white;
            margin-bottom: 12px;
        }
        .footer-contact {
            margin: 15px 0;
            line-height: 1.6;
        }
        .footer-links {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #334155;
        }
        .footer-links a {
            color: #60a5fa;
            text-decoration: none;
            margin: 0 10px;
        }
        .footer-links a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>📩 Nouveau Message de Contact</h1>
            <p>Vision Business Microfinance</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Alert Badge -->
            <div class="alert-badge">
                🚀 Action Requise - Nouvelle demande de contact
            </div>
            
            <!-- Contact Information -->
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Nom Complet</div>
                    <div class="info-value">${data.nom}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Téléphone</div>
                    <div class="info-value">
                        <a href="tel:${data.telephone}" style="color: #1f2937; text-decoration: none;">
                            ${data.telephone}
                        </a>
                    </div>
                </div>
                <div class="info-item">
                    <div class="info-label">Email</div>
                    <div class="info-value">
                        <a href="mailto:${data.email}" style="color: #1f2937; text-decoration: none;">
                            ${data.email}
                        </a>
                    </div>
                </div>
                <div class="info-item">
                    <div class="info-label">Sujet</div>
                    <div class="info-value">
                        <span style="background: #667eea; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">
                            ${subjectLabel}
                        </span>
                    </div>
                </div>
            </div>
            
            <!-- Message -->
            <div class="message-section">
                <div class="message-label">Message</div>
                <div class="message-content">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
            
            <!-- Metadata -->
            <div class="metadata">
                <div class="metadata-item">
                    <span>Heure de réception:</span>
                    <span><strong>${timestamp}</strong></span>
                </div>
                <div class="metadata-item">
                    <span>Source:</span>
                    <span>Formulaire de Contact Website</span>
                </div>
                <div class="metadata-item">
                    <span>Priorité:</span>
                    <span style="color: #dc2626; font-weight: 600;">Élevée</span>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-logo">Vision Business</div>
            <div class="footer-contact">
                Gombe, Kinshasa - République Démocratique du Congo<br>
                📧 contact@visionbusiness.cd | 📞 +243 81 234 5678
            </div>
            <div class="footer-links">
                <a href="https://visionbusiness.cd">Website</a> • 
                <a href="https://visionbusiness.cd/contact">Contact</a> • 
                <a href="https://visionbusiness.cd/privacy">Confidentialité</a>
            </div>
            <div style="margin-top: 15px; color: #94a3b8;">
                © ${new Date().getFullYear()} Vision Business Microfinance. Tous droits réservés.<br>
                <small>Cet email a été généré automatiquement. Merci de ne pas y répondre.</small>
            </div>
        </div>
    </div>
</body>
</html>
  `
}

function generateBusinessEmailText(data: { nom: string; telephone: string; email: string; sujet: string; message: string }): string {
  const subjectLabel = getSubjectLabel(data.sujet)
  const timestamp = new Date().toLocaleString('fr-FR', {
    timeZone: 'Africa/Kinshasa',
    dateStyle: 'full',
    timeStyle: 'medium'
  })

  return `
🚀 NOUVEAU MESSAGE DE CONTACT - VISION BUSINESS

========================================================================
                            ACTION REQUISE
========================================================================

📋 INFORMATIONS DU CONTACT:
────────────────────────────────────────────────────────────────────────
Nom Complet: ${data.nom}
Téléphone: ${data.telephone}
Email: ${data.email}
Sujet: ${subjectLabel}

📝 MESSAGE:
────────────────────────────────────────────────────────────────────────
${data.message}

📊 MÉTADONNÉES:
────────────────────────────────────────────────────────────────────────
Heure de réception: ${timestamp}
Source: Formulaire de Contact Website
Priorité: Élevée

🔒 INFORMATIONS DE CONTACT:
────────────────────────────────────────────────────────────────────────
Vision Business Microfinance
Gombe, Kinshasa - République Démocratique du Congo
Email: contact@visionbusiness.cd
Téléphone: +243 81 234 5678

────────────────────────────────────────────────────────────────────────
© ${new Date().getFullYear()} Vision Business Microfinance
Cet email a été généré automatiquement.
  `
}

function generateConfirmationEmailHTML(data: { nom: string }): string {
  const timestamp = new Date().toLocaleString('fr-FR', {
    timeZone: 'Africa/Kinshasa',
    dateStyle: 'full',
    timeStyle: 'medium'
  })

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation de Réception - Vision Business</title>
    <style>
        /* Reset and base styles */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; 
            line-height: 1.6; 
            color: #1f2937; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            -webkit-font-smoothing: antialiased;
        }
        
        /* Container */
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        /* Header */
        .header { 
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white; 
            padding: 50px 30px; 
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,0 L100,100 Z" fill="rgba(255,255,255,0.1)"/></svg>');
            background-size: cover;
        }
        .success-icon {
            font-size: 64px;
            margin-bottom: 20px;
            display: block;
            position: relative;
            z-index: 1;
        }
        .header h1 { 
            font-size: 32px; 
            font-weight: 700;
            margin-bottom: 12px;
            position: relative;
            z-index: 1;
        }
        .header p { 
            font-size: 18px; 
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        
        /* Content */
        .content { 
            padding: 50px 40px; 
        }
        
        /* Welcome section */
        .welcome-section {
            text-align: center;
            margin-bottom: 40px;
        }
        .welcome-section h2 {
            font-size: 24px;
            color: #10b981;
            margin-bottom: 16px;
            font-weight: 600;
        }
        .welcome-section p {
            font-size: 16px;
            color: #6b7280;
            line-height: 1.7;
        }
        
        /* Next steps */
        .next-steps {
            background: #f8fafc;
            padding: 30px;
            border-radius: 16px;
            margin: 40px 0;
        }
        .next-steps h3 {
            text-align: center;
            color: #1f2937;
            margin-bottom: 30px;
            font-size: 20px;
            font-weight: 600;
        }
        .step {
            display: flex;
            align-items: flex-start;
            margin-bottom: 25px;
            padding: 20px;
            background: white;
            border-radius: 12px;
            border-left: 4px solid #10b981;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        .step:last-child {
            margin-bottom: 0;
        }
        .step-number {
            background: #10b981;
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 20px;
            flex-shrink: 0;
            font-weight: 700;
            font-size: 16px;
        }
        .step-content h4 {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 6px;
        }
        .step-content p {
            font-size: 14px;
            color: #6b7280;
            line-height: 1.6;
        }
        
        /* Urgent contact */
        .urgent-contact {
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            border: 1px solid #f59e0b;
            padding: 25px;
            border-radius: 12px;
            text-align: center;
            margin: 30px 0;
        }
        .urgent-contact h4 {
            color: #92400e;
            margin-bottom: 12px;
            font-size: 18px;
            font-weight: 600;
        }
        .urgent-contact p {
            color: #92400e;
            font-size: 16px;
            margin: 0;
        }
        .phone-number {
            font-size: 20px;
            font-weight: 700;
            color: #dc2626;
            text-decoration: none;
            display: inline-block;
            margin-top: 8px;
        }
        
        /* Timeline */
        .timeline {
            background: white;
            padding: 25px;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
            margin: 30px 0;
        }
        .timeline h4 {
            text-align: center;
            color: #1f2937;
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: 600;
        }
        .timeline-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding: 12px;
            background: #f8fafc;
            border-radius: 8px;
        }
        .timeline-item:last-child {
            margin-bottom: 0;
        }
        .timeline-icon {
            width: 24px;
            height: 24px;
            margin-right: 12px;
            flex-shrink: 0;
        }
        .timeline-text {
            flex: 1;
            font-size: 14px;
            color: #4b5563;
        }
        
        /* Footer */
        .footer { 
            background: #1e293b;
            color: #cbd5e1;
            padding: 40px 30px;
            text-align: center;
        }
        .footer-logo {
            font-size: 24px;
            font-weight: 700;
            color: white;
            margin-bottom: 16px;
        }
        .footer-contact {
            margin: 20px 0;
            line-height: 1.6;
            font-size: 14px;
        }
        .footer-meta {
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #334155;
            font-size: 12px;
            color: #94a3b8;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <span class="success-icon">✅</span>
            <h1>Confirmation de Réception</h1>
            <p>Vision Business Microfinance</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Welcome Section -->
            <div class="welcome-section">
                <h2>Merci pour votre message, ${data.nom} !</h2>
                <p>
                    Nous avons bien reçu votre demande et nous vous en remercions. 
                    Notre équipe s'engage à vous répondre dans les plus brefs délais.
                </p>
            </div>
            
            <!-- Next Steps -->
            <div class="next-steps">
                <h3>🎯 Prochaines Étapes</h3>
                
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h4>Analyse de Votre Demande</h4>
                        <p>Notre équipe spécialisée examine votre message pour comprendre vos besoins spécifiques.</p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h4>Contact Sous 24 Heures</h4>
                        <p>Un conseiller vous recontactera par téléphone ou email pour discuter de votre projet.</p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h4>Solution Personnalisée</h4>
                        <p>Nous élaborons une solution sur mesure adaptée à vos objectifs et à votre situation.</p>
                    </div>
                </div>
            </div>
            
            <!-- Urgent Contact -->
            <div class="urgent-contact">
                <h4>📞 Besoin d'une réponse urgente ?</h4>
                <p>Contactez-nous directement par téléphone :</p>
                <a href="tel:+243812345678" class="phone-number">+243 81 234 5678</a>
                <p style="margin-top: 8px; font-size: 14px;">Lun - Ven: 8h00 - 18h00 | Sam: 9h00 - 13h00</p>
            </div>
            
            <!-- Timeline -->
            <div class="timeline">
                <h4>⏱️ Délais de Traitement</h4>
                <div class="timeline-item">
                    <span class="timeline-icon">📧</span>
                    <span class="timeline-text">Accusé de réception instantané</span>
                </div>
                <div class="timeline-item">
                    <span class="timeline-icon">⏰</span>
                    <span class="timeline-text">Premier contact sous 24 heures ouvrables</span>
                </div>
                <div class="timeline-item">
                    <span class="timeline-icon">✅</span>
                    <span class="timeline-text">Solution proposée sous 48-72 heures</span>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-logo">Vision Business</div>
            <div class="footer-contact">
                <strong>Votre partenaire de confiance en microfinance</strong><br>
                Gombe, Kinshasa - République Démocratique du Congo<br>
                📧 contact@visionbusiness.cd | 📞 +243 81 234 5678
            </div>
            <div class="footer-meta">
                Réception: ${timestamp}<br>
                Référence: VB-${Date.now().toString().slice(-8)}<br><br>
                © ${new Date().getFullYear()} Vision Business Microfinance. Tous droits réservés.<br>
                <em>Cet email confirme la bonne réception de votre message.</em>
            </div>
        </div>
    </div>
</body>
</html>
  `
}

function generateConfirmationEmailText(data: { nom: string }): string {
  const timestamp = new Date().toLocaleString('fr-FR', {
    timeZone: 'Africa/Kinshasa',
    dateStyle: 'full',
    timeStyle: 'medium'
  })

  return `
✅ CONFIRMATION DE RÉCEPTION - VISION BUSINESS

========================================================================
                      MERCI POUR VOTRE MESSAGE
========================================================================

Bonjour ${data.nom},

Nous accusons réception de votre message et vous en remercions.

Votre demande a été enregistrée avec succès et sera traitée par notre 
équipe dans les plus brefs délais.

📋 PROCHAINES ÉTAPES:
────────────────────────────────────────────────────────────────────────

1. ANALYSE DE VOTRE DEMANDE
   Notre équpe spécialisée examine votre message pour comprendre 
   vos besoins spécifiques.

2. CONTACT SOUS 24 HEURES
   Un conseiller vous recontactera par téléphone ou email pour 
   discuter de votre projet.

3. SOLUTION PERSONNALISÉE
   Nous élaborons une solution sur mesure adaptée à vos objectifs 
   et à votre situation.

⏱️ DÉLAIS DE TRAITEMENT:
────────────────────────────────────────────────────────────────────────
• Accusé de réception: Instantané
• Premier contact: Sous 24 heures ouvrables  
• Solution proposée: Sous 48-72 heures

🚨 CONTACT URGENT:
────────────────────────────────────────────────────────────────────────
Besoin d'une réponse immédiate ?
📞 Appelez-nous au: +243 81 234 5678
🕐 Lun - Ven: 8h00 - 18h00 | Sam: 9h00 - 13h00

🔒 INFORMATIONS DE CONTACT:
────────────────────────────────────────────────────────────────────────
Vision Business Microfinance
Gombe, Kinshasa - République Démocratique du Congo
📧 contact@visionbusiness.cd
📞 +243 81 234 5678

────────────────────────────────────────────────────────────────────────
RÉFÉRENCE: VB-${Date.now().toString().slice(-8)}
DATE: ${timestamp}

© ${new Date().getFullYear()} Vision Business Microfinance
Votre partenaire de confiance en microfinance.
  `
}

// OPTIONAL: Add GET method for health check
export async function GET() {
  return NextResponse.json(
    { 
      status: 'healthy',
      service: 'contact-form-api',
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  )
}