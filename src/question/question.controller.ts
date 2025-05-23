import { Controller, Get, Post, Body } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { DailyQuestionService } from 'src/schedulers/daily-question/daily-question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService, private readonly dailyQuestionService: DailyQuestionService,) {}

  @Post()
  async createQuestion(@Body() questionData: Partial<Question>): Promise<Question> {
    return this.questionService.createQuestion(questionData);
  }

  @Get('/daily') 
  async getDailyQuestion() {
    return this.dailyQuestionService.getDailyQuestion();
  }

  @Post('/select-daily')
  async selectDailyQuestion() {
    await this.dailyQuestionService.assignDailyQuestion();
    return { message: 'New daily question selected' };
  }
}
