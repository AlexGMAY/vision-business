import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { applicationId, applicantName, loanAmount, loanType, timestamp } = await request.json();

    const { data, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: process.env.ADMIN_NOTIFICATION_EMAIL!,
      subject: `🚨 New Loan Application - ${applicantName} - ${loanType}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Loan Application Alert</title>
          <style>
            /* Reset and Base Styles */
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; line-height: 1.6; color: #2D3748; background: #F7FAFC; -webkit-font-smoothing: antialiased; }
            
            /* Container */
            .container { max-width: 650px; margin: 0 auto; background: #FFFFFF; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); }
            
            /* Header */
            .header { background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%); padding: 35px 30px; text-align: center; position: relative; overflow: hidden; }
            .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="%23ffffff" opacity="0.1"><polygon points="0,0 1000,100 0,100"/></svg>') no-repeat; background-size: cover; }
            .alert-icon { font-size: 48px; margin-bottom: 15px; position: relative; }
            .header-title { font-size: 28px; font-weight: 700; color: white; margin-bottom: 8px; position: relative; }
            .header-subtitle { color: rgba(255,255,255,0.9); font-size: 16px; font-weight: 300; position: relative; }
            
            /* Priority Banner */
            .priority-banner { background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: white; padding: 20px 30px; text-align: center; }
            .priority-content { display: flex; align-items: center; justify-content: center; gap: 15px; }
            .priority-icon { font-size: 24px; }
            .priority-text { font-weight: 600; font-size: 16px; }
            
            /* Content Sections */
            .content { padding: 40px 30px; }
            .section { margin-bottom: 30px; }
            
            /* Application Card */
            .app-card { background: #FFFFFF; border: 2px solid #E2E8F0; border-radius: 12px; padding: 30px; margin-bottom: 25px; }
            .app-header { display: flex; justify-content: between; align-items: center; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #F7FAFC; }
            .app-id { background: #1E40AF; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; }
            .app-status { background: #F59E0B; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; }
            
            /* Details Grid */
            .details-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 25px; }
            .detail-item { display: flex; flex-direction: column; }
            .detail-label { font-size: 14px; color: #718096; font-weight: 500; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px; }
            .detail-value { font-size: 16px; color: #2D3748; font-weight: 600; }
            .highlight { color: #1E40AF; }
            .amount { font-size: 24px; font-weight: 700; color: #059669; }
            
            /* Timeline */
            .timeline { background: #F8FAFC; padding: 25px; border-radius: 8px; border-left: 4px solid #1E40AF; }
            .timeline-title { font-weight: 600; color: #2D3748; margin-bottom: 15px; }
            .timeline-steps { display: flex; justify-content: space-between; position: relative; }
            .timeline-steps::before { content: ''; position: absolute; top: 15px; left: 0; right: 0; height: 2px; background: #E2E8F0; }
            .timeline-step { display: flex; flex-direction: column; align-items: center; position: relative; z-index: 2; }
            .timeline-dot { width: 32px; height: 32px; border-radius: 50%; background: #E2E8F0; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; font-weight: 600; font-size: 12px; }
            .timeline-dot.active { background: #1E40AF; color: white; }
            .timeline-label { font-size: 12px; color: #718096; text-align: center; }
            
            /* Action Section */
            .action-section { background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%); color: white; padding: 35px; border-radius: 12px; text-align: center; margin: 30px 0; }
            .action-title { font-size: 22px; font-weight: 600; margin-bottom: 15px; }
            .action-description { opacity: 0.9; margin-bottom: 25px; font-size: 15px; }
            .action-button { display: inline-block; background: #FFFFFF; color: #1E40AF; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); }
            .action-button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2); }
            
            /* Metrics */
            .metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 25px 0; }
            .metric-card { background: #F8FAFC; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #E2E8F0; }
            .metric-value { font-size: 20px; font-weight: 700; color: #1E40AF; margin-bottom: 5px; }
            .metric-label { font-size: 12px; color: #718096; text-transform: uppercase; letter-spacing: 0.5px; }
            
            /* Footer */
            .footer { background: #1F2937; color: #9CA3AF; padding: 30px; text-align: center; }
            .footer-links { display: flex; justify-content: center; gap: 20px; margin-bottom: 20px; }
            .footer-link { color: #9CA3AF; text-decoration: none; font-size: 13px; transition: color 0.2s; }
            .footer-link:hover { color: #FFFFFF; }
            .copyright { font-size: 12px; color: #6B7280; }
            
            /* Responsive Design */
            @media (max-width: 650px) {
              .header, .content { padding: 25px 20px; }
              .details-grid { grid-template-columns: 1fr; gap: 15px; }
              .metrics { grid-template-columns: 1fr; }
              .timeline-steps { flex-direction: column; gap: 20px; align-items: flex-start; }
              .timeline-steps::before { display: none; }
              .timeline-step { flex-direction: row; gap: 15px; }
              .timeline-dot { margin-bottom: 0; }
              .priority-content { flex-direction: column; gap: 10px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <div class="alert-icon">🚨</div>
              <h1 class="header-title">New Loan Application Received</h1>
              <p class="header-subtitle">Requires immediate attention and review</p>
            </div>
            
            <!-- Priority Banner -->
            <div class="priority-banner">
              <div class="priority-content">
                <div class="priority-icon">⏰</div>
                <div class="priority-text">PRIORITY REVIEW REQUIRED - SLA: 24 HOURS</div>
              </div>
            </div>
            
            <div class="content">
              <!-- Application Card -->
              <div class="app-card">
                <div class="app-header">
                  <div class="app-id">APP-${applicationId}</div>
                  <div class="app-status">NEW APPLICATION</div>
                </div>
                
                <div class="details-grid">
                  <div class="detail-item">
                    <span class="detail-label">Applicant Name</span>
                    <span class="detail-value highlight">${applicantName}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Loan Type</span>
                    <span class="detail-value">${loanType.replace('_', ' ').toUpperCase()}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Amount Requested</span>
                    <span class="detail-value amount">$${loanAmount.toLocaleString()}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Submission Time</span>
                    <span class="detail-value">${new Date(timestamp).toLocaleString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                </div>
                
                <!-- Processing Timeline -->
                <div class="timeline">
                  <div class="timeline-title">Application Processing Status</div>
                  <div class="timeline-steps">
                    <div class="timeline-step">
                      <div class="timeline-dot active">1</div>
                      <div class="timeline-label">Received</div>
                    </div>
                    <div class="timeline-step">
                      <div class="timeline-dot">2</div>
                      <div class="timeline-label">Under Review</div>
                    </div>
                    <div class="timeline-step">
                      <div class="timeline-dot">3</div>
                      <div class="timeline-label">Documents</div>
                    </div>
                    <div class="timeline-step">
                      <div class="timeline-dot">4</div>
                      <div class="timeline-label">Decision</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Performance Metrics -->
              <div class="metrics">
                <div class="metric-card">
                  <div class="metric-value">24h</div>
                  <div class="metric-label">SLA Deadline</div>
                </div>
                <div class="metric-card">
                  <div class="metric-value">${loanType === 'business' ? 'High' : 'Medium'}</div>
                  <div class="metric-label">Priority Level</div>
                </div>
                <div class="metric-card">
                  <div class="metric-value">New</div>
                  <div class="metric-label">Application Type</div>
                </div>
              </div>
              
              <!-- Action Section -->
              <div class="action-section">
                <h3 class="action-title">Review Application Now</h3>
                <p class="action-description">Access the complete application details, documents, and processing tools in the admin portal</p>
                <a href="${process.env.ADMIN_PORTAL_URL || 'http://localhost:3000/vbm-admin'}/applications/${applicationId}" class="action-button">
                  📋 Open in Admin Portal
                </a>
              </div>
              
              <!-- Additional Info -->
              <div style="text-align: center; color: #6B7280; font-size: 13px; line-height: 1.5; padding: 20px;">
                <p><strong>Next Steps Required:</strong><br>
                1. Verify applicant identity documents<br>
                2. Review financial information and credit assessment<br>
                3. Validate supporting documentation<br>
                4. Make preliminary decision recommendation</p>
                
                <p style="margin-top: 15px; font-size: 12px;">
                  <strong>System Alert:</strong> This application requires review within 24 hours to meet service level agreements.<br>
                  Automated notification generated by Vision Business Loan Processing System.
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <div class="footer-links">
                <a href="/vbm-admin" target="blank" class="footer-link">Admin Portal</a>
                <a href="#" target="blank" class="footer-link">Processing Guide</a>
                <a href="#" target="blank" class="footer-link">Support</a>
                <a href="#" target="blank" class="footer-link">SLA Policy</a>
              </div>
              <div class="copyright">
                © 2024 Vision Business Microfinance - Loan Processing System<br>
                Confidential and Proprietary - For authorized personnel only
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