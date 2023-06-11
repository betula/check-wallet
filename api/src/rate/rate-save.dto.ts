import { IsNotEmpty, IsString } from 'class-validator';

export class RateSaveDto {
  @IsNotEmpty()
  @IsString()
  selectedName: string;

  @IsNotEmpty()
  @IsString()
  ethCostManual: string;
}
