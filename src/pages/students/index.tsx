
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Student } from "@/types";
import { sampleStudents } from "@/lib/data";
import { Link, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentsPage() {
  const [searchParams] = useSearchParams();
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  
  useEffect(() => {
    const filter = searchParams.get("filter");
    
    if (filter === "pending") {
      // Filter students with any pending fees
      const students = sampleStudents.filter(student => 
        Object.values(student.monthlyFees).some(fee => fee && !fee.isPaid) || 
        !student.admissionFee.isPaid
      );
      setFilteredStudents(students);
    } else {
      setFilteredStudents(sampleStudents);
    }
  }, [searchParams]);

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "studentId",
      header: "ID",
    },
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
      accessorKey: "parentName",
      header: "Parent Name",
    },
    {
      accessorKey: "parentContact",
      header: "Contact",
    },
    {
      id: "feeStatus",
      header: "Fee Status",
      cell: ({ row }) => {
        const student = row.original;
        const hasPendingFees = Object.values(student.monthlyFees).some(fee => fee && !fee.isPaid) || !student.admissionFee.isPaid;
        
        return (
          <Badge variant={hasPendingFees ? "destructive" : "success"}>
            {hasPendingFees ? "Pending" : "Paid"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const student = row.original;
        
        return (
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" asChild>
              <Link to={`/students/${student.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="icon" variant="ghost" asChild>
              <Link to={`/students/edit/${student.id}`}>
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
          <h2 className="text-3xl font-bold tracking-tight">Students</h2>
          <Button asChild>
            <Link to="/students/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Link>
          </Button>
        </div>
        
        <Card>
          <CardHeader className="px-6 py-4">
            <CardTitle className="text-lg">Students List</CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            <DataTable
              columns={columns}
              data={filteredStudents}
              searchColumn="name"
              searchPlaceholder="Search students..."
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
