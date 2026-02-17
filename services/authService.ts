
import { postgres } from '../db/postgres';
import { UserRole, PaymentStatus, InspectionStatus } from '../types';

export interface UserSession {
  token: string;
  email: string;
  role: UserRole;
  name: string;
  expiresAt: number;
}

export const seedDemoUsers = async () => {
  // Check if seeding has already occurred by checking for a superadmin
  const existing = await postgres.findOne('users', 'admin@fpis.gov.ng');
  if (existing) {
    console.info('[Auth] Database already seeded. Skipping.');
    return;
  }

  // 1. Seed Users
  const users = [
    { email: 'admin@fpis.gov.ng', name: 'Mr. Muhammad Qaim Aliyu Sambo', role: UserRole.SUPERADMIN, password: 'password' },
    { email: 'inspector@fpis.gov.ng', name: 'Inspector Jabir Abubakar', role: UserRole.INSPECTOR, password: 'password' },
    { email: 'agent@fpis.gov.ng', name: 'Agent Musa Bello', role: UserRole.AGENT, password: 'password' },
    { email: 'reviewer@fpis.gov.ng', name: 'Audit Reviewer Ibrahim', role: UserRole.REVIEWER, password: 'password' }
  ];

  for (const user of users) {
    await postgres.insert('users', user);
  }

  // 2. Seed Initial Transactions
  const transactions = [
    { id: 'TXN-001', exporterName: 'Alhaji Agro Exports', amount: 250000, produceType: 'Cocoa', status: PaymentStatus.PAID, date: '2024-05-10' },
    { id: 'TXN-002', exporterName: 'Green Belt Farms', amount: 150000, produceType: 'Cashew', status: PaymentStatus.PENDING, date: '2024-05-12' },
    { id: 'TXN-003', exporterName: 'Northern Grains Ltd', amount: 450000, produceType: 'Sesame', status: PaymentStatus.PAID, date: '2024-05-13' },
    { id: 'TXN-004', exporterName: 'Lagos Produce Hub', amount: 120000, produceType: 'Ginger', status: PaymentStatus.FAILED, date: '2024-05-14' },
    { id: 'TXN-005', exporterName: 'Sokoto Onions Co', amount: 85000, produceType: 'Onions', status: PaymentStatus.PAID, date: '2024-05-15' },
  ];

  for (const txn of transactions) {
    await postgres.insert('transactions', txn);
  }

  // 3. Seed Initial Inspections
  const inspections = [
    { id: 'INS-101', produceType: 'Cocoa Beans', quantity: '20 Tons', location: 'Apapa Port', status: InspectionStatus.CERTIFIED, dateCreated: '2024-05-09' },
    { id: 'INS-102', produceType: 'Cashew Nuts', quantity: '50 Tons', location: 'Kano Warehouse', status: InspectionStatus.IN_PROGRESS, dateCreated: '2024-05-11' },
    { id: 'INS-103', produceType: 'Sesame Seeds', quantity: '100 Tons', location: 'Port Harcourt', status: InspectionStatus.SUBMITTED, dateCreated: '2024-05-14' },
    { id: 'INS-104', produceType: 'Groundnuts', quantity: '15 Tons', location: 'Kaduna Terminal', status: InspectionStatus.REJECTED, dateCreated: '2024-05-15' },
  ];

  for (const ins of inspections) {
    await postgres.insert('inspections', ins);
  }

  console.info('[Auth] Production data seeded into PostgreSQL simulation successfully.');
};

export const login = async (email: string): Promise<UserSession | null> => {
  const user = await postgres.findOne('users', email);
  if (!user) return null;

  const session: UserSession = {
    token: `sess_${Math.random().toString(36).substr(2)}`,
    email: user.email,
    role: user.role,
    name: user.name,
    expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24h
  };

  await postgres.insert('sessions', session);
  localStorage.setItem('fpis_auth_token', session.token);
  return session;
};

export const getSession = async (): Promise<UserSession | null> => {
  const token = localStorage.getItem('fpis_auth_token');
  if (!token) return null;

  const session = await postgres.findOne('sessions', token);
  if (!session || session.expiresAt < Date.now()) {
    if (session) await postgres.delete('sessions', token);
    localStorage.removeItem('fpis_auth_token');
    return null;
  }
  return session;
};

export const logout = async () => {
  const token = localStorage.getItem('fpis_auth_token');
  if (token) await postgres.delete('sessions', token);
  localStorage.removeItem('fpis_auth_token');
};
