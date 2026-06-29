import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

@Injectable()
export class ClaudeService {
  private readonly client: Anthropic;

  constructor(private readonly config: ConfigService) {
    this.client = new Anthropic({
      apiKey: this.config.get<string>('ANTHROPIC_API_KEY'),
    });
  }

  /** Single-shot generation. (Add a streaming variant for SSE later.) */
  async generate(params: {
    model: string;
    system: string;
    messages: ChatTurn[];
    maxTokens?: number;
  }): Promise<string> {
    const res = await this.client.messages.create({
      model: params.model,
      max_tokens: params.maxTokens ?? 1024,
      system: params.system,
      messages: params.messages,
    });

    return res.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('');
  }
}
