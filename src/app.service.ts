import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSecretKey(): string {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error('SECRET_KEY is not defined in the environment variables');
    }
    return secretKey;
  }
}
