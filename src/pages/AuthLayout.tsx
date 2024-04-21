// AuthLayout.tsx
import { useAuth } from "@/hooks/useAuth.ts";

interface AuthLayoutProps {
  children: React.ReactNode;
}
export function AuthLayout({ children }: AuthLayoutProps) {
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
      {children}
    </>
  );
}
