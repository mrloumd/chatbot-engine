import { Injectable } from '@nestjs/common';

@Injectable()
export class ChunkerService {
  /**
   * Simple character-based chunker with overlap. Good enough for MVP.
   * Swap for a token-aware splitter (e.g. LangChain RecursiveCharacterTextSplitter)
   * if you need precise token budgets.
   */
  chunk(text: string, size = 1000, overlap = 150): string[] {
    const clean = text.replace(/\s+/g, ' ').trim();
    if (!clean) return [];

    const chunks: string[] = [];
    let start = 0;
    while (start < clean.length) {
      const end = Math.min(start + size, clean.length);
      chunks.push(clean.slice(start, end));
      if (end === clean.length) break;
      start += size - overlap;
    }
    return chunks;
  }
}
