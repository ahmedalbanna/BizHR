export type Employee = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  hireDate: string;
  salary: number;
};

export type Attendance = {
  id: string;
  employeeName: string;
  employeeId: string;
  date: string;
  clockIn: string;
  clockOut: string | null;
  totalHours: number | null;
};

export type Payroll = {
  id: string;
  employeeName: string;
  employeeId: string;
  grossPay: number;
  deductions: number;
  netPay: number;
  payDate: string;
};

export type OpenPosition = {
  id: string;
  title: string;
  department: string;
  postedDate: string;
  applications: number;
  daysLeft: number;
  status: 'Open' | 'Closing Soon' | 'Closed';
};

export type DailyAttendance = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: 'Present' | 'Late' | 'Absent';
  clockIn: string | null;
  clockOut: string | null;
  reason?: string;
};
