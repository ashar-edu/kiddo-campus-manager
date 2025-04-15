
// Student Types
export interface Student {
  id: string;
  studentId: string;
  name: string;
  parentName: string;
  parentContact: string;
  address: string;
  admissionFee: {
    amount: number;
    isPaid: boolean;
    pendingAmount: number;
  };
  monthlyFees: {
    [key: string]: {
      isPaid: boolean;
      amount: number;
      paidOn?: string;
    };
  };
  otherFees: {
    textbook?: {
      amount: number;
      isPaid: boolean;
    };
    uniform?: {
      amount: number;
      isPaid: boolean;
    };
    arts?: {
      amount: number;
      isPaid: boolean;
    };
    sports?: {
      amount: number;
      isPaid: boolean;
    };
    snacks?: {
      amount: number;
      isPaid: boolean;
    };
  };
}

// Staff Types
export interface Staff {
  id: string;
  name: string;
  designation: string;
  address: string;
  contact: string;
  leaveDetails: {
    [key: string]: {
      leaves: number;
      deduction: number;
    };
  };
  salary: {
    [key: string]: {
      isPaid: boolean;
      amount: number;
      paidOn?: string;
    };
  };
  advance: {
    amount: number;
    date?: string;
  };
  incentives: {
    amount: number;
    date?: string;
  };
}

// Financial Types
export interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  relatedTo?: {
    type: 'student' | 'staff' | 'other';
    id?: string;
    name?: string;
  };
}

export interface BalanceSheet {
  month: string;
  year: string;
  income: number;
  expense: number;
  balance: number;
  transactions: Transaction[];
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff' | 'parent';
}
