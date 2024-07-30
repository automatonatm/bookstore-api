import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty({ description: 'Book ID', example: 1 })
  @IsNotEmpty({ message: 'Book ID is required' })
  @IsInt({ message: 'Book ID must be an integer' })
  bookId: number;

  @ApiProperty({ description: 'Quantity', example: 4 })
  @IsNotEmpty({ message: 'Quantity is required' })
  @Min(1, { message: 'Quantity must be greater than 0' })
  quantity: number;
}
