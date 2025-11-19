'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { employees } from '@/lib/data';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  ArrowLeft,
  CalendarIcon,
  User,
  Mail,
  Briefcase,
  Building,
  DollarSign,
  Phone,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const employeeFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  position: z.string().min(1, 'Position is required'),
  department: z.string().min(1, 'Department is required'),
  annualSalary: z.string().refine(val => !isNaN(parseFloat(val.replace(/[^0-9.-]+/g,""))), {
    message: "Salary must be a number",
  }),
  hireDate: z.date(),
});

type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

const FormInputRow = ({ icon: Icon, name, label, control, placeholder, children }: any) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          {label} *
        </FormLabel>
        <FormControl>
          {children ? children(field) : <Input placeholder={placeholder} {...field} />}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const employee = employees.find((e) => e.id === id);

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      fullName: employee?.name || '',
      email: employee?.email || '',
      position: employee?.role || '',
      department: employee?.department || '',
      annualSalary: employee?.salary.toString() || '',
      hireDate: employee ? new Date(employee.hireDate) : new Date(),
    },
  });

  const onSubmit = (data: EmployeeFormValues) => {
    console.log(data);
    router.push(`/dashboard/employees/${id}`);
  };

  const departments = [...new Set(employees.map((e) => e.department))];
  const roles = [...new Set(employees.map((e) => e.role))];


  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-card p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
          <h1 className="text-xl font-semibold">Edit Employee</h1>
        </div>
        <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
      </header>

      <main className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormInputRow icon={User} label="Full Name" name="fullName" control={form.control} placeholder="John Smith" />
                <FormInputRow icon={Mail} label="Email Address" name="email" control={form.control} placeholder="john.smith@company.com" />
                <div className="grid grid-cols-2 gap-4">
                    <FormInputRow icon={Briefcase} label="Position" name="position" control={form.control}>
                        {(field: any) => (
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select position" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {roles.map((role) => (
                                    <SelectItem key={role} value={role}>{role}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        )}
                    </FormInputRow>
                    <FormInputRow icon={Building} label="Department" name="department" control={form.control}>
                         {(field: any) => (
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {departments.map((dept) => (
                                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        )}
                    </FormInputRow>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <FormInputRow icon={DollarSign} label="Annual Salary" name="annualSalary" control={form.control} placeholder="$85,000" />
                     <FormInputRow icon={CalendarIcon} label="Hire Date" name="hireDate" control={form.control}>
                        {(field: any) => (
                             <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={'outline'}
                                    className={cn(
                                        'w-full justify-start text-left font-normal',
                                        !field.value && 'text-muted-foreground'
                                    )}
                                    >
                                    {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                        )}
                    </FormInputRow>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        Contact Information
                    </label>
                    <Card className="bg-card/50 border-dashed">
                        <CardContent className="p-3 text-sm text-muted-foreground">
                            <p>Phone: {employee?.phone || '(555) 123-4567'}</p>
                            <p>Address: {employee?.address || '123 Main St, City, State 12345'}</p>
                            <p>Emergency Contact: Jane Smith (555) 987-6543</p>
                        </CardContent>
                    </Card>
                </div>
              </CardContent>
            </Card>
            
            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Validation Status</AlertTitle>
                <AlertDescription className="text-xs">
                    <ul className="list-disc list-inside">
                        <li>All required fields (*) must be completed</li>
                        <li>Email address must be in valid format</li>
                        <li>Salary must be a positive number</li>
                        <li>Changes will be saved to employee record</li>
                    </ul>
                </AlertDescription>
            </Alert>

            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}

// Add these to lib/types.ts if they don't exist
declare module '@/lib/data' {
    interface Employee {
        phone?: string;
        address?: string;
    }
}
