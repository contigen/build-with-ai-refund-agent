import { CheckCircle2, Check } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
}

export function ProductSelectionList({
  products,
  onSelect,
  selectedId,
}: {
  products: Product[];
  onSelect?: (id: string) => void;
  selectedId?: string;
}) {
  return (
    <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden text-sm mt-2">
      <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-2 font-mono text-xs text-zinc-500 uppercase tracking-wider flex justify-between">
        <span>Product Selection</span>
        <span>#{Math.floor(Math.random() * 10000)}</span>
      </div>
      <div className="divide-y divide-zinc-100">
        {products.map((product, idx) => {
          const isSelected = selectedId === product.id;
          return (
            <div key={product.id} className="p-3 flex items-center justify-between hover:bg-zinc-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-zinc-400 font-mono text-xs">{idx + 1}.</span>
                <div>
                  <div className="font-medium text-zinc-900">{product.name}</div>
                  <div className="text-zinc-500">${product.price.toFixed(2)}</div>
                </div>
              </div>
              {isSelected ? (
                <div className="text-emerald-600 flex items-center gap-1 font-medium text-xs bg-emerald-50 px-2 py-1 rounded-md">
                  <Check size={14} /> Selected
                </div>
              ) : (
                onSelect && (
                  <button
                    onClick={() => onSelect(product.id)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-xs bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors"
                  >
                    Select
                  </button>
                )
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function RefundConfirmationCard({
  amount,
  method,
  items,
  date,
  txHash,
}: {
  amount: number;
  method: string;
  items: string[];
  date: string;
  txHash?: string;
}) {
  return (
    <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden text-sm mt-2">
      <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-2 font-mono text-xs text-zinc-500 uppercase tracking-wider flex justify-between">
        <span>Refund Confirmation</span>
        <span>#REF8421</span>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100">
          <CheckCircle2 size={20} />
          <span className="font-semibold text-sm">Refund Processed</span>
        </div>
        
        <div className="space-y-2.5 text-sm pt-1">
          <div className="grid grid-cols-[80px_1fr] gap-2 items-start">
            <span className="text-zinc-500 font-medium">Amount:</span>
            <span className="font-semibold text-zinc-900">${amount.toFixed(2)} <span className="text-zinc-500 font-normal">(to {method})</span></span>
          </div>
          <div className="grid grid-cols-[80px_1fr] gap-2 items-start">
            <span className="text-zinc-500 font-medium">Items:</span>
            <span className="text-zinc-900">{items.join(", ")}</span>
          </div>
          <div className="grid grid-cols-[80px_1fr] gap-2 items-start">
            <span className="text-zinc-500 font-medium">Status:</span>
            <span className="text-emerald-600 font-medium">SUCCESSFUL</span>
          </div>
          <div className="grid grid-cols-[80px_1fr] gap-2 items-start">
            <span className="text-zinc-500 font-medium">Date:</span>
            <span className="text-zinc-900">{date}</span>
          </div>
          {txHash && (
            <div className="grid grid-cols-[80px_1fr] gap-2 items-start">
              <span className="text-zinc-500 font-medium">Explorer:</span>
              <a 
                href={`https://testnet.arcscan.app/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium truncate"
              >
                View Transaction ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
