import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

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

  async signUp(payload: CreateUserDto) {
    //const user = await this.usersService.create(payload);
    const hashPass = await bcrypt.hash(payload.password, 10)

    let data = {
      ...payload,
      password: hashPass
    }

    const user = await this.usersService.create(data);
    return user;
  }
}
