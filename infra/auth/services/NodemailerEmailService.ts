import { EmailService } from '@/domain/auth/services/EmailService';
import nodemailer from 'nodemailer';

export class NodemailerEmailService implements EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendVerificationCode(to: string, code: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject: '[MoCha] 회원가입 인증 코드',
      text: `인증 코드는 [${code}] 입니다.\n5분 안에 입력해주세요.`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
