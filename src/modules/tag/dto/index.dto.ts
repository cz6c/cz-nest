import { IsOptional, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto, PaginationVO, CommonVO } from '@/common/common.dto';

export class TagVO extends CommonVO {
  @ApiPropertyOptional({ description: '名称' })
  readonly name: string;
}

// 列表
export class TagListVO extends PaginationVO {
  @ApiPropertyOptional({ type: [TagVO], description: '列表' })
  readonly list: TagVO[];
}

// 列表查询
export class TagListParamsDto extends PaginationDto {
  @ApiPropertyOptional({ description: '名称' })
  @IsOptional()
  @IsNotEmpty()
  readonly name: string;
}