import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInDto } from 'src/user/dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.findOneByEmail(signInDto.email);
    console.log("Found user:", user);

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const isMatch = await bcrypt.compare(signInDto.password, user?.password);

    console.log("Password match:", isMatch);


    if (!isMatch) {
      throw new UnauthorizedException("Incorrect password");
    }

    const payload = { sub: user.id, username: user.email, roles: user.role };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
      expiresIn: '15m',
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.refreshSecret, 
      expiresIn: '7d',
    });
  
    return {
      access_token,
      refresh_token,
    };
  }

  async verifyRefreshToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.refreshSecret, 
    });
  }

  async generateAccessToken(payload: any): Promise<string> {
    const { exp, ...restPayload } = payload;

    return await this.jwtService.signAsync(restPayload, {
      secret: jwtConstants.secret,
      expiresIn: '15m',
    });
  }

  async refreshAccessToken(refreshToken: string): Promise<{ access_token: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });

      const { iat, exp, ...restPayload } = payload;
  
      const newAccessToken = await this.generateAccessToken(restPayload);
  
      return { access_token: newAccessToken };
    } catch (err) {
      console.error('Error refreshing token:', err.message);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async signUp(payload: CreateUserDto): Promise<any> {
    const hashPass = await bcrypt.hash(payload.password, 10)

    let data = {
      ...payload,
      password: hashPass
    }

    const user = await this.usersService.create(data);
    const tokenPayload = { sub: user.id, username: user.email, roles: user.role };
    const accessToken = await this.generateAccessToken(tokenPayload);
    const refreshToken = await this.jwtService.signAsync(tokenPayload, {
      secret: jwtConstants.refreshSecret,
      expiresIn: '7d',
    });

    return {
      user,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
