import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

interface QuestionAnsweredEvent {
  botId: string;
  question: string;
  answer: string;
}

@Injectable()
export class LogConversationListener {
  private readonly logger = new Logger('Conversation');

  /**
   * MVP: just log. Later, persist to a `conversations` collection and update
   * per-bot usage/quota here — fully decoupled from the chat response path.
   */
  @OnEvent('question.answered')
  handle(payload: QuestionAnsweredEvent) {
    this.logger.log(`[${payload.botId}] Q: ${payload.question.slice(0, 80)}`);
  }
}
