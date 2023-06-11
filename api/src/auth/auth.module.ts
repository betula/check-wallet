import { Module } from '@nestjs/common';
import { AuthTokenService } from './auth-token.service';
import { EnvConfigModule } from 'src/env-config/env-config.module';

@Module({
  imports: [EnvConfigModule],
  controllers: [],
  exports: [AuthTokenService],
  providers: [AuthTokenService],
})
export class AuthModule {}
