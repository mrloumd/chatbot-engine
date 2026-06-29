import { Bot, ChatRequest, ChatResponse } from '@/types';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export async function getBots(): Promise<Bot[]> {
  const res = await fetch(`${API}/bots`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load bots');
  return res.json();
}

export async function sendMessage(req: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${API}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Chat request failed');
  return res.json();
}
