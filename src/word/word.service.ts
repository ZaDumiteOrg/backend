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
    const word = this.wordRepository.create(createWordDto);
    return this.wordRepository.save(word);
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
