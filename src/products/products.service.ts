import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import {
  CreateProductUseCase,
  GetAlProductUseCase,
  FindProductByTermUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from './use-cases';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductUseCase: GetAlProductUseCase,
    private readonly findProductByTermUseCase: FindProductByTermUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.createProductUseCase.execute(createProductDto);
  }

  findAll(paginationDto: PaginationDto): Promise<{
    meta: { total: number; page: number; lastPage: number };
    data: Product[];
  }> {
    return this.getAllProductUseCase.execute(paginationDto);
  }

  findOne(term: string): Promise<Product> {
    return this.findProductByTermUseCase.execute(term);
  }

  update(updateProductDto: UpdateProductDto): Promise<Product> {
    return this.updateProductUseCase.execute(updateProductDto);
  }

  remove(id: string): Promise<Product> {
    return this.deleteProductUseCase.execute(id);
  }
}
