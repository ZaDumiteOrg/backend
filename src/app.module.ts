import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module'
import { User } from './user/entities/user.entity';
import { WordModule } from './word/word.module';

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
    UserModule,
    WordModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
