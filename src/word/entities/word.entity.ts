import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Word {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    insteadOf?: string;

    @Column()
    word: string;

    @Column({type: 'text'})
    description: string;

    @Column({type: 'text'})
    example: string;
}


