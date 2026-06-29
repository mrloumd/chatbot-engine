import { Message } from '@/types';

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        maxWidth: '80%',
        padding: '10px 14px',
        borderRadius: 12,
        background: isUser ? '#0b5cff' : '#fff',
        color: isUser ? '#fff' : '#111',
        border: isUser ? 'none' : '1px solid #e5e5e5',
        whiteSpace: 'pre-wrap',
      }}
    >
      {message.content}
    </div>
  );
}
