import Link from "next/link";
import { Search, Bot, Layers, Download, Check, Settings, Terminal, Box } from "lucide-react";

export default function OverviewPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-100">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-transparent sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-medium hover:opacity-80 transition-opacity">
            <Bot size={24} strokeWidth={1.5} className="text-zinc-900" />
            <span className="font-semibold tracking-tight text-lg">RefundAI</span>
          </Link>
        </div>

        <div className="hidden flex-1 max-w-md mx-8 md:flex relative group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search cases or customers..." 
            className="w-full bg-zinc-100/80 hover:bg-zinc-100 border border-transparent focus:border-zinc-200 focus:bg-white rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-zinc-100/50 transition-all placeholder:text-zinc-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <Link 
            href="/chat"
            className="bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors shadow-sm"
          >
            Launch Chat Demo
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center pb-24">
        {/* Hero Section */}
        <section className="w-full max-w-4xl mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center">
          <div className="w-20 h-20 mb-8 rounded-3xl bg-zinc-50 border border-zinc-200 flex items-center justify-center shadow-sm">
            <Layers size={40} strokeWidth={1.5} className="text-zinc-800" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 max-w-2xl mb-6 leading-[1.1]">
            Automated customer refunds with AI
          </h1>
          
          <div className="flex flex-col items-center gap-3 w-full max-w-xl">
            <p className="text-sm text-zinc-500 max-w-md">
              A demonstration of autonomous refund handling, receipt validation, and on-chain payouts via the Arc Testnet.
            </p>
          </div>
        </section>

        {/* Features List Section */}
        <section className="w-full max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-100">
            <h2 className="font-medium text-zinc-900">Key Platform Features</h2>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span className="bg-zinc-100 px-2 py-1 rounded-md text-xs font-medium text-zinc-700">Enterprise</span>
            </div>
          </div>

          <div className="flex flex-col gap-0 divide-y divide-zinc-100">
            {/* Feature 1 */}
            <div className="py-8 group">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-2xl font-medium tracking-tight text-zinc-900 group-hover:text-blue-600 transition-colors">
                      <Link href="/chat">Automated Returns & Exchanges</Link>
                    </h3>
                  </div>
                  
                  <p className="text-[15px] text-zinc-600 leading-relaxed max-w-3xl">
                    Deploy a conversational AI agent that handles your return pipeline end-to-end. Our system resolves customer requests instantly without human intervention.
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-xs font-mono font-medium">conversational-ai</span>
                    <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 text-xs font-mono font-medium">gemini-2.5-pro</span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-xs text-zinc-500 pt-2 font-medium">
                    <span className="flex items-center gap-1.5"><Download size={14} /> 2.1M Requests Handled</span>
                    <span className="flex items-center gap-1.5"><Terminal size={14} /> API Ready</span>
                  </div>
                </div>
                
                <Link href="/chat" className="hidden md:flex opacity-0 group-hover:opacity-100 shrink-0 bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-700 font-medium text-sm px-4 py-2 rounded-lg items-center gap-2 transition-all shadow-sm">
                  Test Chat Demo
                </Link>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="py-8 group">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-2xl font-medium tracking-tight text-zinc-900 group-hover:text-emerald-600 transition-colors">
                      Instant Crypto Payouts
                    </h3>
                  </div>
                  
                  <p className="text-[15px] text-zinc-600 leading-relaxed max-w-3xl">
                    Settle refunds globally in seconds using stablecoins. Provide full transparency to customers by issuing refunds directly on the Arc Testnet.
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-xs font-mono font-medium">arc-testnet</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-xs font-mono font-medium">usdc</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-xs font-mono font-medium">smart-contracts</span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-xs text-zinc-500 pt-2 font-medium">
                    <span className="flex items-center gap-1.5"><Check size={14} /> 99.9% Uptime</span>
                    <span className="flex items-center gap-1.5"><Settings size={14} /> Real-time Settlement</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="py-8 group">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-2xl font-medium tracking-tight text-zinc-900 group-hover:text-purple-600 transition-colors">
                      Policy & Receipt Validation
                    </h3>
                  </div>
                  
                  <p className="text-[15px] text-zinc-600 leading-relaxed max-w-3xl">
                    AI-driven receipt scanning and automated verification against your store's return policy to prevent fraud and ensure compliance.
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-600 text-xs font-mono font-medium">fraud-prevention</span>
                    <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-600 text-xs font-mono font-medium">vision-models</span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-xs text-zinc-500 pt-2 font-medium">
                    <span className="flex items-center gap-1.5"><Settings size={14} /> Custom Policies Supported</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto px-6 py-8 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400 font-medium">
        <div>© 2026 RefundAI Platform</div>
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-zinc-600 transition-colors">Blog</Link>
          <Link href="#" className="hover:text-zinc-600 transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
