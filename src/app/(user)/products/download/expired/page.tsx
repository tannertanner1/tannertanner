import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Expired() {
  return (
    <>
      <h1 className="mb-4">Expired</h1>
      <Button asChild variant="outline" size="lg">
        <Link href="/orders">Regenerate</Link>
      </Button>
    </>
  );
}
