import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WordService } from './word.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { Word } from './entities/word.entity'

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  async create(@Body() createWordDto: Word) : Promise<Word> {
    return this.wordService.create(createWordDto);
  }

  @Get()
  async findAll() : Promise<Word[]> {
    return this.wordService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Word> {
    return this.wordService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWordDto: Partial<Word>): Promise<Word> {
    return this.wordService.update(+id, updateWordDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.wordService.delete(+id);
  }
}
