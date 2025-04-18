export interface EmailService {
  sendVerificationCode(email: string, code: string): Promise<void>;
}
