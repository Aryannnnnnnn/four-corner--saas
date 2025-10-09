import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail", // You can change this to your preferred email service
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASSWORD, // Your app password (not regular password)
    },
  });
};

// Alternative configuration for other email services
// const createTransporter = () => {
//   return nodemailer.createTransport({
//     host: process.env.SMTP_HOST, // e.g., 'smtp.sendgrid.net'
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   })
// }

export async function sendOTPEmail(
  email: string,
  otp: string,
): Promise<boolean> {
  try {
    const transporter = createTransporter();

    const mailOptions: EmailOptions = {
      to: email,
      subject: "Four Corner Properties - Password Reset Code",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset Code</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8f9fa;
            }
            .container {
              background: #ffffff;
              border-radius: 12px;
              padding: 40px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              width: 60px;
              height: 60px;
              background: #d4af37;
              border-radius: 8px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 24px;
              color: #000;
              margin-bottom: 20px;
            }
            .title {
              font-size: 28px;
              font-weight: bold;
              color: #1a1a1a;
              margin: 0;
            }
            .otp-code {
              background: linear-gradient(135deg, #d4af37, #c5a028);
              color: #000;
              font-size: 36px;
              font-weight: bold;
              padding: 20px;
              border-radius: 12px;
              text-align: center;
              letter-spacing: 8px;
              margin: 30px 0;
              font-family: 'Courier New', monospace;
            }
            .message {
              font-size: 16px;
              color: #555;
              margin: 20px 0;
            }
            .warning {
              background: #fff3cd;
              border: 1px solid #ffeaa7;
              color: #856404;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 14px;
              color: #888;
              text-align: center;
            }
            .button {
              display: inline-block;
              background: #d4af37;
              color: #000;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">FC</div>
              <h1 class="title">Password Reset Request</h1>
            </div>

            <p class="message">
              Hello,
            </p>

            <p class="message">
              We received a request to reset your password for your Four Corner Properties account. 
              Use the verification code below to complete your password reset:
            </p>

            <div class="otp-code">
              ${otp}
            </div>

            <div class="warning">
              <strong>⚠️ Security Notice:</strong>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>This code will expire in <strong>10 minutes</strong></li>
                <li>Never share this code with anyone</li>
                <li>If you didn't request this reset, please ignore this email</li>
              </ul>
            </div>

            <p class="message">
              If you're having trouble with the password reset process, please contact our support team.
            </p>

            <div class="footer">
              <p>
                This email was sent by Four Corner Properties<br>
                Luxury Real Estate Analysis Platform<br>
                <strong>Do not reply to this email</strong>
              </p>
              <p style="margin-top: 15px; font-size: 12px;">
                © ${new Date().getFullYear()} Four Corner Properties. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

export async function sendWelcomeEmail(
  email: string,
  name: string,
): Promise<boolean> {
  try {
    const transporter = createTransporter();

    const mailOptions: EmailOptions = {
      to: email,
      subject: "Welcome to Four Corner Properties!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Four Corner Properties</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8f9fa;
            }
            .container {
              background: #ffffff;
              border-radius: 12px;
              padding: 40px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              width: 60px;
              height: 60px;
              background: #d4af37;
              border-radius: 8px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 24px;
              color: #000;
              margin-bottom: 20px;
            }
            .title {
              font-size: 28px;
              font-weight: bold;
              color: #1a1a1a;
              margin: 0;
            }
            .button {
              display: inline-block;
              background: #d4af37;
              color: #000;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              margin: 20px 0;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 14px;
              color: #888;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">FC</div>
              <h1 class="title">Welcome to Four Corner Properties!</h1>
            </div>

            <p>Hello ${name},</p>

            <p>
              Welcome to Four Corner Properties! We're excited to have you join our platform for 
              luxury real estate analysis and investment insights.
            </p>

            <p>
              With your new account, you can:
            </p>
            <ul>
              <li>🏠 Analyze luxury properties with AI-powered insights</li>
              <li>📊 Access detailed market comparables and projections</li>
              <li>💰 Get ROI calculations and investment recommendations</li>
              <li>📱 Save and manage your property analysis library</li>
            </ul>

            <div style="text-align: center;">
              <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard" class="button">
                Start Analyzing Properties
              </a>
            </div>

            <div class="footer">
              <p>
                Thank you for choosing Four Corner Properties<br>
                Luxury Real Estate Analysis Platform
              </p>
              <p style="margin-top: 15px; font-size: 12px;">
                © ${new Date().getFullYear()} Four Corner Properties. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return false;
  }
}
