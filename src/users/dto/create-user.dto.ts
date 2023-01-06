import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'email@provider.com', description: 'email' })
  readonly email: string;

  @ApiProperty({ example: 'bbbbbb', description: 'user password' })
  readonly password: string;
}
