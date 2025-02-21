"use server";

import mythicalIslands from "@/scripts/mythical-islands/mythical-islands.json";

export async function getCards(): Promise<MythicalIsland[]> {
  return mythicalIslands;
}

export type MythicalIsland = {
  set: {
    setName: string;
    image: string;
    pokedex: string;
  };
  thumbnail: string;
  name: string;
  url: string;
  details: {
    hp: string;
    type: string;
    weakness: {
      image: string;
      value: string;
    };
    retreat: {
      image: string;
      count: string;
    };
  };
  expansion: string;
};
