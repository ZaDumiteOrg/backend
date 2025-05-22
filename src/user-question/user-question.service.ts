import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { UserQuestion } from './entities/user-question.entity';
import { User } from '../user/entities/user.entity';
import { Question } from '../question/entities/question.entity';

@Injectable()
export class UserQuestionService {
    constructor(
        @InjectRepository(UserQuestion)
        private readonly userQuestionRepository: Repository<UserQuestion>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
    ) {}

    async saveUserAnswer(userId: number, questionId: number, selectedOption: string): Promise<UserQuestion> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const question = await this.questionRepository.findOne({ where: { id: questionId } });

        if (!user || !question) {
            throw new Error('User or Question not found');
        }

        const isCorrect = selectedOption === question.correctOption;

        const userQuestion = this.userQuestionRepository.create({
            user,
            question,
            selectedOption,
            isCorrect
        });

        await this.userQuestionRepository.save(userQuestion);

        if (isCorrect) {
            user.totalScore += 1;
            await this.userRepository.save(user);
        }

        return userQuestion;
    }

    async getUserScore(userId: number): Promise<number> {
        const correctAnswers = await this.userQuestionRepository.count({
            where: { user: { id: userId }, isCorrect: true },
        });

        return correctAnswers;
    }
}
