export interface Bot {
  _id: string;
  name: string;
  businessName: string;
  branding?: { logo?: string; color?: string };
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  botId: string;
  question: string;
  history?: Message[];
}

export interface ChatResponse {
  answer: string;
  sources: string[];
}
