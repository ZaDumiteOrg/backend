import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if(user?.password !== pass) {
      const isMatch = await bcrypt.compare(pass, user?.password);

      if (!isMatch) {
        throw new UnauthorizedException("Incorrect password");
      }

      const payload = { sub: user.id, username: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload, { secret: jwtConstants.secret || 'holyguacamole' }),
      };
    }
  }
}
