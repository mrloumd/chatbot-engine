import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BotsService } from '../../bots/bots.service';

/**
 * MVP tenant guard: ensures the requested bot exists and is active.
 * Replace/extend with real auth (per-business API key, user session, rate
 * limiting) before production — this is the multi-tenant access boundary.
 */
@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private readonly bots: BotsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const botId = req.body?.botId ?? req.params?.botId;
    if (!botId) throw new ForbiddenException('botId is required');

    const bot = await this.bots.findOne(botId);
    if (bot.status !== 'active') {
      throw new ForbiddenException('Bot is not active');
    }
    return true;
  }
}
