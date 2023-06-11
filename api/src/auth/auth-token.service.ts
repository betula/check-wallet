import Clerk from '@clerk/clerk-sdk-node/esm/instance';
import { Injectable } from '@nestjs/common';
import { EnvConfigService } from 'src/env-config/env-config.service';
import { AuthPayloadType } from './auth-payload-type';

@Injectable()
export class AuthTokenService {
  private clerk: ReturnType<typeof Clerk>;

  constructor(private readonly envConfigService: EnvConfigService) {
    this.clerkConnect();
  }

  private async clerkConnect() {
    const secretKey = this.envConfigService.get('CLERK_SECRET_KEY');
    this.clerk = Clerk({ secretKey });
  }

  async verifyToken(token: string): Promise<AuthPayloadType> {
    const jwtPayload = await this.clerk.verifyToken(token);
    return {
      userId: jwtPayload.sub,
    };
  }
}
