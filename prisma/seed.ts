// use relative imports

import { PrismaClient } from "@prisma/client";
import mythicalIslands from "../scripts/mythical-islands/mythical-islands.json";
import geneticApex from "../scripts/genetic-apex/genetic-apex.json";
import spaceTimeSmackDown from "../scripts/space-time-smackdown/space-time-smackdown.json";
import triumphantLight from "../scripts/triumphant-light/triumphant-light.json";
import shiningRevelry from "../scripts/shining-revelry/shining-revelry.json";

const prisma = new PrismaClient();

/**
 * Seeds the database with predefined card sets and their associated cards, including detailed card attributes and relations.
 *
 * Upserts five card sets and iterates through imported card data to create card records with nested details, retreat costs, and weakness types. Skips cards with missing required fields or unknown set names.
 *
 * @remark Cards missing a name or set pokedex, or belonging to an unknown set, are skipped and not inserted.
 */
async function main() {
  const geneticApexSet = await prisma.set.upsert({
    where: { setName: "Genetic Apex" }, // Changed from id to setName
    update: {},
    create: {
      setName: "Genetic Apex",
      image: "/tcgpocket/sets/genetic-apex.png",
    },
  });

  const mythicalIslandsSet = await prisma.set.upsert({
    where: { setName: "Mythical Island" }, // Changed from id to setName
    update: {},
    create: {
      setName: "Mythical Island",
      image: "/tcgpocket/sets/mythical-islands.png",
    },
  });

  const spaceTimeSmackDownSet = await prisma.set.upsert({
    where: { setName: "Space-time Smackdown" }, // Changed from id to setName
    update: {},
    create: {
      setName: "Space-time Smackdown",
      image: "/tcgpocket/sets/space-time-smackdown.png",
    },
  });

  const triumphantLightSet = await prisma.set.upsert({
    where: { setName: "Triumphant Light" }, // Changed from id to setName
    update: {},
    create: {
      setName: "Triumphant Light",
      image: "/tcgpocket/sets/triumphant-light.png",
    },
  });
  const shiningRevelrySet = await prisma.set.upsert({
    where: { setName: "Shining Revelry" }, // Changed from id to setName
    update: {},
    create: {
      setName: "Shining Revelry",
      image: "/tcgpocket/sets/shining-revelry.png",
    },
  });

  // const retreats = await prisma.retreatCost.findMany();
  // const weakness = await prisma.weaknessType.findMany();

  // const retreatMap = new Map<string, number>();
  // retreats.forEach((retreat, i) => {
  //   retreatMap.set(`${retreat.image}/${retreat.count}`, retreat.id);
  // });
  // const weaknessMap = new Map<string, number>();
  // weakness.forEach((retreat, i) => {
  //   weaknessMap.set(`${retreat.image}/${retreat.value}`, retreat.id);
  // });

  const cards = [
    shiningRevelry,
    triumphantLight,
    spaceTimeSmackDown,
    mythicalIslands,
    geneticApex,
  ];

  while (cards.length > 0) {
    const curr = cards.pop()!;

    // Process each card
    for (const card of curr) {
      if (!card.name || !card.set?.pokedex) continue;
      let setId: number;

      switch (card.set.setName) {
        case "Genetic Apex":
          setId = geneticApexSet.id;
          break;
        case "Mythical Island":
          setId = mythicalIslandsSet.id;
          break;
        case "Space-time Smackdown":
          setId = spaceTimeSmackDownSet.id;
          break;
        case "Triumphant Light":
          setId = triumphantLightSet.id;
          break;
        case "Shining Revelry":
          setId = shiningRevelrySet.id;
          break;
        default:
          console.error(`Unknown set name: ${card.set.setName}`);
          continue; // Skip this card if the set name is unknown
      }

      const type = card.details.type.split("/").pop()?.split(".")[0];
      const pokedex = card.set.pokedex.split(card.set.setName)[1].trim();

      // Create the card and its details
      await prisma.card.create({
        data: {
          name: card.name,
          type: type || "Unknown type",
          image: card.thumbnail,
          setId: setId,
          expansion: card.expansion,
          pokedex,
          url: card.url,
          thumbnail: card.thumbnail,
          rarity: card.rarity,
          details: {
            create: {
              hp: Number(card.details.hp.replace(/\D/g, "")) || -1,
              type: card.details.type || "Unknown type",
              retreatCost: {
                connectOrCreate: {
                  create: {
                    image: card.details.retreat.image,
                    count: Number(card.details.retreat.count) || -1,
                  },
                  where: {
                    imageCount: {
                      count: Number(card.details.retreat.count) || -1,
                      image: card.details.retreat.image,
                    },
                  },
                },
              },
              weaknessType: {
                connectOrCreate: {
                  create: {
                    image: card.details.weakness.image,
                    value: card.details.weakness.value,
                  },
                  where: {
                    imageValue: {
                      image: card.details.weakness.image,
                      value: card.details.weakness.value,
                    },
                  },
                },
              },
            },
          },
        },
      });
    }
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
