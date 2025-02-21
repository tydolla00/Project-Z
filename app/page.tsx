import { getCards, MythicalIsland } from "@/actions/actions";
import LazyImage from "@/components/LazyImage";
import { ModeToggle } from "@/next-themes/modetoggle";

export default async function Home() {
  const mythicalIslands = await getCards();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ModeToggle />
      <CardGrid cards={mythicalIslands} />
    </main>
  );
}

const CardGrid = ({ cards }: { cards: MythicalIsland[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    {cards.map((card: MythicalIsland, index) => (
      <LazyImage
        key={`${card.name}-${index}`}
        src={`https://serebii.net${card.thumbnail.replace("/th", "")}`}
        alt={`${card.name} Card`}
        defaultUrl="https://serebii.net/tcgpocket/th/mythicalisland/1.jpg"
        width={300}
        height={400}
      />
    ))}
  </div>
);
