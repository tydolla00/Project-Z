import { getCards } from "@/actions/actions";
import { CardDex } from "@/components/Dex";
import { FillText } from "@/components/FillText";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Suspense } from "react";

// Look at the meta for the page on serebii
export default async function Page() {
  const mythicalIslands = await getCards("mythical-islands");
  const geneticApex = await getCards("genetic-apex");
  const spaceTimeSmackdown = await getCards("space-time-smackdown");

  return (
    <div className="m-16">
      <TableOfContents />
      <Suspense fallback={<div>Loading...</div>}>
        <h2 id="mythical-islands" className="my-6 text-4xl font-bold">
          Mythical Islands
        </h2>
        <ScrollArea className="h-screen">
          <CardDex cards={mythicalIslands} />
        </ScrollArea>
        <h2 id="genetic-apex" className="my-6 text-4xl font-bold">
          Genetic Apex
        </h2>
        <ScrollArea className="h-screen">
          <CardDex cards={geneticApex} />
        </ScrollArea>
        <h2 id="space-time-smackdown" className="my-6 text-4xl font-bold">
          Space Time Smackdown
        </h2>
        <ScrollArea className="h-screen">
          <CardDex cards={spaceTimeSmackdown} />
        </ScrollArea>
      </Suspense>
    </div>
  );
}

const TableOfContents = () => (
  <Card className="sticky top-10 left-0 z-10 w-64">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">Table of Contents</CardTitle>
    </CardHeader>
    <CardContent className="list-disc">
      <Link href="#mythical-islands">
        <FillText
          className="text-red-500 duration-300 group-hover/fill:duration-1000"
          text="Mythical Islands"
        />
      </Link>
      <Link href="#genetic-apex">
        <FillText
          className="text-red-500 duration-300 group-hover/fill:duration-1000"
          text="Genetic Apex"
        />
      </Link>
      <Link href="#space-time-smackdown">
        <FillText
          className="text-red-500 duration-300 group-hover/fill:duration-1000"
          text="Space Time Smackdown"
        />
      </Link>
    </CardContent>
  </Card>
);
