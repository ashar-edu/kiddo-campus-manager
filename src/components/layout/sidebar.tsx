
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  GraduationCap, 
  Users, 
  Wallet, 
  FileText, 
  LayoutDashboard, 
  LogOut,
  School
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: location.pathname === "/dashboard",
    },
    {
      label: "Students",
      icon: GraduationCap,
      href: "/students",
      active: location.pathname.startsWith("/students"),
    },
    {
      label: "Staff",
      icon: Users,
      href: "/staff",
      active: location.pathname.startsWith("/staff"),
    },
    {
      label: "Finances",
      icon: Wallet,
      href: "/finances",
      active: location.pathname.startsWith("/finances"),
    },
    {
      label: "Reports",
      icon: BarChart3,
      href: "/reports",
      active: location.pathname.startsWith("/reports"),
    },
    {
      label: "Receipts",
      icon: FileText,
      href: "/receipts",
      active: location.pathname.startsWith("/receipts"),
    },
  ];

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-6">
            <School className="h-8 w-8 text-school-purple" />
            <h2 className="ml-2 text-xl font-bold text-school-purple">Kiddo Campus</h2>
          </div>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                className={cn(
                  "flex items-center text-sm group py-3 px-3 rounded-md transition-colors hover:bg-school-purple-light hover:text-school-purple",
                  route.active
                    ? "bg-school-purple-light text-school-purple font-medium"
                    : "text-muted-foreground"
                )}
              >
                <route.icon className={cn("h-5 w-5 mr-3", route.active ? "text-school-purple" : "")} />
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="px-3 py-2 mt-auto">
        <Link
          to="/logout"
          className="flex items-center text-sm group py-3 px-3 rounded-md hover:bg-school-purple-light hover:text-school-purple text-muted-foreground"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Link>
      </div>
    </div>
  );
}
