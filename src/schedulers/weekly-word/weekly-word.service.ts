import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UserService } from '../../user/user.service';

@Injectable()
export class WeeklyWordService {
  constructor(private readonly userService: UserService) {}

  @Cron('0 9 * * 1')
  async assignWeeklyWord() {
    console.log('Scheduler triggered: Assigning word of the week...');

    try {
      const assignedWord = await this.userService.assignWordOfTheWeekToUsers();
      console.log('Assigned Word of the Week:', assignedWord);
      console.log('Word of the week assigned successfully.');
    } catch (error) {
      console.error('Error assigning word of the week:', error.message);
    }
  }
}
