import { IsString, IsOptional } from 'class-validator';

export class CreateWordDto {
  @IsString() 
  word: string;

  @IsString() 
  description: string;

  @IsString() 
  example: string;

  @IsOptional() 
  @IsString() 
  insteadOf?: string; 
}
