import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WordService } from './word.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { Word } from './entities/word.entity'
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';


@Controller('word')
@UseGuards(RolesGuard)
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createWordDto: CreateWordDto): Promise<Word> {
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
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateWordDto: UpdateWordDto,
  ): Promise<Word> {
    return this.wordService.update(+id, updateWordDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: string): Promise<void> {
    return this.wordService.delete(+id);
  }
}
