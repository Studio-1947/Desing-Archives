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

  async sendMail(to: string, subject: string, html: string) {
    try {
      const logoPath = path.join(
        __dirname,
        "../../../forntend/public/logo.svg"
      );

      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
        attachments: [
          {
            filename: "logo.svg",
            path: logoPath,
            cid: "logo", // same cid value as in the html img src
          },
        ],
      });
      console.log("Message sent: %s", info.messageId);
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  async sendWelcomeEmail(user: { name: string; email: string }) {
    const html = await this.loadTemplate("welcome", {
      name: user.name,
      year: new Date().getFullYear().toString(),
    });
    return this.sendMail(
      user.email,
      "Welcome to Local Design Community!",
      html
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
    return this.sendMail(user.email, `Reminder: ${details.title}`, html);
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
    return this.sendMail(user.email, details.title, html);
  }
}
