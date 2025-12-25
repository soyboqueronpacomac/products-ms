import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { CreateProductUseCase, GetAlProductUseCase } from './use-cases';

@Injectable()
export class ProductsService {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductUseCase: GetAlProductUseCase,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return this.createProductUseCase.execute(createProductDto);
  }
  findAll() {
    return this.getAllProductUseCase.execute();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
