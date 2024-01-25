import { Role } from '@prisma/client';
import { IsDefined, IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  password: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsDefined()
  @IsEnum(Role)
  role: Role = 'USER';
}
