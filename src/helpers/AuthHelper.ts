import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/environment';

export default class AuthHelper {
  static generateToken(id: string) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { id },
        config.jwt.secretKey,
        { expiresIn: '8h' },
        (error, token) => {
          if (error) {
            reject(error);
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  static verifyToken(token: string): Promise<{ id: number }> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          const decodedJWT = decoded as { id: number };
          resolve(decodedJWT);
        }
      });
    });
  }

  static checkPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  static hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
