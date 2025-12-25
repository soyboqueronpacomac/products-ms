import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { validate as isUUID } from 'uuid';

@Injectable()
export class FindProductByTermUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(term: string) {
    let product;

    if (isUUID(term)) {
      product = await this.prisma.product.findUnique({
        where: { id: term },
      });
    } else {
      product = await this.prisma.product.findFirst({
        where: {
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
