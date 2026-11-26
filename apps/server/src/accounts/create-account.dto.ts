import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;
}
