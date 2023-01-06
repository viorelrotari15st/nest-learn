import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'email@provider.com', description: 'email' })
  @IsString({ message: 'Accept only string' })
  @IsEmail({}, { message: 'Incorrect structure of email' })
  readonly email: string;

  @ApiProperty({ example: 'bbbbbb', description: 'user password' })
  @IsString({ message: 'Accept only string' })
  @Length(4, 16, { message: 'Minimum acceptable symbols is 4 max 16' })
  readonly password: string;
}
