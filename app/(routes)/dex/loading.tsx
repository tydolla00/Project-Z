import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Loading() {
  const sets = [
    "Mythical Islands",
    "Genetic Apex",
    "Space Time Smackdown",
    "Triumphant Light",
    "Shining Revelry",
  ];

  return (
    <div className="m-16">
      {sets.map((set) => (
        <div key={set}>
          <Skeleton className="my-6 h-12 w-64" />
          <ScrollArea className="h-screen">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="h-96 w-full" />
              ))}
            </div>
          </ScrollArea>
        </div>
      ))}
    </div>
  );
}
