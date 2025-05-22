import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { Question } from 'src/question/entities/question.entity'
import { DailyQuestionHistory } from 'src/daily-question-history/entities/daily-question-history.entity';

@Injectable()
export class DailyQuestionService {
  private readonly logger = new Logger(DailyQuestionService.name);

  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(DailyQuestionHistory)
    private readonly historyRepository: Repository<DailyQuestionHistory>,
  ) {}

  async onModuleInit() {
    this.logger.log('DailyQuestionService initialized');
    const question = await this.getDailyQuestion();
    if (question) {
      this.logger.log(`📌 Today's daily question: ${question.questionText}`);
    } else {
      this.logger.warn('⚠️ No daily question has been assigned yet for today.');
    }
  }

  @Cron('0 10 * * *') 
  async assignDailyQuestion(): Promise<void> {
    const today = new Date();
    const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay(); 

    const usedQuestions = await this.historyRepository.find({
      select: ['question'],
      where: { dayOfWeek },
    });

    const usedQuestionIds = usedQuestions.map((q) => q.question.id);

    const question = await this.questionRepository
      .createQueryBuilder('question')
      .where('question.id NOT IN (:...usedQuestionIds)', { usedQuestionIds: usedQuestionIds.length ? usedQuestionIds : [0] }) 
      .orderBy('RAND()') 
      .getOne();

    if (!question) {
      this.logger.warn('No new questions available. Reusing an old one.');
    } else {
      await this.historyRepository.save({ question, dayOfWeek });
      this.logger.log(`Daily question assigned: ${question.id}`);
    }
  }

  async getDailyQuestion(): Promise<Question | null> {
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10); 
  
    const historyEntry = await this.historyRepository.findOne({
      where: {
        assignedAt: Raw((alias) => `DATE(${alias}) = :today`, { today: todayStr }),
      },
      relations: ['question'],
      order: { assignedAt: 'DESC' },
    });
  
    return historyEntry ? historyEntry.question : null;
  }

}
