import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Turns text into vectors. Claude does NOT produce embeddings, so this uses a
 * separate provider — Voyage AI by default. Swap the URL/model/headers to use
 * OpenAI, Cohere, etc. Keep the output dimension in sync with the Atlas index
 * (voyage-3 = 1024 dims).
 */
@Injectable()
export class EmbeddingsService {
  constructor(private readonly config: ConfigService) {}

  async embed(
    texts: string[],
    inputType: 'document' | 'query' = 'document',
  ): Promise<number[][]> {
    const apiKey = this.config.get<string>('EMBEDDINGS_API_KEY');
    const model = this.config.get<string>('EMBEDDINGS_MODEL') ?? 'voyage-3';

    const res = await fetch('https://api.voyageai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ input: texts, model, input_type: inputType }),
    });

    if (!res.ok) {
      throw new Error(`Embeddings request failed: ${res.status} ${await res.text()}`);
    }

    const data = (await res.json()) as { data: { embedding: number[] }[] };
    return data.data.map((d) => d.embedding);
  }
}
