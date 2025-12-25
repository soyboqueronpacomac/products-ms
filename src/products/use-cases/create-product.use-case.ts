import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { generateSlug } from 'src/common/helpers';
import { DatabaseExceptionHandler } from 'src/common/exceptions';
import { Product } from '@prisma/client';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(createProductDto: CreateProductDto): Promise<Product> {
    // Genera el slug desde el title
    const slug = generateSlug(createProductDto.title);

    try {
      return await this.prisma.product.create({
        data: {
          ...createProductDto,
          slug,
        },
      });
    } catch (error) {
      DatabaseExceptionHandler.handleException(error);
    }
  }
}
