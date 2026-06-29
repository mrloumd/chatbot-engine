import { ChatWindow } from '@/components/ChatWindow';

export default function ChatPage({ params }: { params: { botId: string } }) {
  return (
    <main
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: 24,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <a href="/" style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>
        &larr; All chatbots
      </a>
      <ChatWindow botId={params.botId} />
    </main>
  );
}
