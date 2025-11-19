import type {
  Employee,
  Attendance,
  Payroll,
  OpenPosition,
  DailyAttendance,
  EmployeePayroll,
  Application,
} from '@/lib/types';

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
  {
    id: 'A01',
    employeeName: 'Alice Johnson',
    employeeId: 'E001',
    date: '2024-07-28',
    clockIn: '09:02',
    clockOut: '17:34',
    totalHours: 8.5,
  },
  {
    id: 'A02',
    employeeName: 'Bob Williams',
    employeeId: 'E002',
    date: '2024-07-28',
    clockIn: '09:30',
    clockOut: '18:05',
    totalHours: 8.6,
  },
  {
    id: 'A03',
    employeeName: 'Charlie Brown',
    employeeId: 'E003',
    date: '2024-07-28',
    clockIn: '08:55',
    clockOut: '17:30',
    totalHours: 8.6,
  },
  {
    id: 'A04',
    employeeName: 'Ethan Hunt',
    employeeId: 'E005',
    date: '2024-07-28',
    clockIn: '09:15',
    clockOut: '17:45',
    totalHours: 8.5,
  },
  {
    id: 'A05',
    employeeName: 'Alice Johnson',
    employeeId: 'E001',
    date: '2024-07-29',
    clockIn: '09:00',
    clockOut: null,
    totalHours: null,
  },
];

export const dailyAttendanceLog: DailyAttendance[] = [
  {
    id: 'DA01',
    name: 'Sarah Johnson',
    avatar: 'https://picsum.photos/seed/10/100/100',
    role: 'Marketing Manager',
    status: 'Present',
    clockIn: '09:15',
    clockOut: '18:30',
  },
  {
    id: 'DA02',
    name: 'Michael Chen',
    avatar: 'https://picsum.photos/seed/11/100/100',
    role: 'Software Developer',
    status: 'Late',
    clockIn: '09:45',
    clockOut: '18:15',
  },
  {
    id: 'DA03',
    name: 'Emily Rodriguez',
    avatar: 'https://picsum.photos/seed/12/100/100',
    role: 'HR Specialist',
    status: 'Absent',
    clockIn: null,
    clockOut: null,
    reason: 'Sick Leave',
  },
  {
    id: 'DA04',
    name: 'David Thompson',
    avatar: 'https://picsum.photos/seed/13/100/100',
    role: 'Finance Manager',
    status: 'Present',
    clockIn: '08:30',
    clockOut: '17:45',
  },
];

