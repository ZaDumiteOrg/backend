import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserQuestion } from '../../user-question/entities/user-question.entity';


@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    questionText: string;

    @Column()
    optionA: string;

    @Column()
    optionB: string;

    @Column({nullable:true})
    optionC?: string;

    @Column({nullable:true})
    optionD?: string;

    @Column()
    correctOption: string;

    @OneToMany(() => UserQuestion, (userQuestion) => userQuestion.question)
    userQuestions: UserQuestion[];
}