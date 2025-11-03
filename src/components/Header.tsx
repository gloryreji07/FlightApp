import { Plane } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-transparent backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
      <div className="container mx-auto flex items-center h-16">
        <Link href="/" className="flex items-center gap-3 text-primary transition-opacity hover:opacity-80">
          <Plane className="h-7 w-7 text-white" />
          <h1 className="text-2xl font-bold font-headline text-white">
            FlightTrackr
          </h1>
        </Link>
      </div>
    </header>
  );
}
