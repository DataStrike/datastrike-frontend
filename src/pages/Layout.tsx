import { VerticalNavbar } from "@/components/navbar/VerticalNavbar.tsx";
import { useAuth } from "@/hooks/useAuth.ts";
import { Toaster } from "@/components/ui/sonner.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthLayout } from "./AuthLayout";
export const queryClient = new QueryClient();

interface LayoutProps {
  children: React.ReactNode;
}
export function Layout({ children }: LayoutProps){
  // Get user
  const { user } = useAuth();
  return (
    <AuthLayout>
      <QueryClientProvider client={queryClient}>
      <div className="w-full h-full flex">
        <Toaster closeButton position="top-right" />
        <VerticalNavbar user={user} />
        <div className="p-6 w-full overflow-auto">
          {children}
        </div>
      </div>
    </QueryClientProvider>
  </AuthLayout>
  );
}
