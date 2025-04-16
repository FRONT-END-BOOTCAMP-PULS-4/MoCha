import { supabase } from '@/app/shared/lib/supabase';
import { EmailService } from '@/domain/auth/services/EmailService';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

type VerificationPayload = {
  email: string;
  code: string;
};

export const createVerificationToken = (payload: VerificationPayload) => {
  return jwt.sign(payload, SECRET, { expiresIn: '5m' });
};

export const verifyVerificationToken = (token: string): VerificationPayload => {
  return jwt.verify(token, SECRET) as VerificationPayload;
};

export class SendCodeUseCase {
  constructor(private readonly emailService: EmailService) {}

  async execute(email: string): Promise<string> {
    const { data: existingUser } = await supabase
      .from('user')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new Error('이미 가입된 이메일입니다.');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await this.emailService.sendVerificationCode(email, code);

    const token = createVerificationToken({ email, code });
    return token;
  }
}
