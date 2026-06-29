'use client';

import { useState } from 'react';
import { Message } from '@/types';
import { sendMessage } from '@/lib/api';

export function useChat(botId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function send(question: string) {
    const next: Message[] = [...messages, { role: 'user', content: question }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await sendMessage({ botId, question, history: messages });
      setMessages([...next, { role: 'assistant', content: res.answer }]);
    } catch {
      setMessages([
        ...next,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return { messages, loading, send };
}
