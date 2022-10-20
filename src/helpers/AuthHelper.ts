import config from '../config/environment';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class AuthHelper {
  generateToken(payload: string) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { id: payload },
        config.secretKey,
        { expiresIn: '8h' },
        (error, token) => {
          return error ? reject(error) : resolve(token);
        }
      );
    });
  }

  verifyToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.secretKey, (error, decoded) => {
        return error ? reject(error) : resolve(decoded);
      });
    });
  }

  checkPassword(password: string, userPassword: string) {
    return bcrypt.compare(password, userPassword);
  }
}
