import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { generateSlug } from 'src/common/helpers';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(createProductDto: CreateProductDto) {
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2002') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const field = error.meta?.target?.[0];
        throw new ConflictException(
          `A product with this ${field} already exists`,
        );
      }
      throw error;
    }
  }
}
