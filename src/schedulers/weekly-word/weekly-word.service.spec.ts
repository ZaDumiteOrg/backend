import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyWordService } from './weekly-word.service';

describe('WeeklyWordService', () => {
  let service: WeeklyWordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeeklyWordService],
    }).compile();

    service = module.get<WeeklyWordService>(WeeklyWordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
