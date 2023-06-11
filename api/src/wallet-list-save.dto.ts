import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class WalletItemDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsBoolean()
  favorite: boolean;
}

export class WalletListSaveDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WalletItemDto)
  wallets: WalletItemDto[];
}
