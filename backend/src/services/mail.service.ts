import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const transportConfig: any = {
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    };

    if (process.env.EMAIL_HOST) {
      transportConfig.host = process.env.EMAIL_HOST;
      transportConfig.port = parseInt(process.env.EMAIL_PORT || "587");
      transportConfig.secure = process.env.EMAIL_SECURE === "true";
    } else {
      transportConfig.service = process.env.EMAIL_SERVICE || "gmail";
    }

    this.transporter = nodemailer.createTransport(transportConfig);
  }

  private async loadTemplate(
    templateName: string,
    variables: Record<string, string>
  ): Promise<string> {
    const templatePath = path.join(
      __dirname,
      "../templates/email",
      `${templateName}.html`
    );
    let template = await fs.promises.readFile(templatePath, "utf-8");

    for (const [key, value] of Object.entries(variables)) {
      template = template.replace(new RegExp(`{{${key}}}`, "g"), value);
    }

    return template;
  }

  async sendMail(
    to: string,
    subject: string,
    html: string,
    attachments: any[] = []
  ) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
        attachments,
      });
      console.log("Message sent: %s", info.messageId);
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  private getLogoAttachment() {
    const logoPath = path.join(__dirname, "../../../forntend/public/logo.svg");
    return {
      filename: "logo.svg",
      path: logoPath,
      cid: "logo",
    };
  }

  async sendWelcomeEmail(user: { name: string; email: string }) {
    const html = await this.loadTemplate("welcome", {
      name: user.name,
      year: new Date().getFullYear().toString(),
    });
    return this.sendMail(
      user.email,
      "Welcome to Local Design Community!",
      html,
      [this.getLogoAttachment()]
    );
  }

  async sendReminderEmail(
    user: { name: string; email: string },
    details: { title: string; date: string; content?: string }
  ) {
    const html = await this.loadTemplate("reminder", {
      name: user.name,
      title: details.title,
      date: details.date,
      content: details.content || "",
      year: new Date().getFullYear().toString(),
    });
    return this.sendMail(user.email, `Reminder: ${details.title}`, html, [
      this.getLogoAttachment(),
    ]);
  }

  async sendPromotionEmail(
    user: { name: string; email: string },
    details: { title: string; content: string }
  ) {
    const html = await this.loadTemplate("promotion", {
      name: user.name,
      title: details.title,
      content: details.content,
      year: new Date().getFullYear().toString(),
    });
    return this.sendMail(user.email, details.title, html, [
      this.getLogoAttachment(),
    ]);
  }

  async sendContactSubmissionEmail(submission: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; }
          .header { border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
          .header h1 { margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; text-transform: uppercase; font-size: 12px; color: #666; display: block; margin-bottom: 5px; }
          .value { font-size: 16px; }
          .message-box { background: #f9f9f9; padding: 15px; border-left: 4px solid #000; }
          .footer { margin-top: 30px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Contact Submission</h1>
          </div>
          
          <div class="field">
            <span class="label">From</span>
            <div class="value">${submission.name} (${submission.email})</div>
          </div>

          <div class="field">
            <span class="label">Subject</span>
            <div class="value">${submission.subject}</div>
          </div>

          <div class="field">
            <span class="label">Message</span>
            <div class="message-box">
              ${submission.message.replace(/\n/g, "<br>")}
            </div>
          </div>

          <div class="footer">
            Received via Design Archives Contact Form
          </div>
        </div>
      </body>
      </html>
    `;
    return this.sendMail(
      "localdesigncommunity@gmail.com",
      `[Contact] ${submission.subject}`,
      html
    );
  }

  async sendBackupSuccessEmail(backupPath: string) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; }
          .header { border-bottom: 2px solid #28a745; padding-bottom: 10px; margin-bottom: 20px; }
          .header h1 { margin: 0; font-size: 24px; color: #28a745; }
          .content { margin-bottom: 20px; }
          .footer { margin-top: 30px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Backup Successful</h1>
          </div>
          
          <div class="content">
            <p>The database backup has been completed successfully.</p>
            <p><strong>Backup File:</strong> ${backupPath}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <div class="footer">
            System Notification - Design Archives
          </div>
        </div>
      </body>
      </html>
    `;

    const recipients = [
      "soumicsarkar@gmail.com",
      "localdesigncommunity@gmail.com",
    ];

    // Send to each recipient
    const promises = recipients.map((to) =>
      this.sendMail(to, "Database Backup Successful", html)
    );

    return Promise.all(promises);
  }
}
