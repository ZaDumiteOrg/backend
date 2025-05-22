import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Question } from '../../question/entities/question.entity';

@Entity()
export class UserQuestion {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.userQuestions, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => Question, (question) => question.userQuestions, { onDelete: "CASCADE" })
    question: Question;

    @Column()
    selectedOption: string; 

    @Column({ default: false })
    isCorrect: boolean; 

    @CreateDateColumn()
    answeredAt: Date; 
}
