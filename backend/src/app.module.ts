import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { DatabaseModule } from './database/database.module';
import { BotsModule } from './bots/bots.module';
import { ChatModule } from './chat/chat.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { RagModule } from './rag/rag.module';
import { LlmModule } from './llm/llm.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    DatabaseModule,
    BotsModule,
    ChatModule,
    IngestionModule,
    RagModule,
    LlmModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
