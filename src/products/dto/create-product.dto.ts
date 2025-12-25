import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { ValidSizes, ValidTypes, ValidGender } from '@prisma/client';

export class CreateProductDto {
  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  public stock?: number = 0;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0)
  @Type(() => Number)
  public price?: number = 0;

  @IsArray()
  @IsEnum(ValidSizes, { each: true })
  public sizes: ValidSizes[];

  @IsArray()
  @IsString({ each: true })
  public tags: string[];

  @IsString()
  @MinLength(1)
  public title: string;

  @IsEnum(ValidTypes)
  public type: ValidTypes;

  @IsEnum(ValidGender)
  public gender: ValidGender;
}
