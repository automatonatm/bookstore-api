import { BookGenre, BookSortBy, SortOrder } from '@app/core/types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class BookFilterDto {
  @ApiPropertyOptional({ description: 'book title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'book author' })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional({ description: 'book genre', enum: BookGenre })
  @IsOptional()
  @IsEnum(BookGenre)
  genre?: BookGenre;

  @ApiPropertyOptional({ description: 'sort by', enum: BookSortBy })
  @IsOptional()
  @IsEnum(BookSortBy)
  @IsString()
  sortBy?: BookSortBy;

  @ApiPropertyOptional({ description: 'sort order', enum: SortOrder })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;

  @ApiPropertyOptional({ description: 'offset' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  offset?: number;

  @ApiPropertyOptional({ description: 'limit' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  limit?: number;
}
