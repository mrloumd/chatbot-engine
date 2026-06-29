import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TenantGuard } from '../common/guards/tenant.guard';
import { BotsModule } from '../bots/bots.module';
import { RagModule } from '../rag/rag.module';
import { LlmModule } from '../llm/llm.module';

@Module({
  imports: [BotsModule, RagModule, LlmModule],
  controllers: [ChatController],
  providers: [ChatService, TenantGuard],
})
export class ChatModule {}
