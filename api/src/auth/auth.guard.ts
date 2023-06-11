import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthTokenService } from './auth-token.service';
import { authPayloadKey } from './auth-payload-key';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authToken: AuthTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const token = request.headers.authorization?.slice(7) || '';
    try {
      const payload = await this.authToken.verifyToken(token);
      request[authPayloadKey] = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
