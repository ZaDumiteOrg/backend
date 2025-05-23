import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserQuestionService } from './user-question.service';

@Controller('user-questions')
export class UserQuestionController {
    constructor(private readonly userQuestionService: UserQuestionService) {}

    @Post()
    async submitAnswer(
        @Body('userId') userId: number,
        @Body('questionId') questionId: number,
        @Body('selectedOption') selectedOption: string
    ) {
        return this.userQuestionService.saveUserAnswer(userId, questionId, selectedOption);
    }

    @Get('/score/:userId')
    async getUserScore(@Param('userId') userId: number) {
        return this.userQuestionService.getUserScore(userId);
    }
}
