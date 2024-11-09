import { IsOptional, IsString } from "class-validator"

export class CreateFarmDto {
  @IsString()
  name:string

  @IsString()
  @IsOptional()
  description:string
}