export const payrollData: Payroll[] = [
  {
    id: 'P01',
    employeeName: 'Alice Johnson',
    employeeId: 'E001',
    grossPay: 7916.67,
    deductions: 1820.83,
    netPay: 6095.84,
    payDate: '2024-07-31',
  },
  {
    id: 'P02',
    employeeName: 'Bob Williams',
    employeeId: 'E002',
    grossPay: 9166.67,
    deductions: 2200.0,
    netPay: 6966.67,
    payDate: '2024-07-31',
  },
  {
    id: 'P03',
    employeeName: 'Charlie Brown',
    employeeId: 'E003',
    grossPay: 7083.33,
    deductions: 1629.17,
    netPay: 5454.16,
    payDate: '2024-07-31',
  },
  {
    id: 'P04',
    employeeName: 'Diana Prince',
    employeeId: 'E004',
    grossPay: 6000.0,
    deductions: 1380.0,
    netPay: 4620.0,
    payDate: '2024-07-31',
  },
  {
    id: 'P05',
    employeeName: 'Ethan Hunt',
    employeeId: 'E005',
    grossPay: 7333.33,
    deductions: 1686.67,
    netPay: 5646.66,
    payDate: '2024-07-31',
  },
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

export const openPositions: OpenPosition[] = [
  {
    id: 'OP01',
    title: 'Senior Software Engineer',
    department: 'Engineering Department',
    postedDate: '2024-03-15',
    applications: 24,
    daysLeft: 5,
    status: 'Open',
  },
  {
    id: 'OP02',
    title: 'Marketing Manager',
    department: 'Marketing Department',
    postedDate: '2024-03-12',
    applications: 18,
    daysLeft: 8,
    status: 'Open',
  },
  {
    id: 'OP03',
    title: 'Sales Representative',
    department: 'Sales Department',
    postedDate: '2024-03-20',
    applications: 32,
    daysLeft: 2,
    status: 'Closing Soon',
  },
  {
    id: 'OP04',
    title: 'UX Designer',
    department: 'Design',
    postedDate: '2024-03-18',
    applications: 12,
    daysLeft: 10,
    status: 'Open',
  },
  {
    id: 'OP05',
    title: 'HR Business Partner',
    department: 'Human Resources',
    postedDate: '2024-02-28',
    applications: 45,
    daysLeft: 0,
    status: 'Closed',
  },
];

export const employeePayroll: EmployeePayroll[] = [
  {
    id: 'EP01',
    name: 'Sarah Johnson',
    avatar: 'https://picsum.photos/seed/ep1/100/100',
    role: 'Senior Software Engineer',
    status: 'Processed',
    baseSalary: 8500,
    bonus: 1200,
    deductions: 850,
    netSalary: 8850,
    details: {
      earnings: { base: 3500, bonus: 500, overtime: 250 },
      deductions: { federal: 837.5, state: 212.5, socialSecurity: 127.5, medicare: 61.63, insurance: 23.37 },
      paymentHistory: [
        { date: 'Nov 15, 2024', period: 'Pay Period: Nov 1-15', amount: 3187.50 },
        { date: 'Oct 31, 2024', period: 'Pay Period: Oct 16-31', amount: 3187.50 },
        { date: 'Oct 15, 2024', period: 'Pay Period: Oct 1-15', amount: 3187.50 },
      ]
    }
  },
  {
    id: 'EP02',
    name: 'Michael Chen',
    avatar: 'https://picsum.photos/seed/ep2/100/100',
    role: 'Marketing Manager',
    status: 'Pending',
    baseSalary: 7200,
    bonus: 800,
    deductions: 720,
    netSalary: 7280,
    details: {
        earnings: { base: 3200, bonus: 400, overtime: 150 },
        deductions: { federal: 700, state: 180.5, socialSecurity: 110.5, medicare: 50.63, insurance: 20.37 },
        paymentHistory: [
          { date: 'Nov 15, 2024', period: 'Pay Period: Nov 1-15', amount: 2800.50 },
          { date: 'Oct 31, 2024', period: 'Pay Period: Oct 16-31', amount: 2800.50 },
          { date: 'Oct 15, 2024', period: 'Pay Period: Oct 1-15', amount: 2800.50 },
        ]
      }
  },
  {
    id: 'EP03',
    name: 'Emily Rodriguez',
    avatar: 'https://picsum.photos/seed/ep3/100/100',
    role: 'Sales Director',
    status: 'Processed',
    baseSalary: 9500,
    bonus: 2100,
    deductions: 950,
    netSalary: 10650,
    details: {
        earnings: { base: 4000, bonus: 1000, overtime: 300 },
        deductions: { federal: 900, state: 250, socialSecurity: 150, medicare: 70, insurance: 30 },
        paymentHistory: [
          { date: 'Nov 15, 2024', period: 'Pay Period: Nov 1-15', amount: 4200.00 },
          { date: 'Oct 31, 2024', period: 'Pay Period: Oct 16-31', amount: 4200.00 },
          { date: 'Oct 15, 2024', period: 'Pay Period: Oct 1-15', amount: 4200.00 },
        ]
      }
  },
  {
    id: 'EP04',
    name: 'David Thompson',
    avatar: 'https://picsum.photos/seed/ep4/100/100',
    role: 'UI/UX Designer',
    status: 'Pending',
    baseSalary: 6800,
    bonus: 500,
    deductions: 680,
    netSalary: 6620,
    details: {
        earnings: { base: 3000, bonus: 200, overtime: 100 },
        deductions: { federal: 600, state: 150, socialSecurity: 100, medicare: 40, insurance: 20 },
        paymentHistory: [
          { date: 'Nov 15, 2024', period: 'Pay Period: Nov 1-15', amount: 2590.00 },
          { date: 'Oct 31, 2024', period: 'Pay Period: Oct 16-31', amount: 2590.00 },
          { date: 'Oct 15, 2024', period: 'Pay Period: Oct 1-15', amount: 2590.00 },
        ]
      }
  },
];

export const applications: Application[] = [
    { id: 'APP001', name: 'Sarah Johnson', avatar: 'https://picsum.photos/seed/app1/100/100', role: 'Senior Software Engineer', appliedDate: '2024-03-15', status: 'Received', jobId: 'OP01' },
    { id: 'APP002', name: 'Michael Chen', avatar: 'https://picsum.photos/seed/app2/100/100', role: 'Product Manager', appliedDate: '2024-03-12', status: 'Reviewed', jobId: 'OP01' },
    { id: 'APP003', name: 'Emily Rodriguez', avatar: 'https://picsum.photos/seed/app3/100/100', role: 'UX Designer', appliedDate: '2024-03-10', status: 'Interviewed', jobId: 'OP01' },
    { id: 'APP004', name: 'David Thompson', avatar: 'https://picsum.photos/seed/app4/100/100', role: 'Data Analyst', appliedDate: '2024-03-08', status: 'Pending', jobId: 'OP01' },
    { id: 'APP005', name: 'Jessica Park', avatar: 'https://picsum.photos/seed/app5/100/100', role: 'Marketing Specialist', appliedDate: '2024-03-05', status: 'Reviewed', jobId: 'OP01' },
    { id: 'APP006', name: 'Robert Wilson', avatar: 'https://picsum.photos/seed/app6/100/100', role: 'DevOps Engineer', appliedDate: '2024-03-03', status: 'Interviewed', jobId: 'OP01' },
];