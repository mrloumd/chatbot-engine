'use client';

import { useChat } from '@/hooks/useChat';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';

export function ChatWindow({ botId }: { botId: string }) {
  const { messages, loading, send } = useChat(botId);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        minHeight: 0,
      }}
    >
      <MessageList messages={messages} loading={loading} />
      <ChatInput onSend={send} disabled={loading} />
    </div>
  );
}
