import { Injectable } from '@nestjs/common';
import { ChunkerService } from '../rag/chunker.service';
import { EmbeddingsService } from '../rag/embeddings.service';
import { VectorstoreService } from '../rag/vectorstore.service';
import { IngestDto } from './dto/ingest.dto';

@Injectable()
export class IngestionService {
  constructor(
    private readonly chunker: ChunkerService,
    private readonly embeddings: EmbeddingsService,
    private readonly vectorstore: VectorstoreService,
  ) {}

  /**
   * Synchronous pipeline — fine for MVP / small docs:
   *   chunk -> embed -> store, all scoped to botId.
   * For large/many docs, move this into a BullMQ processor (see plan.md).
   */
  async ingest(dto: IngestDto): Promise<{ chunks: number }> {
    const chunks = this.chunker.chunk(dto.text);
    if (chunks.length === 0) return { chunks: 0 };

    const embeddings = await this.embeddings.embed(chunks, 'document');
    await this.vectorstore.store(
      dto.botId,
      chunks.map((text, i) => ({
        text,
        embedding: embeddings[i],
        source: dto.source,
      })),
    );

    return { chunks: chunks.length };
  }
}
