import{ IsString, IsEmail, IsOptional, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsOptional() 
    @IsEnum(UserRole, { message: 'role must be either "admin" or "user"' })
    role?: UserRole; 
}

