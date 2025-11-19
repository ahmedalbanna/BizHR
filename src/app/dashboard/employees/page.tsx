'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/dashboard-header';
import { employees } from '@/lib/data';
import type { Employee } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

function getStatusBadgeVariant(status: Employee['status']) {
  switch (status) {
    case 'Active':
      return 'default';
    case 'On Leave':
      return 'secondary';
    case 'Terminated':
      return 'destructive';
  }
}

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');

  const filteredAndSortedEmployees = employees
    .filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept =
        department === 'all' || employee.department === department;
      return matchesSearch && matchesDept;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'salary-asc':
          return a.salary - b.salary;
        case 'salary-desc':
          return b.salary - a.salary;
        default:
          return 0;
      }
    });

  const departments = [...new Set(employees.map((e) => e.department))];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <DashboardHeader title="Employee Management" className="md:hidden" />
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="salary-desc">Salary (High-Low)</SelectItem>
                <SelectItem value="salary-asc">Salary (Low-High)</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          {filteredAndSortedEmployees.length} employees found
        </div>

        <div className="grid gap-4">
          {filteredAndSortedEmployees.map((employee) => (
            <Card
              key={employee.id}
              className="hover:bg-card/90 transition-colors"
            >
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="h-14 w-14 border">
                  <AvatarImage
                    src={employee.avatar}
                    alt={employee.name}
                    data-ai-hint="person"
                  />
                  <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                  <span
                    className={cn(
                      'absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full border-2 border-background',
                      employee.status === 'Active'
                        ? 'bg-green-500'
                        : 'bg-muted-foreground'
                    )}
                  />
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{employee.name}</p>
                  <p className="text-sm text-primary">{employee.role}</p>
                  <p className="text-sm text-muted-foreground">
                    {employee.department}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="secondary">Full Time</Badge>
                    <Badge
                      variant={getStatusBadgeVariant(employee.status)}
                      className={cn(
                        employee.status === 'Active' &&
                          'bg-green-500/20 text-green-700 border-green-500/20 hover:bg-green-500/30 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/10'
                      )}
                    >
                      {employee.status === 'Active' ? 'Present' : employee.status}
                    </Badge>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
