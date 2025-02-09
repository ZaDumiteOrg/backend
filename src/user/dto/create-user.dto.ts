import{ IsString, IsEmail, IsOptional, MinLength, IsEnum } from 'class-validator';
import{ Role } from '../../roles/enums/role.enum'
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
    @IsEnum(Role, { message: 'role must be either "admin" or "user"' })
    role?: Role; 
}

