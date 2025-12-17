import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors({
    origin: ['https://sdrag.com', 'https://www.sdrag.com', 'http://localhost:3000', 'http://localhost:5500']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'SDRAG Contact API' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, company, role, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address'
            });
        }

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: 'SDRAG Contact Form <contact@sdrag.com>',
            to: ['hector@sdrag.com'],
            replyTo: email,
            subject: `New Contact from ${name}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        .header {
                            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                            color: white;
                            padding: 30px;
                            border-radius: 10px 10px 0 0;
                            text-align: center;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 24px;
                        }
                        .content {
                            background: #f8fafc;
                            padding: 30px;
                            border-radius: 0 0 10px 10px;
                        }
                        .field {
                            margin: 20px 0;
                            padding: 15px;
                            background: white;
                            border-left: 4px solid #3b82f6;
                            border-radius: 4px;
                        }
                        .label {
                            font-weight: 600;
                            color: #1e293b;
                            font-size: 12px;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                            margin-bottom: 5px;
                            display: block;
                        }
                        .value {
                            color: #475569;
                            font-size: 16px;
                        }
                        .footer {
                            margin-top: 20px;
                            padding-top: 20px;
                            border-top: 1px solid #e2e8f0;
                            font-size: 12px;
                            color: #94a3b8;
                            text-align: center;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>📧 New SDRAG Contact Form Submission</h1>
                    </div>
                    <div class="content">
                        <div class="field">
                            <span class="label">Name</span>
                            <div class="value">${name}</div>
                        </div>
                        <div class="field">
                            <span class="label">Email</span>
                            <div class="value"><a href="mailto:${email}">${email}</a></div>
                        </div>
                        ${company ? `
                        <div class="field">
                            <span class="label">Company</span>
                            <div class="value">${company}</div>
                        </div>
                        ` : ''}
                        ${role ? `
                        <div class="field">
                            <span class="label">Role</span>
                            <div class="value">${role}</div>
                        </div>
                        ` : ''}
                        <div class="field">
                            <span class="label">Message</span>
                            <div class="value">${message.replace(/\n/g, '<br>')}</div>
                        </div>
                        <div class="footer">
                            Sent from SDRAG Contact Form | ${new Date().toLocaleString('en-US', { 
                                timeZone: 'America/Phoenix',
                                dateStyle: 'full',
                                timeStyle: 'short'
                            })}
                        </div>
                    </div>
                </body>
                </html>
            `
        });

        if (error) {
            console.error('Resend error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to send email'
            });
        }

        res.json({
            success: true,
            message: 'Message sent successfully',
            emailId: data.id
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`🚀 SDRAG Contact API running on port ${PORT}`);
});
