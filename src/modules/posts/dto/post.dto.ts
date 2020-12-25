import { IsInt, IsString } from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiHideProperty()
  @IsInt()
  readonly userId: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly body: string;
}
