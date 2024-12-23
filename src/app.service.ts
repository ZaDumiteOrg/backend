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

  getRefreshSecretKey(): string {
    const refreshKey = process.env.REFRESH_SECRET_KEY;
    if(!refreshKey) {
      throw new Error('REFRESH_SECRET_KEY is not defined in the environment variables');
    }
    return refreshKey;
  }
}
