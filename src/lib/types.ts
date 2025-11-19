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

export type EmployeePayroll = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: 'Processed' | 'Pending';
  baseSalary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  details?: {
    earnings: {
      base: number;
      bonus: number;
      overtime: number;
    };
    deductions: {
      federal: number;
      state: number;
      socialSecurity: number;
      medicare: number;
      insurance: number;
    };
    paymentHistory: {
      date: string;
      period: string;
      amount: number;
    }[];
  };
};

export type Application = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  appliedDate: string;
  status: 'Pending' | 'Reviewed' | 'Interviewed' | 'Received';
  jobId: string;
};

export type Notification = {
  id: string;
  type: 'leave' | 'payroll' | 'performance' | 'onboarding' | 'exit' | 'training';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
};

export type CalendarEvent = {
    id: string;
    title: string;
    date: string;
    time: string;
    type: 'Team Event' | 'Performance Review' | 'Interview' | 'Holiday';
    attendees: string[];
    location: string;
}

export type Document = {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'txt' | 'zip' | 'xlsx';
  size: string;
  uploadDate: string;
  tag?: {
    label: string;
    color: string;
  };
};
