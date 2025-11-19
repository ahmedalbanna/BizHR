import type { Employee, Attendance, Payroll } from '@/lib/types';

export const employees: Employee[] = [
  {
    id: 'E001',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    avatar: 'https://picsum.photos/seed/1/100/100',
    role: 'Software Engineer',
    department: 'Technology',
    status: 'Active',
    hireDate: '2022-08-15',
    salary: 95000,
  },
  {
    id: 'E002',
    name: 'Bob Williams',
    email: 'bob.w@example.com',
    avatar: 'https://picsum.photos/seed/2/100/100',
    role: 'Product Manager',
    department: 'Product',
    status: 'Active',
    hireDate: '2021-05-20',
    salary: 110000,
  },
  {
    id: 'E003',
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    avatar: 'https://picsum.photos/seed/3/100/100',
    role: 'UX Designer',
    department: 'Design',
    status: 'Active',
    hireDate: '2023-01-10',
    salary: 85000,
  },
  {
    id: 'E004',
    name: 'Diana Prince',
    email: 'diana.p@example.com',
    avatar: 'https://picsum.photos/seed/4/100/100',
    role: 'HR Specialist',
    department: 'Human Resources',
    status: 'On Leave',
    hireDate: '2020-11-01',
    salary: 72000,
  },
  {
    id: 'E005',
    name: 'Ethan Hunt',
    email: 'ethan.h@example.com',
    avatar: 'https://picsum.photos/seed/5/100/100',
    role: 'Marketing Lead',
    department: 'Marketing',
    status: 'Active',
    hireDate: '2022-02-28',
    salary: 88000,
  },
  {
    id: 'E006',
    name: 'Fiona Glenanne',
    email: 'fiona.g@example.com',
    avatar: 'https://picsum.photos/seed/6/100/100',
    role: 'QA Tester',
    department: 'Technology',
    status: 'Terminated',
    hireDate: '2021-09-01',
    salary: 68000,
  },
];

export const attendanceRecords: Attendance[] = [
  { id: 'A01', employeeName: 'Alice Johnson', employeeId: 'E001', date: '2024-07-28', clockIn: '09:02', clockOut: '17:34', totalHours: 8.5 },
  { id: 'A02', employeeName: 'Bob Williams', employeeId: 'E002', date: '2024-07-28', clockIn: '09:30', clockOut: '18:05', totalHours: 8.6 },
  { id: 'A03', employeeName: 'Charlie Brown', employeeId: 'E003', date: '2024-07-28', clockIn: '08:55', clockOut: '17:30', totalHours: 8.6 },
  { id: 'A04', employeeName: 'Ethan Hunt', employeeId: 'E005', date: '2024-07-28', clockIn: '09:15', clockOut: '17:45', totalHours: 8.5 },
   { id: 'A05', employeeName: 'Alice Johnson', employeeId: 'E001', date: '2024-07-29', clockIn: '09:00', clockOut: null, totalHours: null },
];

export const payrollData: Payroll[] = [
    { id: 'P01', employeeName: 'Alice Johnson', employeeId: 'E001', grossPay: 7916.67, deductions: 1820.83, netPay: 6095.84, payDate: '2024-07-31' },
    { id: 'P02', employeeName: 'Bob Williams', employeeId: 'E002', grossPay: 9166.67, deductions: 2200.00, netPay: 6966.67, payDate: '2024-07-31' },
    { id: 'P03', employeeName: 'Charlie Brown', employeeId: 'E003', grossPay: 7083.33, deductions: 1629.17, netPay: 5454.16, payDate: '2024-07-31' },
    { id: 'P04', employeeName: 'Diana Prince', employeeId: 'E004', grossPay: 6000.00, deductions: 1380.00, netPay: 4620.00, payDate: '2024-07-31' },
    { id: 'P05', employeeName: 'Ethan Hunt', employeeId: 'E005', grossPay: 7333.33, deductions: 1686.67, netPay: 5646.66, payDate: '2024-07-31' },
];

export const turnoverData = [
  { month: 'Jan', rate: 2.1 },
  { month: 'Feb', rate: 2.5 },
  { month: 'Mar', rate: 1.8 },
  { month: 'Apr', rate: 3.0 },
  { month: 'May', rate: 2.2 },
  { month: 'Jun', rate: 3.5 },
];

export const hiringTrendsData = [
  { month: 'Jan', hired: 5, departed: 2 },
  { month: 'Feb', hired: 7, departed: 3 },
  { month: 'Mar', hired: 4, departed: 1 },
  { month: 'Apr', hired: 8, departed: 4 },
  { month: 'May', hired: 6, departed: 2 },
  { month: 'Jun', hired: 9, departed: 3 },
];

export const departmentHeadcountData = [
    { name: 'Technology', value: 20, fill: 'var(--color-chart-1)' },
    { name: 'Product', value: 8, fill: 'var(--color-chart-2)' },
    { name: 'Design', value: 12, fill: 'var(--color-chart-3)' },
    { name: 'Human Resources', value: 5, fill: 'var(--color-chart-4)' },
    { name: 'Marketing', value: 15, fill: 'var(--color-chart-5)' },
];
