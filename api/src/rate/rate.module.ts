import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { AuthModule } from 'src/auth/auth.module';
import { RateService } from './rate.service';

@Module({
  imports: [AuthModule],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
