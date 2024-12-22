import { Column, Entity, PrimaryGeneratedColumn, }from 'typeorm';
import { Role } from '../../roles/enums/role.enum'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

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
}

