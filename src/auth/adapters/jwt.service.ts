import jwt, { SignOptions } from 'jsonwebtoken';
import { appConfig } from '../../common/config/config';

export const jwtService = {
  async createToken(userId: string): Promise<string> {
    return jwt.sign({ userId }, appConfig.AC_SECRET as string, {
      expiresIn: appConfig.AC_TIME as SignOptions['expiresIn'],
    });
  },

  async decodeToken(token: string): Promise<any> {
    try {
      return jwt.decode(token);
    } catch (e: unknown) {
      console.error(`Can't decode the token`, e);
      return null;
    }
  },

  async verifyToken(token: string): Promise<{ userId: string } | null> {
    try {
      return jwt.verify(token, appConfig.AC_SECRET) as { userId: string };
    } catch (error) {
      console.error('Token verification error');
      return null;
    }
  },
};
