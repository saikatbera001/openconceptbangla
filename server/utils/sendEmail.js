import nodemailer from 'nodemailer';

/**
 * Send an email with OTP or notification
 * @param {Object} options - { to, subject, otp, message, title }
 */
export const sendEmail = async ({ to, subject, otp, message, title = 'ওপেন কনসেপ্ট বাংলা - ওটিপি ভেরিফিকেশন' }) => {
  const isSmtpConfigured = Boolean(
    (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) ||
    (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD)
  );

  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject || title}</title>
        <style>
          body { margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
          .container { max-width: 540px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #072816 0%, #15803d 100%); padding: 32px 24px; text-align: center; }
          .header h1 { margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 6px 0 0; color: #bbf7d0; font-size: 13px; }
          .content { padding: 32px 24px; text-align: center; }
          .badge { display: inline-block; padding: 4px 12px; background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; border-radius: 20px; font-size: 12px; font-weight: 700; margin-bottom: 16px; }
          .text-muted { color: #64748b; font-size: 14px; line-height: 1.6; margin: 0 0 24px; }
          .otp-box { background: #f8fafc; border: 2px dashed #16a34a; border-radius: 12px; padding: 18px 24px; margin: 20px 0; text-align: center; display: inline-block; }
          .otp-code { font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #15803d; margin: 0; }
          .warning { background: #fffbeb; border: 1px solid #fef3c7; border-radius: 10px; padding: 14px 18px; margin-top: 24px; text-align: left; }
          .warning p { margin: 0; color: #92400e; font-size: 12px; line-height: 1.5; }
          .footer { background: #f8fafc; padding: 20px 24px; text-align: center; border-top: 1px solid #e2e8f0; }
          .footer p { margin: 0; color: #94a3b8; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Open Concept Bangla</h1>
            <p>বাংলা ভাষায় নির্ভরযোগ্য তথ্য ও প্রযুক্তি সেবা</p>
          </div>
          <div class="content">
            <span class="badge">নিরাপত্তা যাচাই</span>
            <p class="text-muted">
              ${message || 'আপনার অনুরোধ অনুসারে একটি এককালীন পাসওয়ার্ড (OTP) তৈরি করা হয়েছে। অ্যাকাউন্ট যাচাই বা পাসওয়ার্ড রিসেট করতে নিচের ওটিপি কোডটি ব্যবহার করুন:'}
            </p>
            ${otp ? `
              <div class="otp-box">
                <div class="otp-code">${otp}</div>
              </div>
              <p style="color: #64748b; font-size: 12px; margin-top: 4px;">কোডটির মেয়াদ থাকবে <strong>১০ মিনিট</strong>।</p>
            ` : ''}
            <div class="warning">
              <p><strong>সতর্কতা:</strong> এই ওটিপি কোডটি কারও সাথে শেয়ার করবেন না। আপনি যদি এই অনুরোধ না করে থাকেন তবে অবিলম্বে বিষয়টি উপেক্ষা করুন।</p>
            </div>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Open Concept Bangla. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  // If SMTP credentials exist, send real email
  if (isSmtpConfigured) {
    try {
      let transporterConfig;
      if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
        transporterConfig = {
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        };
      } else {
        transporterConfig = {
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_PORT === '465',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        };
      }

      const transporter = nodemailer.createTransporter(transporterConfig);
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || `"Open Concept Bangla" <${process.env.SMTP_USER || process.env.GMAIL_USER}>`,
        to,
        subject: subject || 'আপনার ওটিপি ভেরিফিকেশন কোড - Open Concept Bangla',
        text: `আপনার Open Concept Bangla ভেরিফিকেশন ওটিপি হলো: ${otp}. এটি ১০ মিনিটের জন্য বৈধ।`,
        html: htmlTemplate,
      });

      console.log(`[Email Sent]: To ${to} (MessageId: ${info.messageId})`);
      return { success: true, messageId: info.messageId, delivered: true };
    } catch (err) {
      console.error('[Email Error]: Failed to send via SMTP, falling back to dev console:', err.message);
    }
  }

  // Fallback for Development / Demo mode: Log conspicuously to console
  console.log('\n======================================================');
  console.log('✉️  [EMAIL OTP SERVICE - DEV / DEMO MODE]');
  console.log(`   To:       ${to}`);
  console.log(`   Subject:  ${subject || 'আপনার ওটিপি ভেরিফিকেশন কোড'}`);
  console.log(`   🔑 OTP:   >>> ${otp} <<<`);
  console.log(`   Valid:    10 Minutes`);
  console.log('======================================================\n');

  return { success: true, delivered: false, devMode: true, previewOtp: otp };
};

export default sendEmail;
