import { IsString, IsNumber } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'Accept only string value' })
  readonly value: string;
  @IsNumber({}, { message: 'Accept only numbers' })
  readonly userId: number;
}
