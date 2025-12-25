import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
interface Meta {
  total: number;
  page: number;
}
@Injectable()
export class GetAlProductUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
    const totalPages = await this.prisma.product.count();
    const lastPage = Math.ceil(totalPages / limit);
    console.log({ totalPages, lastPage });

    if (page > lastPage) {
      throw new BadRequestException(
        `Page ${page} does not exist. The last available page is ${lastPage}`,
      );
    }

    const data = await this.prisma.product.findMany({
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
