
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Staff } from "@/types";
import { sampleStaff } from "@/lib/data";
import { Link, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StaffPage() {
  const [searchParams] = useSearchParams();
  const [filteredStaff, setFilteredStaff] = useState<Staff[]>([]);
  
  useEffect(() => {
    const filter = searchParams.get("filter");
    
    if (filter === "pending") {
      // Filter staff with any pending salary
      const staff = sampleStaff.filter(member => 
        Object.values(member.salary).some(salary => salary && !salary.isPaid)
      );
      setFilteredStaff(staff);
    } else {
      setFilteredStaff(sampleStaff);
    }
  }, [searchParams]);

  const columns: ColumnDef<Staff>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "designation",
      header: "Designation",
    },
    {
      accessorKey: "contact",
      header: "Contact",
    },
    {
      id: "salaryStatus",
      header: "Salary Status",
      cell: ({ row }) => {
        const staff = row.original;
        const hasPendingSalary = Object.values(staff.salary).some(salary => salary && !salary.isPaid);
        
        return (
          <Badge variant={hasPendingSalary ? "destructive" : "success"}>
            {hasPendingSalary ? "Pending" : "Paid"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const staff = row.original;
        
        return (
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" asChild>
              <Link to={`/staff/${staff.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="icon" variant="ghost" asChild>
              <Link to={`/staff/edit/${staff.id}`}>
                <Edit className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Staff</h2>
          <Button asChild>
            <Link to="/staff/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Staff
            </Link>
          </Button>
        </div>
        
        <Card>
          <CardHeader className="px-6 py-4">
            <CardTitle className="text-lg">Staff List</CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            <DataTable
              columns={columns}
              data={filteredStaff}
              searchColumn="name"
              searchPlaceholder="Search staff..."
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
