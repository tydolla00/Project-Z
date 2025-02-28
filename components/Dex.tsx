import LazyImage from "./LazyImage";
import { type Dex } from "@/actions/actions";

export const CardDex = ({ cards }: { cards: Dex[] }) => (
  <div className="grid grid-cols-2 place-content-center gap-4 p-4 md:grid-cols-3 lg:grid-cols-5">
    {cards.map((card: Dex, index) => (
      <div key={`${card.name}-${index}`} className="flex flex-col items-center">
        <LazyImage
          key={`${card.name}-${index}`}
          src={`https://serebii.net${card.thumbnail.replace("/th", "")}`}
          alt={`${card.name} Card`}
          defaultUrl="/back.png"
          externalUrl={card.url}
          width={300}
          height={400}
        />
        {/* <div>Expansion {card.expansion}</div>
        <div>HP {card.details.hp}</div>
        <div>Retreat {card.details.retreat.count}</div>
        <div>Type {card.details.type.split("/").at(-1)?.split(".").at(0)}</div>
        <div>Weakness {card.details.weakness.value}</div> */}
      </div>
    ))}
  </div>
);
