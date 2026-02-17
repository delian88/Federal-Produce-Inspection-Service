
export enum UserRole {
  SUPERADMIN = 'SUPERADMIN',
  INSPECTOR = 'INSPECTOR',
  REVIEWER = 'REVIEWER',
  AGENT = 'AGENT'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED'
}

export enum InspectionStatus {
  SUBMITTED = 'SUBMITTED',
  IN_PROGRESS = 'IN_PROGRESS',
  CERTIFIED = 'CERTIFIED',
  REJECTED = 'REJECTED'
}

export interface RevenueTransaction {
  id: string;
  exporterName: string;
  amount: number;
  produceType: string;
  status: PaymentStatus;
  date: string;
}

export interface DailyReceipt {
  id: string;
  traderName: string;
  amount: number;
  taxType: string;
  timestamp: string;
  agentId: string;
}

export interface InspectionRecord {
  id: string;
  produceType: string;
  quantity: string;
  location: string;
  status: InspectionStatus;
  dateCreated: string;
}
