import { IsInt, IsString } from 'class-validator';

export class PostDto {
  @IsInt()
  readonly id?: number;

  @IsInt()
  readonly userId: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly body: string;
}
