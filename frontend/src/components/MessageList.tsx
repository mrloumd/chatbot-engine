import { Message } from '@/types';
import { MessageBubble } from './MessageBubble';

export function MessageList({
  messages,
  loading,
}: {
  messages: Message[];
  loading: boolean;
}) {
  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {messages.length === 0 && (
        <p style={{ color: '#999' }}>Ask a question to get started.</p>
      )}
      {messages.map((m, i) => (
        <MessageBubble key={i} message={m} />
      ))}
      {loading && <MessageBubble message={{ role: 'assistant', content: '…' }} />}
    </div>
  );
}
