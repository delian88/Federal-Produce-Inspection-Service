
import React from 'react';
import { MOCK_TRANSACTIONS } from '../constants';
import { UserRole } from '../types';

interface RevenuePortalProps {
  role: UserRole;
}

const RevenuePortal: React.FC<RevenuePortalProps> = ({ role }) => {
  const isReviewer = role === UserRole.REVIEWER;

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Revenue Ledger</h2>
          {isReviewer && <p className="text-[10px] md:text-sm text-slate-500">Reviewer Mode: View-Only</p>}
        </div>
        {!isReviewer && (
          <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        )}
      </div>

      <div className="bg-white rounded-[24px] md:rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] md:text-xs uppercase tracking-widest">
              <tr>
                <th className="px-4 md:px-6 py-4 md:py-5 font-bold">ID</th>
                <th className="px-4 md:px-6 py-4 md:py-5 font-bold">Exporter</th>
                <th className="px-4 md:px-6 py-4 md:py-5 font-bold">Produce</th>
                <th className="px-4 md:px-6 py-4 md:py-5 font-bold">Amount (₦)</th>
                <th className="px-4 md:px-6 py-4 md:py-5 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
              {MOCK_TRANSACTIONS.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 md:px-6 py-4 md:py-5 font-medium text-slate-900">{txn.id}</td>
                  <td className="px-4 md:px-6 py-4 md:py-5 text-slate-600 truncate max-w-[150px]">{txn.exporterName}</td>
                  <td className="px-4 md:px-6 py-4 md:py-5 text-slate-600">{txn.produceType}</td>
                  <td className="px-4 md:px-6 py-4 md:py-5 font-bold text-slate-900">{txn.amount.toLocaleString()}</td>
                  <td className="px-4 md:px-6 py-4 md:py-5">
                    <span className={`px-2 md:px-3 py-1 rounded-full text-[10px] font-bold ${
                      txn.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' :
                      txn.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-slate-900 text-white p-6 md:p-8 rounded-[24px] md:rounded-3xl hover:shadow-lg transition-all">
          <h4 className="text-slate-400 text-[10px] md:text-sm font-medium">ICT Revenue Share</h4>
          <p className="text-2xl md:text-4xl font-bold mt-2 md:mt-4">₦240M</p>
          <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-slate-800 text-[8px] md:text-xs text-slate-500 uppercase font-black">20% Spot Split</div>
        </div>
        <div className="bg-emerald-600 text-white p-6 md:p-8 rounded-[24px] md:rounded-3xl hover:shadow-lg transition-all">
          <h4 className="text-emerald-100 text-[10px] md:text-sm font-medium">Treasury Balance</h4>
          <p className="text-2xl md:text-4xl font-bold mt-2 md:mt-4">₦960M</p>
          <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-emerald-500 text-[8px] md:text-xs text-emerald-200 uppercase font-black">80% Settled</div>
        </div>
        <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-[24px] md:rounded-3xl shadow-sm hidden lg:block">
          <h4 className="text-slate-500 text-[10px] md:text-sm font-medium">Compliance Score</h4>
          <p className="text-2xl md:text-4xl font-bold mt-2 md:mt-4 text-slate-900">100%</p>
          <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-slate-100 text-[8px] md:text-xs text-emerald-600 font-black uppercase">Verified Logs</div>
        </div>
      </div>
    </div>
  );
};

export default RevenuePortal;
