import { supabase } from '@/app/shared/lib/supabase';
import { createVerificationToken } from '@/app/shared/lib/verification-jwt';
import { EmailService } from '@/domain/auth/services/EmailService';

export class SendVerificationCodeUseCase {
  constructor(private readonly emailService: EmailService) {}

  async execute(email: string): Promise<string> {
    const { data: existingUser } = await supabase
      .from('users')
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
