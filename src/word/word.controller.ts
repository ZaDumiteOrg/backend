import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WordService } from './word.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { Word } from './entities/word.entity'
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';
import { AuthGuard } from '../auth/auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('word')
@UseGuards(AuthGuard)
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async create(@Body() createWordDto: CreateWordDto): Promise<Word> {
    return this.wordService.create(createWordDto);
  }

  @Public()
  @Get()
  async findAll() : Promise<Word[]> {
    return this.wordService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Word> {
    return this.wordService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateWordDto: UpdateWordDto,
  ): Promise<Word> {
    return this.wordService.update(+id, updateWordDto);
  }


  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string): Promise<void> {
    return this.wordService.delete(+id);
  }
}
