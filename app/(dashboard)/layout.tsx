import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import { cookies } from "next/headers";
import NavLinks from "@/components/ui/nav-links";
export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DashboardSidebar />

      <SidebarInset>
        <div className="flex flex-row justify-between pe-10 pt-0">
          <SidebarTrigger className="justify-center" />
          <NavLinks />
        </div>
        <main className="flex p-4 justify-center">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
