import { H2 } from "@/components/typography/headings";
import { Search } from "../_components/_client/Search";
import { Suspense } from "react";
import prisma from "@/prisma/db";
import LazyImage from "@/components/LazyImage";
import { CardPagination } from "../_components/_client/PaginationButtons";
import { Card } from "@prisma/client";
import { toast } from "sonner";

export default async function Page(props: {
  searchParams?: Promise<{
    card?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.card || "";
  const currentPage = Number(searchParams?.page) || 1;

  let cards: Card[] = [];
  let cardsCount = 0;
  try {
    const [c, count] = await Promise.all([
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
    cards = c;
    cardsCount = count;
  } catch (error) {
    console.error("Error fetching cards:", error);
    toast.error("Failed to fetch cards. Please try again.");
  }

  console.log({ query, currentPage, searchParams });

  return (
    <>
      <H2>Create a trade</H2>
      <p className="text-muted-foreground text-sm">
        Create a trade where you can share with others.
      </p>
      <Search />
      <Suspense
        key={query + currentPage}
        fallback={
          <div className="grid grid-cols-2 place-content-center gap-y-4 p-4 md:grid-cols-3 lg:grid-cols-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-[300px] w-[200px] animate-pulse rounded-lg bg-gray-200"
                ></div>
              ))}
          </div>
        }
      >
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
    <>
      {cards.length === 0 && (
        <div className="py-8 text-center">
          <p>No cards found. Try a different search term.</p>
        </div>
      )}
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
    </>
  );
};
