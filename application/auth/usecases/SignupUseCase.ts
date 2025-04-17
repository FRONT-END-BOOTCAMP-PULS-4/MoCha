import { SignupDto } from '@/domain/auth/dto/SignupDto';
import { User } from '@/domain/auth/entities/User';
import { UserRepository } from '@/domain/auth/repositories/UserRepository';
import bcrypt from 'bcryptjs';
import { verifyEmailToken } from './SendCodeUseCase';

export class SignupUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: SignupDto): Promise<User> {
    const { email, password, nickname, phone_number, token } = dto;

    const payload = verifyEmailToken(token);
    const verifiedEmail = payload.email;

    if (verifiedEmail !== email) {
      throw new Error('이메일 인증이 완료되지 않았습니다.');
    }

    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error('이미 가입된 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.createUser({
      email,
      password: hashedPassword,
      nickname,
      phone_number,
      provider: 'local',
    });

    return user;
  }
}
