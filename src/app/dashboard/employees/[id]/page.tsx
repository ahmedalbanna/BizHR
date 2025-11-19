'use client';

import { useParams, useRouter } from 'next/navigation';
import { employees } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Pencil,
  MessageSquare,
  User,
  Briefcase,
  Folder,
  FileText,
  IdCard,
  Receipt,
  Award,
  Download,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between py-2">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-right">{value}</span>
  </div>
);

const DocumentRow = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <Card className="bg-card/50">
        <CardContent className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-md">
                    {icon}
                </div>
                <span className="font-medium">{label}</span>
            </div>
            <Button variant="ghost" size="icon">
                <Download className="h-5 w-5" />
            </Button>
        </CardContent>
    </Card>
)

export default function EmployeeProfilePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const employee = employees.find((e) => e.id === id);

  if (!employee) {
    return (
      <div className="flex h-screen items-center justify-center">
        Employee not found
      </div>
    );
  }

  const {
    name,
    role,
    status,
    avatar,
    department,
    hireDate,
    salary,
    email,
  } = employee;

  const personalInfo = [
    { label: 'Full Name', value: name },
    { label: 'Date of Birth', value: 'October 04, 1997' },
    { label: 'Email', value: email },
    { label: 'Phone', value: '+96772909766' },
    { label: 'Address', value: '1234 Oak Street, Apt 5B, San Francisco, CA 94102' },
  ];

  const professionalInfo = [
    { label: 'Job Title', value: role },
    { label: 'Department', value: department },
    { label: 'Employee ID', value: `EMP-${hireDate.split('-')[0]}-${id.replace('E','')}` },
    { label: 'Date of Hire', value: new Date(hireDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
    { label: 'Reporting Manager', value: 'Michael Chen' },
    { label: 'Salary', value: `$${salary.toLocaleString()} / year` },
  ];
  
  const documents = [
      { icon: <FileText className="h-5 w-5 text-primary" />, label: 'Employment Contract'},
      { icon: <IdCard className="h-5 w-5 text-primary" />, label: 'ID Verification'},
      { icon: <Receipt className="h-5 w-5 text-primary" />, label: 'Latest Payslip'},
      { icon: <Award className="h-5 w-5 text-primary" />, label: 'Certifications'},
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-primary p-4 text-primary-foreground">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-xl font-semibold">Employee Profile</h1>
        <Button variant="ghost" size="icon">
          <Pencil />
        </Button>
      </header>

      <main className="p-4 space-y-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-32 w-32 border-4 border-background -mt-20 shadow-lg">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-2xl font-bold">{name}</h2>
          <p className="text-primary">{role}</p>
          <Badge className="mt-2" variant={status === 'Active' ? 'default' : 'secondary'}>
            {status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button>
            <Pencil className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" /> Contact
          </Button>
        </div>

        <div className="space-y-4">
            <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <User className="h-5 w-5 text-primary" />
                    Personal Information
                </h3>
                <Card>
                    <CardContent className="p-4 text-sm">
                    {personalInfo.map(info => <InfoRow key={info.label} {...info} />)}
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Professional Information
                </h3>
                 <Card>
                    <CardContent className="p-4 text-sm">
                    {professionalInfo.map(info => <InfoRow key={info.label} {...info} />)}
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <Folder className="h-5 w-5 text-primary" />
                    Documents
                </h3>
                <div className="grid gap-3">
                    {documents.map(doc => <DocumentRow key={doc.label} {...doc} />)}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
