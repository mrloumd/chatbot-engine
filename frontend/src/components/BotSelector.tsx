import Link from 'next/link';
import { Bot } from '@/types';

export function BotSelector({ bots }: { bots: Bot[] }) {
  if (!bots.length) {
    return (
      <p style={{ color: '#666' }}>
        No chatbots available yet. Create one via the backend API (
        <code>POST /api/bots</code>), then refresh.
      </p>
    );
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
      {bots.map((bot) => (
        <li key={bot._id}>
          <Link
            href={`/chat/${bot._id}`}
            style={{
              display: 'block',
              padding: 16,
              background: '#fff',
              borderRadius: 8,
              textDecoration: 'none',
              border: '1px solid #e5e5e5',
            }}
          >
            <strong>{bot.name}</strong>
            <div style={{ color: '#666', fontSize: 14 }}>{bot.businessName}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
