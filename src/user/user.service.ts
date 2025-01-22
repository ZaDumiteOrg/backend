import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../roles/enums/role.enum'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Word } from '../word/entities/word.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Word) 
    private readonly wordRepository: Repository<Word>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    const user = this.userRepository.create({
      ...createUserDto,
      role: createUserDto.role || Role.User, 
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = this.userRepository.findOneBy({id});
    if(!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = this.userRepository.findOneBy({email});
    if(!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async isAdmin(id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user.role === 'admin';
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltRounds);
    }
    Object.assign(user, updateUserDto); 
    return this.userRepository.save(user); 
  }

  async delete(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async assignWordOfTheWeekToUsers(): Promise<Word> {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const currentWeek = Math.floor((now.getTime() - startOfYear.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
  
    const totalWords = await this.wordRepository.count();
  
    if (totalWords === 0) {
      throw new Error('No words available in the database.');
    }
  
    const wordWeek = ((currentWeek - 1) % totalWords) + 1;
  
    const wordOfTheWeek = await this.wordRepository.findOneBy({ week: wordWeek });
    console.log("Word from user service:", wordOfTheWeek)
  
    if (!wordOfTheWeek) {
      throw new Error(`No word found for week ${wordWeek}`);
    }
  
    const users = await this.userRepository.find({
      relations: ['words'], 
    });
  
    for (const user of users) {
      if (!user.words.some((word) => word.id === wordOfTheWeek.id)) {
        user.words.push(wordOfTheWeek);
        await this.userRepository.save(user);
      }
    }
    return wordOfTheWeek;
  }
  

  async getUserWords(userId: number): Promise<Word[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['words'], 
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user.words;
  }
}
