
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MOCK_TRANSACTIONS, COLORS } from '../constants';
import { summarizeRevenueData } from '../services/geminiService';
import CountUp from './CountUp';

const data = [
  { name: 'Jan', revenue: 4000, inspections: 240 },
  { name: 'Feb', revenue: 3000, inspections: 198 },
  { name: 'Mar', revenue: 2000, inspections: 150 },
  { name: 'Apr', revenue: 2780, inspections: 210 },
  { name: 'May', revenue: 1890, inspections: 180 },
  { name: 'Jun', revenue: 2390, inspections: 250 },
  { name: 'Jul', revenue: 3490, inspections: 310 },
];

const Dashboard: React.FC = () => {
  const [aiSummary, setAiSummary] = useState<string>('Analyzing revenue trends...');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await summarizeRevenueData(MOCK_TRANSACTIONS);
        setAiSummary(summary || 'Analysis complete.');
      } catch (err) {
        setAiSummary('AI Analysis temporarily unavailable.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const stats = [
    { label: 'Total Revenue', value: 1.2, prefix: '₦', suffix: 'B', change: '+12.5%', color: 'text-emerald-600' },
    { label: 'Verified Certificates', value: 3842, change: '+8.1%', color: 'text-blue-600' },
    { label: 'Pending Inspections', value: 142, change: '-5.2%', color: 'text-amber-600' },
    { label: 'Market Compliance', value: 98.4, suffix: '%', decimals: 1, change: '+2.1%', color: 'text-indigo-600' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-emerald-200/50">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-black mb-2 text-white">Operational Overview</h2>
          <p className="text-emerald-100 leading-relaxed font-medium">
            Welcome to the Federal Produce Inspection Service central portal. Current peak season for <span className="underline decoration-amber-400 font-bold">Cocoa and Cashew</span> is active in Western and Northern zones. Ensure all digital receipts are synced before terminal close.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter">
                <CountUp 
                  end={stat.value} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix} 
                  decimals={stat.decimals}
                />
              </h3>
              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Analysis Section */}
      <div className="bg-white border border-slate-100 p-6 rounded-[32px] flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="bg-emerald-600 p-4 rounded-2xl text-white shadow-lg shadow-emerald-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5 12 12l3.5-3.5"/><path d="M12 12v6"/></svg>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="font-black text-slate-900 text-lg">AI Revenue Strategy Assistant</h4>
          <p className="text-slate-600 mt-1 leading-relaxed font-medium">
            {isLoading ? 'Processing latest inspection data...' : aiSummary}
          </p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm whitespace-nowrap hover:bg-slate-800 transition-all">Detailed Analysis</button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Revenue Trajectory</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px'}}
                />
                <Bar dataKey="revenue" fill={COLORS.primary} radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Inspection Volume</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="inspections" 
                  stroke={COLORS.primary} 
                  strokeWidth={4} 
                  dot={{r: 6, fill: COLORS.primary, strokeWidth: 3, stroke: '#fff'}} 
                  activeDot={{r: 8, strokeWidth: 0}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
