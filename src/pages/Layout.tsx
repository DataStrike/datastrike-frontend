import { Outlet } from "react-router-dom";
import { VerticalNavbar } from "@/components/navbar/VerticalNavbar.tsx";
import { useAuth } from "@/hooks/useAuth.ts";
export function Layout() {
  // Get user
  const { user } = useAuth();
  return (
    <div className="w-full h-full flex">
      <VerticalNavbar user={user} />
      <div className="pt-4">
        <Outlet />
      </div>
    </div>
  );
}
