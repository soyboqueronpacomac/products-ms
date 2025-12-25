import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

export class DatabaseExceptionHandler {
  private static readonly logger = new Logger('DatabaseExceptionHandler');

  static handleException(error: any): never {
    // Log the error for debugging
    this.logger.error(error);

    // Prisma unique constraint violation
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const field = error.meta?.target as string[];
        throw new BadRequestException(
          `A product with this ${field?.join(', ')} already exists`,
        );
      }

      // Record not found
      if (error.code === 'P2025') {
        throw new BadRequestException(error.meta?.cause || 'Record not found');
      }

      // Foreign key constraint failed
      if (error.code === 'P2003') {
        throw new BadRequestException('Foreign key constraint failed');
      }
    }

    // Prisma validation errors
    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new BadRequestException('Validation error in database operation');
    }

    // Default internal server error
    throw new InternalServerErrorException(
      'Unexpected error occurred. Please check server logs',
    );
  }
}
