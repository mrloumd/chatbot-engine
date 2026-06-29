import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class IngestDto {
  @ApiProperty({ example: '<bot id returned from POST /api/bots>' })
  @IsString()
  botId: string;

  @ApiProperty({
    example: 'Refunds are available within 30 days of purchase. To request a refund, email support@acme.com.',
    description: 'Raw text to ingest. (File upload + PDF/DOCX loaders come later.)',
  })
  @IsString()
  text: string;

  @ApiPropertyOptional({ example: 'refund-policy.pdf' })
  @IsOptional()
  @IsString()
  source?: string;
}
