import { verifyVerificationToken } from './SendCodeUseCase';

export class VerifyCodeUseCase {
  execute(token: string, inputCode: string): boolean {
    try {
      const { code } = verifyVerificationToken(token);
      return String(code) === String(inputCode);
    } catch {
      throw new Error('유효하지 않은 토큰입니다.');
    }
  }
}
