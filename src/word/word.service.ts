import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from './entities/word.entity'
import { Repository } from 'typeorm';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  async create(createWordDto: CreateWordDto): Promise<Word> {
    const latestWords = await this.wordRepository.find({
      order: { week: 'DESC' },
      take: 1, 
    });
  
    console.log('Latest word:', latestWords);
    const nextWeek = latestWords.length === 0 ? 1 : latestWords[0].week + 1;
  
    console.log('Next week:' , nextWeek);
    const newWord = this.wordRepository.create({
      ...createWordDto,
      week: nextWeek,
    });
  
    return this.wordRepository.save(newWord);
  }
  

  async getWordOfTheWeek(): Promise<Word | null> {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - startOfYear.getTime();
    const currentWeek = Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1;

    const totalWords = await this.wordRepository.count();
    if (totalWords === 0) {
      return null; 
    }

    const wordWeek = ((currentWeek - 1) % totalWords) + 1;

    const wordOfTheWeek = await this.wordRepository.findOneBy({ week: wordWeek });
    return wordOfTheWeek;
  }
  

  async findAll(): Promise<Word[]> {
    return this.wordRepository.find();
  }

  async findOne(id: number): Promise<Word> {
    const word = await this.wordRepository.findOneBy({id});
    if(!word) {
      throw new NotFoundException(`Word with ID ${id} not found`);
    }
    return word;
  }

  async update(id: number, updateWordDto: UpdateWordDto): Promise<Word> {
    const word = await this.wordRepository.findOne({ where: { id } });
    if (!word) {
      throw new NotFoundException(`Word with ID ${id} not found`);
    }
    Object.assign(word, updateWordDto); 
    return this.wordRepository.save(word);
  }

  async delete(id: number): Promise<void> {
    const result = await this.wordRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Word with ID ${id} not found`);
    }
  }
}
