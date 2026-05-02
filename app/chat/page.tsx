'use client';

import { useChat } from '@ai-sdk/react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { ProductSelectionList, RefundConfirmationCard } from '@/components/refund-ui';
import Link from 'next/link';
import { useState } from 'react';

export default function ChatPage() {
  const { messages, sendMessage, status } = useChat({});
  
  const [input, setInput] = useState('');

  const isLoading = status === 'submitted' || status === 'streaming';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className="flex flex-col flex-1 h-screen w-full bg-white font-sans text-zinc-900 selection:bg-zinc-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-transparent sticky top-0 bg-white/80 backdrop-blur-md z-50 shrink-0">
        <Link href="/" className="flex items-center gap-2 font-medium hover:opacity-80 transition-opacity">
          <Bot size={24} strokeWidth={1.5} className="text-zinc-900" />
          <span className="font-semibold tracking-tight text-lg">RefundAI</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-zinc-500 bg-zinc-50 px-2.5 py-1.5 rounded-md border border-zinc-100">
            Session: #REF8421
          </span>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-8 pb-32">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-zinc-400 mt-20">
            <div className="w-16 h-16 bg-zinc-50 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-zinc-100">
              <Bot size={32} strokeWidth={1.5} className="text-zinc-900" />
            </div>
            <h2 className="text-xl font-medium tracking-tight text-zinc-900 mb-2">How can I help with your refund?</h2>
            <p className="text-sm text-zinc-500 max-w-sm text-center">
              Describe the item you want to return, and I'll process the refund straight to your wallet.
            </p>
          </div>
        )}
        
        {messages.map(m => (
          <div key={m.id} className="flex gap-5 max-w-3xl mx-auto w-full">
            <div className="shrink-0 mt-1">
              {m.role === 'user' ? (
                <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500">
                  <User size={16} />
                </div>
              ) : (
                <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center text-white shadow-sm">
                  <Bot size={16} />
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-2 min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-[15px] text-zinc-900">
                  {m.role === 'user' ? 'Customer' : 'RefundAI'}
                </span>
              </div>
              
              {m.parts?.map((part, index) => {
                if (part.type === 'text') {
                  if (!part.text) return null;
                  return (
                    <div 
                      key={index} 
                      className={`text-[15px] leading-relaxed ${
                        m.role === 'user' 
                          ? 'text-zinc-800 bg-zinc-50 border border-zinc-100 px-5 py-3.5 rounded-2xl rounded-tl-sm inline-block max-w-2xl' 
                          : 'text-zinc-800 pt-1 inline-block max-w-2xl'
                      }`}
                    >
                      {part.text}
                    </div>
                  );
                }
                
                if (part.type === 'tool-selectProductToRefund') {
                  if (part.state !== 'output-available') {
                    return <div key={part.toolCallId} className="animate-pulse h-32 bg-zinc-50 rounded-xl max-w-sm mt-3 border border-zinc-100" />;
                  }
                  
                  return (
                    <div key={part.toolCallId} className="mt-2">
                      <ProductSelectionList 
                        products={(part.output as any).products} 
                        onSelect={(id) => {
                          const product = (part.output as any).products.find((p: any) => p.id === id);
                          sendMessage({
                            text: `I've selected the ${product.name} for refund.`
                          });
                        }}
                      />
                    </div>
                  );
                }
                
                if (part.type === 'tool-processRefund') {
                  if (part.state !== 'output-available') {
                    return <div key={part.toolCallId} className="animate-pulse h-48 bg-zinc-50 rounded-xl max-w-sm mt-3 border border-zinc-100" />;
                  }
                  
                  return (
                    <div key={part.toolCallId} className="mt-2">
                      <RefundConfirmationCard 
                        amount={(part.output as any).amount}
                        method={(part.output as any).method}
                        items={(part.output as any).items}
                        date={(part.output as any).date}
                        txHash={(part.output as any).txHash}
                      />
                    </div>
                  );
                }
                
                return null;
              })}
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex gap-5 max-w-3xl mx-auto w-full">
            <div className="shrink-0 mt-1">
              <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center text-white shadow-sm">
                <Bot size={16} />
              </div>
            </div>
            <div className="flex flex-col gap-2 min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-[15px] text-zinc-900">RefundAI</span>
              </div>
              <div className="flex gap-1.5 items-center px-2 py-4 text-zinc-400 inline-flex max-w-[80px]">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Input Area */}
      <div className="p-4 bg-gradient-to-t from-white via-white to-transparent shrink-0 fixed bottom-0 w-full flex justify-center pb-8 pt-12 z-10 pointer-events-none">
        <form onSubmit={handleSubmit} className="w-full max-w-3xl relative flex items-center shadow-sm rounded-full bg-zinc-50 border border-zinc-200/80 focus-within:ring-4 focus-within:ring-zinc-100/50 focus-within:bg-white focus-within:border-zinc-300 transition-all pointer-events-auto">
          <input
            value={input || ''}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your refund request..."
            className="w-full bg-transparent pl-6 pr-14 py-4 text-[15px] focus:outline-none text-zinc-900 placeholder:text-zinc-500"
          />
          <button 
            type="submit" 
            disabled={!input?.trim() || isLoading}
            className="absolute right-2 p-2.5 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 disabled:opacity-50 transition-colors"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
