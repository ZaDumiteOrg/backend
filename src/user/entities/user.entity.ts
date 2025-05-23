import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Role } from '../../roles/enums/role.enum'
import { Word } from '../../word/entities/word.entity';
import { UserQuestion } from '../../user-question/entities/user-question.entity';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User, 
      })
      role: Role;

    @Column({ default: 0 })
    totalScore: number;

    @ManyToMany(() => Word)
    @JoinTable() 
    words: Word[];
    
    @OneToMany(() => UserQuestion, (userQuestion) => userQuestion.user)
    userQuestions: UserQuestion[];

   
}

