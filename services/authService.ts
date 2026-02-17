
import { postgres } from '../db/postgres';
import { UserRole } from '../types';

export interface UserSession {
  token: string;
  email: string;
  role: UserRole;
  name: string;
  expiresAt: number;
}

export const seedDemoUsers = async () => {
  const users = [
    { email: 'admin@fpis.gov.ng', name: 'Muhammad Qaim Aliyu Sambo', role: UserRole.SUPERADMIN, password: 'password' },
    { email: 'inspector@fpis.gov.ng', name: 'Inspector Jabir', role: UserRole.INSPECTOR, password: 'password' },
    { email: 'agent@fpis.gov.ng', name: 'Agent Musa', role: UserRole.AGENT, password: 'password' },
    { email: 'reviewer@fpis.gov.ng', name: 'Audit Reviewer', role: UserRole.REVIEWER, password: 'password' }
  ];

  for (const user of users) {
    await postgres.insert('users', user);
  }
  console.info('[Auth] Demo users seeded into Postgres simulation.');
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
