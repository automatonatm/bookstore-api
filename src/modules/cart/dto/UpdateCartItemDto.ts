import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UpdateCartItemDto {
  @ApiProperty({ description: 'Quantity', example: 4 })
  @IsNotEmpty({ message: 'Quantity is required' })
  @IsInt({ message: 'Quantity must be an integer' })
  @Min(1, { message: 'Quantity must be greater than 0' })
  quantity: number;
}
