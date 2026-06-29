import { Module } from '@nestjs/common';
import { LogConversationListener } from './listeners/log-conversation.listener';

@Module({
  providers: [LogConversationListener],
})
export class AnalyticsModule {}
