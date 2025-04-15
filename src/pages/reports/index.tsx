
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleStudents, sampleStaff, sampleTransactions } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

export default function ReportsPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>("August 2024");
  
  // Months for selection
  const months = [
    "June 2024",
    "July 2024",
    "August 2024",
    "September 2024",
  ];
  
  // ---- Student Fee Report ----
  // Calculate student fee statistics for selected month
  const totalStudents = sampleStudents.length;
  const studentsWithPaidFees = sampleStudents.filter(
    student => student.monthlyFees[selectedMonth]?.isPaid
  ).length;
  const studentsWithPendingFees = totalStudents - studentsWithPaidFees;
  
  const totalFeeAmount = sampleStudents.reduce(
    (sum, student) => sum + (student.monthlyFees[selectedMonth]?.amount || 0),
    0
  );
  
  const collectedFeeAmount = sampleStudents.reduce(
    (sum, student) => 
      sum + (student.monthlyFees[selectedMonth]?.isPaid 
        ? student.monthlyFees[selectedMonth]?.amount || 0 
        : 0),
    0
  );
  
  const pendingFeeAmount = totalFeeAmount - collectedFeeAmount;
  
  // ---- Staff Salary Report ----
  // Calculate staff salary statistics for selected month
  const totalStaff = sampleStaff.length;
  const staffWithPaidSalaries = sampleStaff.filter(
    staff => staff.salary[selectedMonth]?.isPaid
  ).length;
  const staffWithPendingSalaries = totalStaff - staffWithPaidSalaries;
  
  const totalSalaryAmount = sampleStaff.reduce(
    (sum, staff) => sum + (staff.salary[selectedMonth]?.amount || 0),
    0
  );
  
  const paidSalaryAmount = sampleStaff.reduce(
    (sum, staff) => 
      sum + (staff.salary[selectedMonth]?.isPaid 
        ? staff.salary[selectedMonth]?.amount || 0 
        : 0),
    0
  );
  
  const pendingSalaryAmount = totalSalaryAmount - paidSalaryAmount;
  
  // ---- Financial Report ----
  // Calculate financial statistics for selected month
  const [selectedMonthYear, selectedMonthName] = selectedMonth.split(' ');
  const monthIndex = new Date(`${selectedMonthName} 1, ${selectedMonthYear}`).getMonth();
  
  const monthTransactions = sampleTransactions.filter(
    transaction => new Date(transaction.date).getMonth() === monthIndex
  );
  
  const monthIncome = monthTransactions
    .filter(transaction => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
    
  const monthExpenses = monthTransactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
    
  const monthBalance = monthIncome - monthExpenses;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <div className="flex items-center gap-3">
            <Select
              value={selectedMonth}
              onValueChange={setSelectedMonth}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Printer className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="students">Student Fees</TabsTrigger>
            <TabsTrigger value="staff">Staff Salaries</TabsTrigger>
            <TabsTrigger value="financial">Financial Summary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Fee Report - {selectedMonth}</CardTitle>
                <CardDescription>
                  Monthly summary of student fee collection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalStudents}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Fees Paid</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">{studentsWithPaidFees}</div>
                      <p className="text-xs text-muted-foreground">{Math.round((studentsWithPaidFees / totalStudents) * 100)}% of students</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Fees Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-amber-600">{studentsWithPendingFees}</div>
                      <p className="text-xs text-muted-foreground">{Math.round((studentsWithPendingFees / totalStudents) * 100)}% of students</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Fee Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹{totalFeeAmount.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Collected Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">₹{collectedFeeAmount.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">{Math.round((collectedFeeAmount / totalFeeAmount) * 100)}% of total</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-amber-600">₹{pendingFeeAmount.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">{Math.round((pendingFeeAmount / totalFeeAmount) * 100)}% of total</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Students with Pending Fees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sampleStudents
                        .filter(student => !student.monthlyFees[selectedMonth]?.isPaid)
                        .map(student => (
                          <div key={student.id} className="flex justify-between items-center p-3 border rounded-md">
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">ID: {student.studentId}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-amber-600">₹{student.monthlyFees[selectedMonth]?.amount.toLocaleString() || 0}</p>
                              <p className="text-sm text-muted-foreground">Parent: {student.parentName}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="staff">
            <Card>
              <CardHeader>
                <CardTitle>Staff Salary Report - {selectedMonth}</CardTitle>
                <CardDescription>
                  Monthly summary of staff salary payments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalStaff}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Salaries Paid</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">{staffWithPaidSalaries}</div>
                      <p className="text-xs text-muted-foreground">{Math.round((staffWithPaidSalaries / totalStaff) * 100)}% of staff</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Salaries Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-amber-600">{staffWithPendingSalaries}</div>
                      <p className="text-xs text-muted-foreground">{Math.round((staffWithPendingSalaries / totalStaff) * 100)}% of staff</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Salary Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹{totalSalaryAmount.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">₹{paidSalaryAmount.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">{Math.round((paidSalaryAmount / totalSalaryAmount) * 100)}% of total</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-amber-600">₹{pendingSalaryAmount.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">{Math.round((pendingSalaryAmount / totalSalaryAmount) * 100)}% of total</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Staff with Pending Salaries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sampleStaff
                        .filter(staff => !staff.salary[selectedMonth]?.isPaid)
                        .map(staff => (
                          <div key={staff.id} className="flex justify-between items-center p-3 border rounded-md">
                            <div>
                              <p className="font-medium">{staff.name}</p>
                              <p className="text-sm text-muted-foreground">{staff.designation}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-amber-600">₹{staff.salary[selectedMonth]?.amount.toLocaleString() || 0}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <CardTitle>Financial Summary - {selectedMonth}</CardTitle>
                <CardDescription>
                  Overview of income, expenses and balance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">₹{monthIncome.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">₹{monthExpenses.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold ${monthBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                        ₹{monthBalance.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {monthBalance >= 0 ? "Profit" : "Loss"} for {selectedMonth}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Income Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {monthTransactions
                        .filter(transaction => transaction.type === 'income')
                        .map(transaction => (
                          <div key={transaction.id} className="flex justify-between items-center p-3 border rounded-md">
                            <div>
                              <p className="font-medium">{transaction.category}</p>
                              <p className="text-sm text-muted-foreground">{transaction.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-green-600">₹{transaction.amount.toLocaleString()}</p>
                              <p className="text-sm text-muted-foreground">
                                {transaction.relatedTo?.name ? `From: ${transaction.relatedTo.name}` : ''}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Expense Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {monthTransactions
                        .filter(transaction => transaction.type === 'expense')
                        .map(transaction => (
                          <div key={transaction.id} className="flex justify-between items-center p-3 border rounded-md">
                            <div>
                              <p className="font-medium">{transaction.category}</p>
                              <p className="text-sm text-muted-foreground">{transaction.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-red-600">₹{transaction.amount.toLocaleString()}</p>
                              <p className="text-sm text-muted-foreground">
                                {transaction.relatedTo?.name ? `To: ${transaction.relatedTo.name}` : ''}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
