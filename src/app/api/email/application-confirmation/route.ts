import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { to, applicationId, timestamp } = await request.json();

    const { data, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: [to],
      subject: 'Application Confirmation - Vision Business Microfinance',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Confirmation</title>
          <style>
            /* Reset and Base Styles */
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; line-height: 1.6; color: #2D3748; background: #F7FAFC; -webkit-font-smoothing: antialiased; }
            
            /* Container */
            .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; }
            
            /* Header */
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden; }
            .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="%23ffffff" opacity="0.1"><polygon points="0,100 1000,0 1000,100"/></svg>') no-repeat; background-size: cover; }
            .logo { font-size: 28px; font-weight: 700; color: white; margin-bottom: 10px; position: relative; }
            .tagline { color: rgba(255,255,255,0.9); font-size: 16px; font-weight: 300; position: relative; }
            
            /* Hero Section */
            .hero { padding: 50px 30px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
            .hero-icon { font-size: 48px; margin-bottom: 20px; }
            .hero-title { font-size: 32px; font-weight: 700; margin-bottom: 15px; }
            .hero-subtitle { font-size: 18px; opacity: 0.9; font-weight: 300; }
            
            /* Content Sections */
            .content { padding: 40px 30px; }
            .section { margin-bottom: 35px; }
            .section-title { font-size: 20px; font-weight: 600; color: #2D3748; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #E2E8F0; }
            
            /* Success Card */
            .success-card { background: linear-gradient(135deg, #48BB78 0%, #38A169 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px; box-shadow: 0 10px 25px rgba(72, 187, 120, 0.3); }
            .success-icon { font-size: 42px; margin-bottom: 15px; }
            .success-title { font-size: 24px; font-weight: 600; margin-bottom: 10px; }
            .success-message { font-size: 16px; opacity: 0.9; }
            
            /* Info Card */
            .info-card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }
            .info-item { display: flex; flex-direction: column; }
            .info-label { font-size: 14px; color: #718096; font-weight: 500; margin-bottom: 5px; }
            .info-value { font-size: 16px; color: #2D3748; font-weight: 600; }
            
            /* Timeline */
            .timeline { position: relative; }
            .timeline::before { content: ''; position: absolute; left: 15px; top: 0; bottom: 0; width: 2px; background: #E2E8F0; }
            .timeline-step { display: flex; align-items: flex-start; margin-bottom: 25px; position: relative; }
            .timeline-marker { width: 32px; height: 32px; border-radius: 50%; background: #4299E1; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; margin-right: 20px; flex-shrink: 0; position: relative; z-index: 2; }
            .timeline-content { flex: 1; }
            .timeline-title { font-weight: 600; color: #2D3748; margin-bottom: 5px; }
            .timeline-description { color: #718096; font-size: 14px; }
            
            /* Status Badge */
            .status-badge { display: inline-block; background: #EDF2F7; color: #4A5568; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 500; margin-top: 10px; }
            
            /* CTA Section */
            .cta-section { background: #F7FAFC; padding: 30px; text-align: center; border-radius: 12px; margin: 30px 0; }
            .cta-title { font-size: 20px; font-weight: 600; margin-bottom: 15px; color: #2D3748; }
            .cta-description { color: #718096; margin-bottom: 20px; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; transition: transform 0.2s, box-shadow 0.2s; }
            .cta-button:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3); }
            
            /* Footer */
            .footer { background: #2D3748; color: #CBD5E0; padding: 40px 30px; text-align: center; }
            .footer-links { display: flex; justify-content: center; gap: 25px; margin-bottom: 25px; }
            .footer-link { color: #CBD5E0; text-decoration: none; font-size: 14px; transition: color 0.2s; }
            .footer-link:hover { color: #FFFFFF; }
            .social-links { display: flex; justify-content: center; gap: 15px; margin-bottom: 25px; }
            .social-icon { width: 36px; height: 36px; background: #4A5568; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #CBD5E0; text-decoration: none; transition: all 0.2s; }
            .social-icon:hover { background: #667eea; color: white; transform: translateY(-2px); }
            .copyright { font-size: 12px; color: #718096; }
            
            /* Responsive Design */
            @media (max-width: 600px) {
              .header, .hero, .content { padding: 30px 20px; }
              .hero-title { font-size: 26px; }
              .info-grid { grid-template-columns: 1fr; gap: 15px; }
              .footer-links { flex-direction: column; gap: 15px; }
              .cta-button { display: block; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <div class="logo">Vision Business</div>
              <div class="tagline">Empowering Dreams, Building Futures</div>
            </div>
            
            <!-- Hero Section -->
            <div class="hero">
              <div class="hero-icon">🚀</div>
              <h1 class="hero-title">Application Submitted Successfully!</h1>
              <p class="hero-subtitle">Your journey to financial empowerment begins now</p>
            </div>
            
            <div class="content">
              <!-- Success Card -->
              <div class="success-card">
                <div class="success-icon">✅</div>
                <h2 class="success-title">Application Received & Confirmed</h2>
                <p class="success-message">We've successfully received your loan application and it's now in our processing queue.</p>
              </div>
              
              <!-- Application Details -->
              <div class="section">
                <h3 class="section-title">Application Details</h3>
                <div class="info-card">
                  <div class="info-grid">
                    <div class="info-item">
                      <span class="info-label">Application ID</span>
                      <span class="info-value">${applicationId}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Submission Date</span>
                      <span class="info-value">${new Date(timestamp).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Submission Time</span>
                      <span class="info-value">${new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Current Status</span>
                      <span class="info-value">Under Review</span>
                    </div>
                  </div>
                  <div class="status-badge">Application ID: ${applicationId}</div>
                </div>
              </div>
              
              <!-- Process Timeline -->
              <div class="section">
                <h3 class="section-title">Application Journey</h3>
                <div class="info-card">
                  <div class="timeline">
                    <div class="timeline-step">
                      <div class="timeline-marker">1</div>
                      <div class="timeline-content">
                        <div class="timeline-title">Initial Review</div>
                        <div class="timeline-description">Our team will conduct an initial assessment of your application within 24-48 hours.</div>
                      </div>
                    </div>
                    <div class="timeline-step">
                      <div class="timeline-marker">2</div>
                      <div class="timeline-content">
                        <div class="timeline-title">Document Verification</div>
                        <div class="timeline-description">We'll verify all submitted documents and may request additional information if needed.</div>
                      </div>
                    </div>
                    <div class="timeline-step">
                      <div class="timeline-marker">3</div>
                      <div class="timeline-content">
                        <div class="timeline-title">Credit Assessment</div>
                        <div class="timeline-description">Comprehensive evaluation of your financial profile and creditworthiness.</div>
                      </div>
                    </div>
                    <div class="timeline-step">
                      <div class="timeline-marker">4</div>
                      <div class="timeline-content">
                        <div class="timeline-title">Final Decision</div>
                        <div class="timeline-description">You'll receive our decision along with next steps and portal access details.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- CTA Section -->
              <div class="cta-section">
                <h3 class="cta-title">Track Your Application</h3>
                <p class="cta-description">Monitor your application status and receive real-time updates through our client portal.</p>
                <a href="#" class="cta-button">Access Client Portal</a>
              </div>
              
              <!-- Support Info -->
              <div style="text-align: center; color: #718096; font-size: 14px; line-height: 1.6;">
                <p><strong>Need Assistance?</strong><br>
                Our dedicated support team is available to help you throughout the process.<br>
                Email: support@visionbusiness.com | Phone: +243 82 123-4567</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <div class="footer-links">
                <a href="/legal/confidentialite" target="blank" class="footer-link">Confidentialité</a>
                <a href="/legal/conditions" target="blank" class="footer-link">Conditions d'utilisation</a>
                <a href="/legal/conformite" target="blank" class="footer-link">Conformité</a>
                <a href="/contact" target="blank" class="footer-link">Contactez-nous</a>
              </div>
              <div class="social-links">
                <a href="#" target="blank" class="social-icon">f</a>
                <a href="#" target="blank" class="social-icon">in</a>
                <a href="#" target="blank" class="social-icon">t</a>
                <a href="#" target="blank" class="social-icon">ig</a>
              </div>
              <div class="copyright">
                © 2025 Vision Business Microfinance. All rights reserved.<br>
                Empowering entrepreneurs and businesses across the globe.
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}