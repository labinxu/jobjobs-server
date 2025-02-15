import { LayoutProps } from "@/lib/types/types";
import "../globals.css";
export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html suppressHydrationWarning>
      <body>
        <div className="flex justify-center">{children}</div>
      </body>
    </html>
  );
}
