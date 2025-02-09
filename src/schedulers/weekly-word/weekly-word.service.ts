import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UserService } from '../../user/user.service';

@Injectable()
export class WeeklyWordService {
  constructor(private readonly userService: UserService) {}

  @Cron('0 9 * * 1')
  async assignWeeklyWord() {
    try {
      await this.userService.assignWordOfTheWeekToUsers();
    } catch (error) {
      throw new InternalServerErrorException(`Error assigning word of the week: ${error.message}`);
    }
  }
}
