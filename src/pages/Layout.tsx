import { Outlet } from "react-router-dom";
import { VerticalNavbar } from "@/components/navbar/VerticalNavbar.tsx";
import { useAuth } from "@/hooks/useAuth.ts";
export function Layout() {
  // Get user
  const { user } = useAuth();
  return (
    <div className="w-full h-full flex">
      <VerticalNavbar user={user} />
      <div className="p-6 w-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
