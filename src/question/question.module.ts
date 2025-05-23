import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { DailyQuestionHistory } from 'src/daily-question-history/entities/daily-question-history.entity';
import { DailyQuestionService } from 'src/schedulers/daily-question/daily-question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, DailyQuestionHistory])],
  providers: [QuestionService, DailyQuestionService],
  controllers: [QuestionController],
  exports: [QuestionService, DailyQuestionService]
})
export class QuestionModule {}
