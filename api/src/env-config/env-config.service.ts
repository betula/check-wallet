import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type EnvName = 'PORT' | 'CLERK_SECRET_KEY';

@Injectable()
export class EnvConfigService {
  constructor(private readonly configService: ConfigService) {}

  get(name: EnvName) {
    const val = this.configService.get(name);
    if (!val) {
      throw new Error(`.env error, ${name} not specified`);
    }
    return val;
  }
}
