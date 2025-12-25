import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import {
  CreateProductUseCase,
  GetAlProductUseCase,
  FindProductByTermUseCase,
} from './use-cases';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductUseCase: GetAlProductUseCase,
    private readonly findProductByTermUseCase: FindProductByTermUseCase,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return this.createProductUseCase.execute(createProductDto);
  }
  findAll(paginationDto: PaginationDto) {
    return this.getAllProductUseCase.execute(paginationDto);
  }

  findOne(term: string) {
    return this.findProductByTermUseCase.execute(term);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
