import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  private readonly logger = new Logger(QuestionService.name);
  private currentQuestion: Question | null = null;

  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async createQuestion(data: Partial<Question>): Promise<Question> {
    const question = this.questionRepository.create(data);
    return this.questionRepository.save(question);
  }

  async selectDailyQuestion(): Promise<void> {
    const question = await this.questionRepository
      .createQueryBuilder('question')
      .orderBy('RAND()') 
      .getOne();

    if (question) {
      this.currentQuestion = question;
      this.logger.log(`New daily question selected: ${question.id}`);
    } else {
      this.logger.warn('No questions available to select.');
    }
  }

  async getDailyQuestion(): Promise<Question | null> {
    return this.currentQuestion;
  }
}
