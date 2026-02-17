
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Revenue Ledger</h2>
          {isReviewer && <p className="text-sm text-slate-500">Reviewer Mode: View-Only Access Enabled</p>}
        </div>
        {!isReviewer && (
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export Report
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-widest">
            <tr>
              <th className="px-6 py-5 font-bold">Transaction ID</th>
              <th className="px-6 py-5 font-bold">Exporter</th>
              <th className="px-6 py-5 font-bold">Produce</th>
              <th className="px-6 py-5 font-bold">Amount (₦)</th>
              <th className="px-6 py-5 font-bold">Date</th>
              <th className="px-6 py-5 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_TRANSACTIONS.map((txn) => (
              <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5 font-medium text-slate-900">{txn.id}</td>
                <td className="px-6 py-5 text-slate-600">{txn.exporterName}</td>
                <td className="px-6 py-5 text-slate-600">{txn.produceType}</td>
                <td className="px-6 py-5 font-bold text-slate-900">{txn.amount.toLocaleString()}</td>
                <td className="px-6 py-5 text-slate-500">{txn.date}</td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 text-white p-8 rounded-3xl flex flex-col justify-between hover:shadow-2xl transition-all hover:-translate-y-1">
          <h4 className="text-slate-400 text-sm font-medium">Revenue Share (Five Stars ICT Ltd)</h4>
          <p className="text-4xl font-bold mt-4">₦240M</p>
          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500 uppercase tracking-widest font-bold">20% Spot Split</span>
            <span className="text-emerald-400 animate-pulse">Live</span>
          </div>
        </div>
        <div className="bg-emerald-600 text-white p-8 rounded-3xl flex flex-col justify-between hover:shadow-2xl transition-all hover:-translate-y-1">
          <h4 className="text-emerald-100 text-sm font-medium">Federal Treasury Balance</h4>
          <p className="text-4xl font-bold mt-4">₦960M</p>
          <div className="mt-6 pt-4 border-t border-emerald-500 flex justify-between items-center text-xs">
            <span className="text-emerald-200 uppercase tracking-widest font-bold">80% Share</span>
            <span className="bg-emerald-500 px-2 py-0.5 rounded">Settled</span>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
          <h4 className="text-slate-500 text-sm font-medium">Audit Compliance Score</h4>
          <p className="text-4xl font-bold mt-4 text-slate-900">100%</p>
          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
            <span className="text-slate-400 uppercase tracking-widest font-bold">Verified Logs</span>
            <span className="text-emerald-600 font-bold">Clean Audit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenuePortal;
