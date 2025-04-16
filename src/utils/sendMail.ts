
import { SMTP_PASSWORD, SMTP_USERNAME } from "../constants/env";
import nodemailer from "nodemailer";


interface EmailResponse {
  data?: {
    id: string;
    message: string;
  };
  error?: {
    name: string;
    message: string;
  };
}

interface SendMailParams {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const sendMail = async (params: SendMailParams): Promise<EmailResponse> => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD
      }
    });

    const info = await transporter.sendMail({
      from: "LESCetariat",
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html
    });

    return {
      data: {
        id: info.messageId,
        message: 'Email sent successfully'
      }
    };
  } catch (error: any) {
    return {
      error: {
        name: error.name,
        message: error.message
      }
    };
  }
};