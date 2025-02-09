import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Word } from '../word/entities/word.entity';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Get('word-of-the-week') 
  async getWordOfTheWeek(): Promise<Word> {
    return this.userService.assignWordOfTheWeekToUsers();
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ):  Promise<User> {
    return this.userService.findOne(+id);
  }

  @Get(':id/is-admin')
  async isAdmin(
    @Param('id')id: string,
  ): Promise<boolean> {
    return this.userService.isAdmin(+id)
  }

  @Patch(':id') 
  async update(
    @Param('id') id: number, 
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id') 
  async delete(
    @Param('id') id: number,
  ): Promise<void> {
    return this.userService.delete(id); 
  }

  @Public()
  @Post('assign-weekly-word')
  async assignWordOfTheWeek(): Promise<{ message: string }> {
    await this.userService.assignWordOfTheWeekToUsers();
    return { message: 'Word of the week assigned to all users' };
  }

  @Public()
  @Get(':id/words')
  async getUserWords(
    @Param('id') id: string,
  ): Promise<Word[]> {
    return this.userService.getUserWords(+id);
  }
}
