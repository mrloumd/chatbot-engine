import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BotsService } from '../bots/bots.service';
import { RetrieverService } from '../rag/retriever.service';
import { ClaudeService, ChatTurn } from '../llm/claude.service';
import { PromptBuilder } from '../llm/prompt.builder';
import { ChatRequestDto } from './dto/chat-request.dto';

@Injectable()
export class ChatService {
  constructor(
    private readonly bots: BotsService,
    private readonly retriever: RetrieverService,
    private readonly claude: ClaudeService,
    private readonly prompts: PromptBuilder,
    private readonly events: EventEmitter2,
  ) {}

  async ask(dto: ChatRequestDto): Promise<{ answer: string; sources: string[] }> {
    // 1. Load this business's bot config.
    const bot = await this.bots.findOne(dto.botId);

    // 2. Retrieve ONLY this bot's relevant chunks.
    const chunks = await this.retriever.retrieve(dto.botId, dto.question);

    // 3. Build the grounded system prompt.
    const system = this.prompts.build(bot, chunks);

    // 4. Ask Claude (history + the new question).
    const messages: ChatTurn[] = [
      ...(dto.history ?? []),
      { role: 'user', content: dto.question },
    ];
    const answer = await this.claude.generate({
      model: bot.model,
      system,
      messages,
    });

    // 5. Fire-and-forget side-effects (logging / analytics / quota).
    this.events.emit('question.answered', {
      botId: dto.botId,
      question: dto.question,
      answer,
    });

    const sources = [
      ...new Set(chunks.map((c) => c.source).filter((s): s is string => !!s)),
    ];
    return { answer, sources };
  }
}
