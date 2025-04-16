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
