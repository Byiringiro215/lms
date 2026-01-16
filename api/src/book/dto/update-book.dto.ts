import { IsString, IsInt, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty({ example: 'The Great Gatsby (Updated)', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald', required: false })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({ example: 'NOVEL', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: '9780743273565', required: false })
  @IsString()
  @IsOptional()
  isbn?: string;

  @ApiProperty({ example: 6, required: false })
  @IsInt()
  @Min(1)
  @IsOptional()
  totalCopies?: number;
}
