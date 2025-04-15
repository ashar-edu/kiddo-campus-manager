
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  Users, 
  CreditCard, 
  Clock, 
  AlertTriangle, 
  TrendingUp 
} from "lucide-react";
import { sampleStudents, sampleStaff, sampleTransactions } from "@/lib/data";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // Calculate summary data
  const totalStudents = sampleStudents.length;
  const totalStaff = sampleStaff.length;
  
  // Fee collection stats
  const pendingFeeStudents = sampleStudents.filter(student => 
    Object.values(student.monthlyFees).some(fee => !fee.isPaid)
  ).length;
  
  // Calculate total income
  const currentMonthIncome = sampleTransactions
    .filter(t => t.type === 'income' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0);
  
  // Calculate total expenses
  const currentMonthExpenses = sampleTransactions
    .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0);

  // Staff with pending salaries
  const pendingSalaryStaff = sampleStaff.filter(staff => 
    Object.values(staff.salary).some(salary => !salary.isPaid)
  ).length;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                Active students
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStaff}</div>
              <p className="text-xs text-muted-foreground">
                Active staff members
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Month Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{currentMonthIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Revenue this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Month Expenses</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{currentMonthExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Total expenses this month
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Pending Fees</CardTitle>
              <CardDescription>
                Students with pending fee payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <span className="text-xl font-bold">{pendingFeeStudents}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">students with pending fees</span>
                </div>
                <Button size="sm" asChild>
                  <Link to="/students?filter=pending">View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Pending Salaries</CardTitle>
              <CardDescription>
                Staff with pending salary payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="text-xl font-bold">{pendingSalaryStaff}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">staff with pending salaries</span>
                </div>
                <Button size="sm" asChild>
                  <Link to="/staff?filter=pending">View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>
                Current month balance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="text-xl font-bold">₹{(currentMonthIncome - currentMonthExpenses).toLocaleString()}</div>
                  <span className="text-sm text-muted-foreground">
                    {currentMonthIncome > currentMonthExpenses ? "Profit" : "Loss"} for current month
                  </span>
                </div>
                <Button size="sm" asChild>
                  <Link to="/reports">View Reports</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 grid-cols-1">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link to="/students/add">Add New Student</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link to="/staff/add">Add New Staff</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link to="/finances/add-fee">Record Fee Payment</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link to="/finances/add-expense">Record Expense</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link to="/reports/generate">Generate Reports</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
