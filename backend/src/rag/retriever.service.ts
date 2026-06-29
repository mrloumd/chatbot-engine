import { Injectable } from '@nestjs/common';
import { EmbeddingsService } from './embeddings.service';
import { RetrievedChunk, VectorstoreService } from './vectorstore.service';

@Injectable()
export class RetrieverService {
  constructor(
    private readonly embeddings: EmbeddingsService,
    private readonly vectorstore: VectorstoreService,
  ) {}

  /**
   * `botId` is REQUIRED — never default it. This is the multi-tenant isolation
   * boundary: a question only ever searches its own business's chunks.
   */
  async retrieve(
    botId: string,
    question: string,
    limit = 5,
  ): Promise<RetrievedChunk[]> {
    const [queryEmbedding] = await this.embeddings.embed([question], 'query');
    return this.vectorstore.search(botId, queryEmbedding, limit);
  }
}
