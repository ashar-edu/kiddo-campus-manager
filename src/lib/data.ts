
import { Student, Staff, Transaction, User } from '@/types';

// Sample data for testing UI
export const sampleStudents: Student[] = [
  {
    id: '1',
    studentId: 'KCM001',
    name: 'Alex Johnson',
    parentName: 'Michael Johnson',
    parentContact: '+1234567890',
    address: '123 Main St, Springfield',
    admissionFee: {
      amount: 5000,
      isPaid: true,
      pendingAmount: 0
    },
    monthlyFees: {
      'June 2024': { isPaid: true, amount: 1200, paidOn: '2024-06-05' },
      'July 2024': { isPaid: true, amount: 1200, paidOn: '2024-07-03' },
      'August 2024': { isPaid: false, amount: 1200 },
      'September 2024': { isPaid: false, amount: 1200 }
    },
    otherFees: {
      textbook: { amount: 800, isPaid: true },
      uniform: { amount: 1200, isPaid: true },
      arts: { amount: 500, isPaid: false },
      sports: { amount: 500, isPaid: true },
      snacks: { amount: 800, isPaid: false }
    }
  },
  {
    id: '2',
    studentId: 'KCM002',
    name: 'Sophia Williams',
    parentName: 'Emma Williams',
    parentContact: '+1987654321',
    address: '456 Elm St, Riverside',
    admissionFee: {
      amount: 5000,
      isPaid: true,
      pendingAmount: 0
    },
    monthlyFees: {
      'June 2024': { isPaid: true, amount: 1200, paidOn: '2024-06-10' },
      'July 2024': { isPaid: true, amount: 1200, paidOn: '2024-07-08' },
      'August 2024': { isPaid: true, amount: 1200, paidOn: '2024-08-05' },
      'September 2024': { isPaid: false, amount: 1200 }
    },
    otherFees: {
      textbook: { amount: 800, isPaid: true },
      uniform: { amount: 1200, isPaid: true },
      arts: { amount: 500, isPaid: true },
      sports: { amount: 500, isPaid: true },
      snacks: { amount: 800, isPaid: true }
    }
  },
  {
    id: '3',
    studentId: 'KCM003',
    name: 'Noah Davis',
    parentName: 'William Davis',
    parentContact: '+1122334455',
    address: '789 Oak St, Meadowville',
    admissionFee: {
      amount: 5000,
      isPaid: false,
      pendingAmount: 2000
    },
    monthlyFees: {
      'June 2024': { isPaid: true, amount: 1200, paidOn: '2024-06-15' },
      'July 2024': { isPaid: false, amount: 1200 },
      'August 2024': { isPaid: false, amount: 1200 },
      'September 2024': { isPaid: false, amount: 1200 }
    },
    otherFees: {
      textbook: { amount: 800, isPaid: false },
      uniform: { amount: 1200, isPaid: false },
      arts: { amount: 500, isPaid: false },
      sports: { amount: 500, isPaid: false },
      snacks: { amount: 800, isPaid: false }
    }
  }
];

export const sampleStaff: Staff[] = [
  {
    id: '1',
    name: 'Jennifer Smith',
    designation: 'Head Teacher',
    address: '234 Pine St, Springfield',
    contact: '+1555666777',
    leaveDetails: {
      'June 2024': { leaves: 1, deduction: 0 },
      'July 2024': { leaves: 0, deduction: 0 },
      'August 2024': { leaves: 2, deduction: 1000 }
    },
    salary: {
      'June 2024': { isPaid: true, amount: 25000, paidOn: '2024-06-30' },
      'July 2024': { isPaid: true, amount: 25000, paidOn: '2024-07-30' },
      'August 2024': { isPaid: false, amount: 24000 }
    },
    advance: {
      amount: 5000,
      date: '2024-07-15'
    },
    incentives: {
      amount: 2000,
      date: '2024-06-30'
    }
  },
  {
    id: '2',
    name: 'Robert Brown',
    designation: 'Assistant Teacher',
    address: '567 Maple St, Riverside',
    contact: '+1444555666',
    leaveDetails: {
      'June 2024': { leaves: 0, deduction: 0 },
      'July 2024': { leaves: 1, deduction: 600 },
      'August 2024': { leaves: 0, deduction: 0 }
    },
    salary: {
      'June 2024': { isPaid: true, amount: 18000, paidOn: '2024-06-30' },
      'July 2024': { isPaid: true, amount: 17400, paidOn: '2024-07-30' },
      'August 2024': { isPaid: false, amount: 18000 }
    },
    advance: {
      amount: 0,
      date: ''
    },
    incentives: {
      amount: 1000,
      date: '2024-07-30'
    }
  }
];

export const sampleTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-06-05',
    type: 'income',
    category: 'Monthly Fee',
    amount: 1200,
    description: 'Monthly fee payment for June 2024',
    relatedTo: {
      type: 'student',
      id: '1',
      name: 'Alex Johnson'
    }
  },
  {
    id: '2',
    date: '2024-06-10',
    type: 'income',
    category: 'Monthly Fee',
    amount: 1200,
    description: 'Monthly fee payment for June 2024',
    relatedTo: {
      type: 'student',
      id: '2',
      name: 'Sophia Williams'
    }
  },
  {
    id: '3',
    date: '2024-06-15',
    type: 'income',
    category: 'Monthly Fee',
    amount: 1200,
    description: 'Monthly fee payment for June 2024',
    relatedTo: {
      type: 'student',
      id: '3',
      name: 'Noah Davis'
    }
  },
  {
    id: '4',
    date: '2024-06-30',
    type: 'expense',
    category: 'Salary',
    amount: 25000,
    description: 'Salary payment for June 2024',
    relatedTo: {
      type: 'staff',
      id: '1',
      name: 'Jennifer Smith'
    }
  },
  {
    id: '5',
    date: '2024-06-30',
    type: 'expense',
    category: 'Salary',
    amount: 18000,
    description: 'Salary payment for June 2024',
    relatedTo: {
      type: 'staff',
      id: '2',
      name: 'Robert Brown'
    }
  },
  {
    id: '6',
    date: '2024-06-20',
    type: 'expense',
    category: 'Utilities',
    amount: 5000,
    description: 'Electricity bill for June 2024',
    relatedTo: {
      type: 'other'
    }
  }
];

export const sampleUsers: User[] = [
  {
    id: '1',
    email: 'admin@kiddocampus.com',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'teacher@kiddocampus.com',
    name: 'Jennifer Smith',
    role: 'staff'
  },
  {
    id: '3',
    email: 'parent@kiddocampus.com',
    name: 'Michael Johnson',
    role: 'parent'
  }
];
