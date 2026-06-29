import { getBots } from '@/lib/api';
import { BotSelector } from '@/components/BotSelector';
import { Bot } from '@/types';

export default async function Home() {
  let bots: Bot[] = [];
  try {
    bots = await getBots();
  } catch {
    // Backend not running yet, or no bots created — BotSelector shows guidance.
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
      <h1>Choose a chatbot</h1>
      <p style={{ color: '#666' }}>Pick a business to start a conversation.</p>
      <BotSelector bots={bots} />
    </main>
  );
}
