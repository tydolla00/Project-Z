// "use client";

// import { cn } from "@/lib/utils";
// import { Card } from "@prisma/client";
// import { memo, Dispatch, SetStateAction, useState, useCallback } from "react";
// import { toast } from "sonner";

// export const DropArea = () => {
//   return (
//     <div className="grid grid-cols-2 gap-3">
//       {/* Pokemon Stadium background coloring. One side white, other side red. */}
//       {/* TODO Card's should be rotated 30 deg and stacked on top of each other and on hover rotated back -30 deg to be on top  */}
//       <TopDropZone
//         label="Cards you want"
//         draggedCard={draggedCard}
//         selectedCards={wantedCards}
//         setSelectedCards={setWantedCards}
//       />
//       <TopDropZone
//         label="Cards you are willing to trade"
//         draggedCard={draggedCard}
//         selectedCards={givingCards}
//         setSelectedCards={setGivingCards}
//       />
//     </div>
//   );
// };

// const TopDropZone = memo(
//   ({
//     draggedCard,
//     selectedCards,
//     setSelectedCards,
//     label,
//   }: {
//     draggedCard: Card | null;
//     selectedCards: Card[];
//     setSelectedCards: Dispatch<SetStateAction<Card[]>>;
//     label: string;
//   }) => {
//     const [isHovered, setIsHovered] = useState(false);

//     const handleDrop = useCallback(
//       (e: React.DragEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         setSelectedCards((prev) => {
//           const previouslySelected = prev.find(
//             (card) => card.id === draggedCard?.id,
//           );
//           if (previouslySelected) {
//             toast.getToasts().length === 0 &&
//               toast.error("Card already selected", { richColors: true });
//             return prev;
//           } else return [...prev, draggedCard!].sort((a, b) => a.id - b.id);
//         });
//         setIsHovered(false);
//       },
//       [draggedCard, setSelectedCards],
//     );

//     const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//       e.preventDefault();
//       setIsHovered(true);
//     }, []);

//     const handleDragLeave = useCallback(
//       (e: React.DragEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         setIsHovered(false);
//       },
//       [],
//     );

//     return (
//       <div>
//         <div>{label}</div>
//         <div
//           className={cn(
//             "min-h-60 w-full border transition-colors",
//             isHovered && "border-white",
//           )}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//         >
//           <div className="flex h-full flex-wrap items-center justify-center gap-3">
//             {selectedCards.length > 0 ? (
//               selectedCards.map((card) => (
//                 <CardImage key={card.id} card={card} />
//               ))
//             ) : (
//               <p className="text-muted-foreground">Drag a card here</p>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   },
// );
