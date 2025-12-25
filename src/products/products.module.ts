import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma.service';
import { CreateProductUseCase, GetAlProductUseCase } from './use-cases';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    PrismaService,
    CreateProductUseCase,
    GetAlProductUseCase,
  ],
})
export class ProductsModule {}
