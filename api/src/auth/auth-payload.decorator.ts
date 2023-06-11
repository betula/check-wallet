import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { authPayloadKey } from './auth-payload-key';

export const AuthPayload = createParamDecorator(
  (_data: string, context: ExecutionContext) => {
    return context.switchToHttp().getRequest()[authPayloadKey];
  },
);
