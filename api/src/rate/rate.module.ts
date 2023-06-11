import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { AuthModule } from 'src/auth/auth.module';
import { RateService } from './rate.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RateSchemaKey, RateSchema } from './rate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RateSchemaKey, schema: RateSchema }]),
    AuthModule,
  ],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
