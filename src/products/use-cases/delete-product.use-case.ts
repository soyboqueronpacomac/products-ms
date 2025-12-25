import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DatabaseExceptionHandler } from 'src/common/exceptions';
import { Product } from '@prisma/client';

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<Product> {
    // First, check if the product exists
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

    try {
      // Soft delete: set available to false
      const deletedProduct = await this.prisma.product.update({
        where: { id },
        data: { available: false },
      });

      return deletedProduct;
    } catch (error) {
      DatabaseExceptionHandler.handleException(error);
    }
  }
}
