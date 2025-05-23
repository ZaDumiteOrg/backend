import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuestion } from './entities/user-question.entity';
import { UserQuestionService } from './user-question.service';
import { UserQuestionController } from './user-question.controller';
import { User } from '../user/entities/user.entity';
import { Question } from '../question/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserQuestion, User, Question])], 
  controllers: [UserQuestionController],
  providers: [UserQuestionService],
  exports: [TypeOrmModule],
})
export class UserQuestionModule {}
