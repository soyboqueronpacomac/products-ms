import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Product } from '@prisma/client';

interface Meta {
  total: number;
  page: number;
  lastPage: number;
}

interface PaginatedResponse {
  meta: Meta;
  data: Product[];
}

@Injectable()
export class GetAlProductUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(paginationDto: PaginationDto): Promise<PaginatedResponse> {
    const { limit = 10, page = 1 } = paginationDto;

    // Only count available products
    const totalPages = await this.prisma.product.count({
      where: { available: true },
    });
    const lastPage = Math.ceil(totalPages / limit);
    console.log({ totalPages, lastPage });

    if (page > lastPage && lastPage > 0) {
      throw new BadRequestException(
        `Page ${page} does not exist. The last available page is ${lastPage}`,
      );
    }

    // Only fetch available products
    const data = await this.prisma.product.findMany({
      where: { available: true },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      meta: {
        total: totalPages,
        page,
        lastPage,
      },
      data,
    };
  }
}
