import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { validate as isUUID } from 'uuid';
import { Product } from '@prisma/client';

@Injectable()
export class FindProductByTermUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(term: string): Promise<Product> {
    let product;

    if (isUUID(term)) {
      product = await this.prisma.product.findFirst({
        where: {
          id: term,
          available: true,
        },
      });
    } else {
      product = await this.prisma.product.findFirst({
        where: {
          available: true,
          OR: [
            { title: { equals: term, mode: 'insensitive' } },
            { slug: term.toLowerCase() },
          ],
        },
      });
    }

    if (!product) {
      throw new NotFoundException(`Product with term "${term}" not found`);
    }

    return product;
  }
}
