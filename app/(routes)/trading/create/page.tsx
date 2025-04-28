import { H2 } from "@/components/typography/headings";
import { Search } from "../_components/_client/Search";
import { Suspense } from "react";
import prisma from "@/prisma/db";
import LazyImage from "@/components/LazyImage";
import { sleep } from "@/lib/utils";
import { CardPagination } from "../_components/_client/PaginationButtons";
import { Card } from "@prisma/client";

export default async function Page(props: {
  searchParams?: Promise<{
    card?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.card || "";
  const currentPage = Number(searchParams?.page) || 1;

  const [cards, cardsCount] = await Promise.all([
    prisma.card.findMany({
      take: 20,
      skip: (currentPage - 1) * 20,
      where: {
        name: {
          startsWith: query,
          mode: "insensitive",
        },
        AND: { isTradeable: true },
      },
    }),
    prisma.card.count({
      where: {
        name: {
          startsWith: query,
          mode: "insensitive",
        },
        AND: { isTradeable: true },
      },
    }),
  ]);

  console.log({ query, currentPage, searchParams });

  return (
    <>
      <H2>Create a trade</H2>
      <p className="text-muted-foreground text-sm">
        Create a trade where you can share with others.
      </p>
      <Search />
      <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
        <Cards
          cards={cards}
          query={query}
          page={currentPage}
          count={cardsCount}
        />
      </Suspense>
      <CardPagination count={cardsCount} page={currentPage} />
    </>
  );
}

const Cards = async ({
  query,
  page,
  count,
  cards,
}: {
  query: string;
  page: number;
  count: number;
  cards: Card[];
}) => {
  return (
    <div className="grid grid-cols-2 place-content-center gap-y-4 p-4 md:grid-cols-3 lg:grid-cols-6">
      {cards.map((card) => (
        <div key={card.id}>
          <LazyImage
            title={card.name}
            className="rounded-lg select-none"
            alt={`${card.name} Card`}
            src={`https://serebii.net${card.thumbnail.replace("/th", "")}`}
            width={200}
            height={300}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
};
