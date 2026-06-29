import { Body, Controller, Post } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { IngestDto } from './dto/ingest.dto';

@Controller('ingest')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  /** Load a business's document text into its knowledge base. (Admin.) */
  @Post()
  ingest(@Body() dto: IngestDto) {
    return this.ingestionService.ingest(dto);
  }
}
