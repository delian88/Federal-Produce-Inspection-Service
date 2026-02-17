
import React, { useState } from 'react';

const AgentPortal: React.FC = () => {
  const [walletBalance, setWalletBalance] = useState(45000);
  const [isFunding, setIsFunding] = useState(false);
  const [isCollecting, setIsCollecting] = useState(false);
  const [fundAmount, setFundAmount] = useState('');
  
  // Tax collection state
  const [traderName, setTraderName] = useState('');
  const [taxAmount, setTaxAmount] = useState('');
  const [taxType, setTaxType] = useState('Market Levy');
  
  const [receipts, setReceipts] = useState([
    { id: 'RCP-881', trader: 'Musa Bello', amount: 1200, type: 'Daily Levy', date: '2024-05-15 09:30 AM' },
    { id: 'RCP-882', trader: 'Grace Okon', amount: 2500, type: 'Inspection Fee', date: '2024-05-15 10:15 AM' },
    { id: 'RCP-883', trader: 'Abubakar Ibrahim', amount: 800, type: 'Daily Levy', date: '2024-05-15 11:00 AM' },
  ]);

  const handleFundWallet = () => {
    if (!fundAmount) return;
    setWalletBalance(prev => prev + Number(fundAmount));
    setFundAmount('');
    setIsFunding(false);
  };

  const handleCollectTax = () => {
    if (!traderName || !taxAmount) return;
    const newReceipt = {
      id: `RCP-${Math.floor(Math.random() * 1000)}`,
      trader: traderName,
      amount: Number(taxAmount),
      type: taxType,
      date: new Date().toLocaleString()
    };
    setReceipts([newReceipt, ...receipts]);
    setTraderName('');
    setTaxAmount('');
    setIsCollecting(false);
    // Auto-update wallet or deduct if applicable? For this model, agent facilitates.
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      {/* Wallet Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <p className="text-slate-400 font-medium mb-1">Agent Wallet Balance</p>
              <h2 className="text-5xl font-bold tracking-tight">₦{walletBalance.toLocaleString()}</h2>
            </div>
            <div className="mt-8 flex gap-4">
              <button 
                onClick={() => setIsFunding(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/40"
              >
                Fund Wallet
              </button>
              <button 
                onClick={() => setIsCollecting(true)}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-all backdrop-blur-sm"
              >
                Collect New Tax
              </button>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h4 className="font-bold text-slate-900">Today's Collections</h4>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">₦{receipts.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</p>
          <p className="text-slate-500 text-sm mt-1">{receipts.length} Active Receipts</p>
        </div>
      </div>

      {/* Main Actions Modals (Simplified as In-Page Forms) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">Recent Daily Receipts</h3>
            <button className="text-emerald-600 font-semibold hover:underline text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {receipts.map((rcp) => (
              <div key={rcp.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center border border-slate-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{rcp.trader}</h4>
                    <p className="text-sm text-slate-500">{rcp.type} • {rcp.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600 text-lg">₦{rcp.amount.toLocaleString()}</p>
                  <button className="text-xs text-slate-400 hover:text-emerald-600 mt-1 flex items-center gap-1 justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Fund Wallet UI */}
          {isFunding && (
            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 animate-in fade-in slide-in-from-top-2 duration-300">
              <h4 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 12h20"/><path d="m5 7 3 5-3 5"/><path d="m19 7-3 5 3 5"/></svg>
                Fund Your Wallet
              </h4>
              <input 
                type="number" 
                placeholder="Enter Amount (₦)" 
                className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-emerald-500 outline-none"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
              />
              <div className="flex gap-2">
                <button onClick={handleFundWallet} className="flex-1 bg-emerald-600 text-white py-2 rounded-xl font-bold">Pay via Remita</button>
                <button onClick={() => setIsFunding(false)} className="px-4 text-emerald-600 font-semibold">Cancel</button>
              </div>
            </div>
          )}

          {/* Tax Collection Form */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
            <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.7"/><path d="M16 5h6"/><path d="M19 2v6"/><path d="M22 22 2 2"/></svg>
              Quick Collection
            </h4>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Trader Name</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  value={traderName}
                  onChange={(e) => setTraderName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Amount (₦)</label>
                <input 
                  type="number" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  value={taxAmount}
                  onChange={(e) => setTaxAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Tax Type</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white outline-none transition-all"
                  value={taxType}
                  onChange={(e) => setTaxType(e.target.value)}
                >
                  <option>Daily Market Levy</option>
                  <option>Inspection Fee</option>
                  <option>Produce Grading</option>
                  <option>Wholesale Permit</option>
                </select>
              </div>
              <button 
                onClick={handleCollectTax}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl active:scale-95"
              >
                Issue Digital Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPortal;
