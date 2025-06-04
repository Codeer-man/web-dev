import { ExecutionContext, Injectable } from '@nestjs/common';
import {
  ThrottlerException,
  ThrottlerGuard,
  ThrottlerLimitDetail,
} from '@nestjs/throttler';

@Injectable()
export class loginThrottlerLimit extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    const email = req.body?.email;
    return `login-${email}`;
  }

  //   set rate limit
  protected getLimit(): Promise<number> {
    return Promise.resolve(5);
  }

  //   set time
  protected getTime(): Promise<number> {
    return Promise.resolve(6000);
  }

  protected async throwThrottlingException(
    context: ExecutionContext,
    throttlerLimitDetail: ThrottlerLimitDetail,
  ): Promise<void> {
    throw new ThrottlerException(`Too many attempts. Try again after 1 min`);
  }
}
