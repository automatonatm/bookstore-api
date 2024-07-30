import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class OrderItemDto {
  @ApiProperty({ description: 'Book ID' })
  @IsInt()
  @IsNotEmpty()
  bookId: number;

  @ApiProperty({ description: 'Quantity' })
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Order items',
    type: [OrderItemDto],
    isArray: true,
    example: [
      { bookId: 1, quantity: 1 },
      { bookId: 2, quantity: 2 },
    ],
  })
  @IsArray({ message: 'order items should be an array' })
  @ArrayMinSize(1, { message: 'At least one item is required' })
  @ArrayMaxSize(5, { message: 'Maximum of 5 items' })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
