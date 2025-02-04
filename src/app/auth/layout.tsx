import { Separator } from "@/components/ui/separator";
import { LayoutProps } from "@/lib/types/types";
import { ThemeDropDownMenu } from "@/components/ThemeDropdown";
import { Logo } from "@/components/logo";
export default async function AuthLayout({ children }: LayoutProps) {
  return (
    <div>
      <header className="p-6 mb-4">
        <div className="flex justify-between items-center">
          <Logo />
          <ThemeDropDownMenu />
        </div>
        <Separator />
      </header>

      <main className="grid justify-center items-center">{children}</main>
    </div>
  );
}
