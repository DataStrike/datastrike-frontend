import { Outlet } from "react-router-dom";
import { VerticalNavbar } from "@/components/navbar/VerticalNavbar.tsx";
import { useAuth } from "@/hooks/useAuth.ts";
import { Toaster } from "@/components/ui/sonner.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const queryClient = new QueryClient();
export function Layout() {
  // Get user
  const { user } = useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-full flex">
        <Toaster closeButton position="top-right" />
        <VerticalNavbar user={user} />
        <div className="p-6 w-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </QueryClientProvider>
  );
}
