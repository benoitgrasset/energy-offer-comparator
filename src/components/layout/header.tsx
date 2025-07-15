import { ZapIcon } from "lucide-react";
import Link from "next/link";
import CountrySelector from "../countrySelector";
import { Settings } from "../settings";
import { ModeToggle } from "../theme/theme-mode-toggle";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="flex gap-4 items-center justify-between py-2 border-b border-accent">
      <Link href="/" className="flex items-center gap-2">
        <Button variant="ghost" className="text-lg font-bold">
          <ZapIcon className="size-6" />
          <span className="hidden md:inline">Energy offer comparator</span>
        </Button>
      </Link>
      <div className="flex-1" />
      <nav className="flex items-center gap-4">
        <CountrySelector />
        <ModeToggle />
        <Settings />
      </nav>
    </header>
  );
}
