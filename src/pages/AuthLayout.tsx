// AuthLayout.tsx
import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth.ts";

export function AuthLayout() {
  const { loading, isAuth } = useAuth();

  if (loading) {
    return;
  }

  if (!isAuth) {
    // Redirect to '/' if not authenticated
    window.location.href = "/";
    return null;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
