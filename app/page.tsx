import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/next-themes/modetoggle";
import Link from "next/link";

// Pocket Trading dot com
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Hero />
      <div className="absolute top-0 right-0 p-4">
        <ModeToggle />
      </div>
    </main>
  );
}
const styles = {
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  position: "relative",
  zIndex: 10,
} as const;
const Hero = () => (
  <div className="relative text-center">
    <div style={styles} className="text-5xl font-bold">
      Trade. Share. Game
    </div>
    <p style={styles}>
      Your Pocket Trading Hub. Create trades to share with others.
    </p>
    <div className="pointer-events-none absolute inset-4 h-60 w-60 -translate-1/2 translate-x-16 scale-150 rounded-full bg-gradient-to-b from-red-500 from-40% via-black via-50% to-white to-50% blur-3xl" />
    <div className="my-2 flex gap-5">
      <Button variant="secondary" className="flex-[1] hover:bg-red-600" asChild>
        <Link href="/dex">Pokedex</Link>
      </Button>
      <Button className="flex-[1]" asChild>
        <Link href="/trading">Trades</Link>
      </Button>
    </div>
    <PokeBall />
  </div>
);

// Create pokeball using layers and conic gradients
const PokeBall = () => <></>;
