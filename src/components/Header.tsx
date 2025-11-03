import { Plane } from "lucide-react";
import Link from "next/link";
import { UserNav } from "./UserNav";

export function Header() {
  return (
    <header className="bg-transparent backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <Plane className="h-7 w-7 text-accent" />
          <h1 className="text-2xl font-bold font-headline text-foreground">
            FlightTrackr
          </h1>
        </Link>
        <UserNav />
      </div>
    </header>
  );
}
