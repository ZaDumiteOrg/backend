import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module'
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './roles/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { WordModule } from './word/word.module';
import { Word } from './word/entities/word.entity';
import { AuthGuard } from './auth/auth.guard';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'zadumite',
      entities: [User, Word],
      synchronize: true,
    }),
    JwtModule.register({
      global: true, 
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
    UserModule,
    WordModule,
    AuthModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService,  
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
