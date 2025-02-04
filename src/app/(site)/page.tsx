import { Card, CardContent, CardTitle } from "@/components/ui/jcard";
import Link from "next/link";

export default function Home() {
  return (
    <section className="pb-24 pt-32 md:pt-40">
      <div className="flex item-center justify-center">
        <h1 className="text-3xl font-bold">Home</h1>
      </div>
      <Card className="w-[200px] shadow-md">
        <CardTitle>Setting</CardTitle>
        <CardContent>
          <Link href="/settings">Setting</Link>
        </CardContent>
      </Card>
    </section>
  );
}
