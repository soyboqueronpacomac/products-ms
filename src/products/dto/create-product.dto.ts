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

enum ValidSizes {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
  XXXL = 'XXXL',
}

enum ValidTypes {
  SHIRTS = 'shirts',
  PANTS = 'pants',
  HOODIES = 'hoodies',
  HATS = 'hats',
}

enum ValidGender {
  MEN = 'men',
  WOMEN = 'women',
  KID = 'kid',
  UNISEX = 'unisex',
}

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
