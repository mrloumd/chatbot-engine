import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatRequestDto } from './dto/chat-request.dto';
import { TenantGuard } from '../common/guards/tenant.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UseGuards(TenantGuard)
  ask(@Body() dto: ChatRequestDto) {
    return this.chatService.ask(dto);
  }
}
