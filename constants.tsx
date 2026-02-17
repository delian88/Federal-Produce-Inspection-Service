
import React from 'react';

export const COLORS = {
  primary: '#059669', // Emerald 600
  secondary: '#1e293b', // Slate 800
  accent: '#f59e0b', // Amber 500
};

export const MOCK_TRANSACTIONS = [
  { id: 'TXN-001', exporterName: 'Alhaji Agro Exports', amount: 250000, produceType: 'Cocoa', status: 'PAID', date: '2024-05-10' },
  { id: 'TXN-002', exporterName: 'Green Belt Farms', amount: 150000, produceType: 'Cashew', status: 'PENDING', date: '2024-05-12' },
  { id: 'TXN-003', exporterName: 'Northern Grains Ltd', amount: 450000, produceType: 'Sesame', status: 'PAID', date: '2024-05-13' },
  { id: 'TXN-004', exporterName: 'Lagos Produce Hub', amount: 120000, produceType: 'Ginger', status: 'FAILED', date: '2024-05-14' },
];

export const MOCK_INSPECTIONS = [
  { id: 'INS-101', produceType: 'Cocoa Beans', quantity: '20 Tons', location: 'Apapa Port', status: 'CERTIFIED', dateCreated: '2024-05-09' },
  { id: 'INS-102', produceType: 'Cashew Nuts', quantity: '50 Tons', location: 'Kano Warehouse', status: 'IN_PROGRESS', dateCreated: '2024-05-11' },
  { id: 'INS-103', produceType: 'Sesame Seeds', quantity: '100 Tons', location: 'Port Harcourt', status: 'SUBMITTED', dateCreated: '2024-05-14' },
];

export const ICONS = {
  Dashboard: (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
  ),
  Wallet: (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>
  ),
  FileCheck: (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
  ),
  Users: (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
};
