
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MOCK_TRANSACTIONS, COLORS } from '../constants';
import { summarizeRevenueData } from '../services/geminiService';

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
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
    { label: 'Total Revenue', value: '₦1.2B', change: '+12.5%', color: 'text-emerald-600' },
    { label: 'Pending Inspections', value: '142', change: '-5.2%', color: 'text-amber-600' },
    { label: 'Active Certificates', value: '3,842', change: '+8.1%', color: 'text-blue-600' },
    { label: 'Revenue Leakage (Est.)', value: '0.2%', change: '-90%', color: 'text-rose-600' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-2">
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Analysis Section */}
      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl flex items-start gap-4">
        <div className="bg-emerald-600 p-2 rounded-lg text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5 12 12l3.5-3.5"/><path d="M12 12v6"/></svg>
        </div>
        <div>
          <h4 className="font-semibold text-emerald-900">AI Revenue Insight</h4>
          <p className="text-emerald-800 mt-1 leading-relaxed">
            {isLoading ? 'Processing latest inspection data...' : aiSummary}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="text-lg font-semibold mb-6">Revenue Growth (2024)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="revenue" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="text-lg font-semibold mb-6">Inspection Throughput</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke={COLORS.primary} strokeWidth={3} dot={{r: 4, fill: COLORS.primary}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
