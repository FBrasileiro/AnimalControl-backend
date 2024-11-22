// src/modules/animal/dto/create-animal.dto.ts
import { IsInt, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateAnimalDto {
  @IsString({ message: 'Name must be a string.' })
  name: string;

  @IsDateString({}, { message: 'Date of birth must be a valid ISO 8601 date string.' })
  dateOfBirth: string;

  @IsString({ message: 'Sex must be a string.' })
  sex: string;

  @IsString({ message: 'Description must be a string.' })
  @IsOptional()
  description?: string;

  @IsInt({ message: 'Category ID must be an integer.' })
  categoryId: number;

  @IsInt({ message: 'Father ID must be an integer.' })
  @IsOptional()
  fatherId?: number;

  @IsInt({ message: 'Mother ID must be an integer.' })
  @IsOptional()
  motherId?: number;

  @IsString({ message: 'Label must be a string.' })
  label: string;

  @IsInt({ message: 'Average production must be an integer.' })
  @IsOptional()
  averageProduction?: number;

  @IsString({ message: 'Production name must be a string.' })
  @IsOptional()
  productionName?: string;

  @IsDateString({}, { message: 'Date of death must be a valid ISO 8601 date string.' })
  @IsOptional()
  dateOfDeath?: string;

  @IsString({ message: 'Race must be a string.' })
  race: string;

  @IsString({ message: 'Color must be a string.' })
  color: string;
}

