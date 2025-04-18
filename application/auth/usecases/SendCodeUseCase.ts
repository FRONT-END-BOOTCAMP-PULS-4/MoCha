import { supabase } from '@/app/shared/lib/supabase';
import { EmailService } from '@/domain/auth/services/EmailService';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

type VerificationPayload = {
  email: string;
  code: string;
};

// 이메일 인증용 토큰 생성 함수 - 5분 동안 유효
export const createVerificationToken = (payload: VerificationPayload) => {
  return jwt.sign(payload, SECRET, { expiresIn: '5m' });
};

// // 이메일 인증 토큰 검증 함수 - 유효하면 payload 반환, 유효하지 않으면 예외 발생
export const verifyEmailToken = (token: string): VerificationPayload => {
  return jwt.verify(token, SECRET) as VerificationPayload;
};

export class SendCodeUseCase {
  constructor(private readonly emailService: EmailService) {}

  async execute(email: string, purpose: 'signup' | 'reset-password'): Promise<string> {
    const { data: existingUser } = await supabase
      .from('user')
      .select('id')
      .eq('email', email)
      .single();

    if (purpose === 'signup' && existingUser) {
      throw new Error('이미 가입된 이메일입니다.');
    }

    if (purpose === 'reset-password' && !existingUser) {
      throw new Error('존재하지 않는 계정입니다.');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await this.emailService.sendVerificationCode(email, code);

    const token = createVerificationToken({ email, code });
    return token;
  }
}
