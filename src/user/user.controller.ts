import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: User): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string):  Promise<User> {
    return this.userService.findOne(+id);
  }

  @Patch(':id') 
  async update(@Param('id') id: number, @Body() updateUserDto: Partial<User>): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id') 
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id); 
  }
}
