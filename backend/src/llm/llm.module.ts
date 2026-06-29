import { Module } from '@nestjs/common';
import { ClaudeService } from './claude.service';
import { PromptBuilder } from './prompt.builder';

@Module({
  providers: [ClaudeService, PromptBuilder],
  exports: [ClaudeService, PromptBuilder],
})
export class LlmModule {}
