import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { Question } from '../../question/entities/question.entity';

@Entity()
export class DailyQuestionHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, { eager: true, onDelete: 'CASCADE' })
  question: Question;

  @Column()
  dayOfWeek: number; 

  @CreateDateColumn()
  assignedAt: Date; 
}
