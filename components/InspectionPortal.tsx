
import React, { useState } from 'react';
import { MOCK_INSPECTIONS } from '../constants';
import { getComplianceAdvice } from '../services/geminiService';

const InspectionPortal: React.FC = () => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [selectedProduce, setSelectedProduce] = useState('');

  const handleGetAdvice = async () => {
    if (!selectedProduce) return;
    setLoadingAdvice(true);
    try {
      const res = await getComplianceAdvice(selectedProduce);
      setAdvice(res || 'No specific advice found.');
    } catch (err) {
      setAdvice('Error fetching advice.');
    } finally {
      setLoadingAdvice(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inspection List */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-semibold text-slate-800">Recent Inspection Tasks</h3>
          <div className="space-y-4">
            {MOCK_INSPECTIONS.map((ins) => (
              <div key={ins.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold ${
                    ins.status === 'CERTIFIED' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {ins.produceType.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{ins.produceType}</h4>
                    <p className="text-sm text-slate-500">{ins.location} • {ins.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                    ins.status === 'CERTIFIED' ? 'bg-emerald-100 text-emerald-700' :
                    ins.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {ins.status}
                  </span>
                  <p className="text-xs text-slate-400">{ins.dateCreated}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Compliance Advisor */}
        <div className="bg-slate-900 text-white p-6 rounded-xl h-fit sticky top-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <h3 className="font-bold text-lg">Compliance Advisor</h3>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-400">Get instant quality standards and regulatory advice powered by Gemini AI.</p>
            <input 
              type="text" 
              placeholder="Enter Produce (e.g. Cocoa, Cashew)" 
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={selectedProduce}
              onChange={(e) => setSelectedProduce(e.target.value)}
            />
            <button 
              onClick={handleGetAdvice}
              disabled={loadingAdvice || !selectedProduce}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 text-white font-bold py-2 rounded-lg transition-all"
            >
              {loadingAdvice ? 'Processing...' : 'Ask AI Specialist'}
            </button>
            {advice && (
              <div className="mt-6 p-4 bg-slate-800 rounded-lg text-sm text-slate-300 leading-relaxed border-l-4 border-emerald-500 max-h-64 overflow-y-auto whitespace-pre-line">
                {advice}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionPortal;
