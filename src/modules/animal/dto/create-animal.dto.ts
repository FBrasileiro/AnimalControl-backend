// src/modules/animal/dto/create-animal.dto.ts
import { IsInt, IsOptional, IsString, IsDate, IsDateString } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  name: string;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  sex: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  categoryId: number;

  @IsInt()
  @IsOptional()
  fatherId?: number;

  @IsInt()
  @IsOptional()
  motherId?: number;

  @IsString()
  label: string;

  @IsInt()
  @IsOptional()
  averageProduction?: number;

  @IsString()
  @IsOptional()
  productionName?: string;

  @IsDateString()
  @IsOptional()
  dateOfDeath?: string;

  @IsString()
  race: string;

  @IsString()
  color: string;
}
