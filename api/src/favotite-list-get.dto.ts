import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class FavoriteListGetDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  addresses: string[];
}
