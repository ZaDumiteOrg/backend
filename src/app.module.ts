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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'zadumite',
      entities: [User],
      synchronize: true,
    }),
    JwtModule.register({
      global: true, 
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService,  
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },],
  

})
export class AppModule {}
