
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Transaction } from "@/types";
import { sampleTransactions } from "@/lib/data";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function FinancesPage() {
  const [transactions] = useState<Transaction[]>(sampleTransactions);

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount (₹)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div>₹{row.original.amount.toLocaleString()}</div>;
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.original.type;
        return (
          <Badge variant={type === "income" ? "success" : "destructive"}>
            {type === "income" ? "Income" : "Expense"}
          </Badge>
        );
      },
    },
  ];

  // Filter transactions by type
  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  // Calculate totals
  const totalIncome = incomeTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const totalExpense = expenseTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Finances</h2>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/finances/add-expense">
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Link>
            </Button>
            <Button asChild>
              <Link to="/finances/add-fee">
                <Plus className="mr-2 h-4 w-4" />
                Record Fee
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₹{totalIncome.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                ₹{totalExpense.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  totalIncome - totalExpense >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                ₹{(totalIncome - totalExpense).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expense">Expenses</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Card>
              <CardHeader className="px-6 py-4">
                <CardTitle className="text-lg">All Transactions</CardTitle>
              </CardHeader>
              <CardContent className="px-6">
                <DataTable
                  columns={columns}
                  data={transactions}
                  searchColumn="description"
                  searchPlaceholder="Search transactions..."
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="income">
            <Card>
              <CardHeader className="px-6 py-4">
                <CardTitle className="text-lg">Income Transactions</CardTitle>
              </CardHeader>
              <CardContent className="px-6">
                <DataTable
                  columns={columns}
                  data={incomeTransactions}
                  searchColumn="description"
                  searchPlaceholder="Search income..."
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="expense">
            <Card>
              <CardHeader className="px-6 py-4">
                <CardTitle className="text-lg">Expense Transactions</CardTitle>
              </CardHeader>
              <CardContent className="px-6">
                <DataTable
                  columns={columns}
                  data={expenseTransactions}
                  searchColumn="description"
                  searchPlaceholder="Search expenses..."
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
