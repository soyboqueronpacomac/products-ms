import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateProductDto } from '../dto';
import { DatabaseExceptionHandler } from 'src/common/exceptions';
import { Product } from '@prisma/client';

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(updateProductDto: UpdateProductDto): Promise<Product> {
    const { id, ...data } = updateProductDto;
    // First, check if the product exists
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

    try {
      // Update the product
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: data,
      });

      return updatedProduct;
    } catch (error) {
      DatabaseExceptionHandler.handleException(error);
    }
  }
}
