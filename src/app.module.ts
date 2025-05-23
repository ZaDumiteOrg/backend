import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module'
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { WordModule } from './word/word.module';
import { Word } from './word/entities/word.entity';
import { AuthGuard } from './auth/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { WeeklyWordService } from './schedulers/weekly-word/weekly-word.service';
import { Question } from './question/entities/question.entity';
import { UserQuestion } from './user-question/entities/user-question.entity';
import { UserQuestionModule } from './user-question/user-question.module';
import { QuestionModule } from './question/question.module';
import { DailyQuestionHistory } from './daily-question-history/entities/daily-question-history.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Word, Question, UserQuestion, DailyQuestionHistory],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE') ?? false,
      }),
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
    ScheduleModule.forRoot(),
    UserModule,
    WordModule,
    AuthModule,
    QuestionModule,
    UserQuestionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    WeeklyWordService,
  ],
})
export class AppModule {}
