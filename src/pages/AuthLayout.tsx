import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth.ts";

export function AuthLayout() {
  useAuth();

  return (
    <>
      <Outlet />
    </>
  );
}
