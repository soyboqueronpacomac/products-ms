import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GetAlProductUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    return await this.prisma.product.findMany({});
  }
}
