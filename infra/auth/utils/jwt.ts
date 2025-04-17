import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

// access_token 생성
export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '1h' });
};

// refresh_token 생성
export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
};

// access_token을 검증하고 payload(id, email)를 반환
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET) as { id: string; email: string };
};
