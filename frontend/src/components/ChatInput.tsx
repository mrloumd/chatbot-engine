'use client';

import { FormEvent, useState } from 'react';

export function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (question: string) => void;
  disabled: boolean;
}) {
  const [value, setValue] = useState('');

  function submit(e: FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!q || disabled) return;
    onSend(q);
    setValue('');
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8 }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your question…"
        disabled={disabled}
        style={{
          flex: 1,
          padding: 12,
          borderRadius: 8,
          border: '1px solid #ddd',
        }}
      />
      <button
        type="submit"
        disabled={disabled}
        style={{
          padding: '12px 20px',
          borderRadius: 8,
          border: 'none',
          background: '#0b5cff',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        Send
      </button>
    </form>
  );
}
