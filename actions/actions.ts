"use server";

import mythicalIslands from "@/scripts/mythical-islands/mythical-islands.json";
import geneticApex from "@/scripts/genetic-apex/genetic-apex.json";
import spaceTimeSmackDown from "@/scripts/space-time-smackdown/space-time-smackdown.json";
import triumphantLight from "@/scripts/triumphant-light/triumphant-light.json";
import shiningRevelry from "@/scripts/shining-revelry/shining-revelry.json";

export async function getCards(dex: string): Promise<Dex[]> {
  switch (dex) {
    case "mythical-islands":
      return mythicalIslands;
    case "genetic-apex":
      return geneticApex;
    case "space-time-smackdown":
      return spaceTimeSmackDown;
    case "triumphant-light":
      return triumphantLight;
    case "shining-revelry":
      return shiningRevelry;

    default:
      return [];
  }
}

export type Dex = {
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
