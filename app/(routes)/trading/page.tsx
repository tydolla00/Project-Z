import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import SiteFooter from "@/components/Footer";
import Image from "next/image";

export default function TradingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <main className="flex-1">
        <div className="container px-4 py-8">
          <div className="mb-8 flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Trading Center</h1>
          </div>

          <Tabs defaultValue="my-trades" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-2 rounded-full p-1">
              <TabsTrigger value="my-trades" className="rounded-full">
                My Trade Offers
              </TabsTrigger>
              <TabsTrigger value="create-trade" className="rounded-full">
                Create New Trade
              </TabsTrigger>
            </TabsList>

            <TabsContent value="my-trades" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Your Active Trade Offers
                </h2>
                <div className="relative w-64">
                  <Search className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <Input
                    placeholder="Search trades..."
                    className="rounded-full pl-9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((trade) => (
                  <Card
                    key={trade}
                    className="overflow-hidden rounded-xl border-none shadow-md"
                  >
                    <CardHeader className="bg-gradient-to-r from-red-500/10 to-red-400/10">
                      <CardTitle className="flex items-center justify-between">
                        <span>Trade #{trade}</span>
                        <Badge className="rounded-full bg-red-500">
                          Active
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="mb-2 font-medium">
                            You&apos;re offering:
                          </h3>
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {[1, 2].map((card) => (
                              <div
                                key={card}
                                className="bg-muted relative h-24 w-16 flex-shrink-0 rounded-lg border"
                              >
                                <Image
                                  height={200}
                                  width={200}
                                  src={`/back.png`}
                                  alt={`Card ${card}`}
                                  className="h-full w-full rounded-lg object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="mb-2 font-medium">
                            You&apos;re looking for:
                          </h3>
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {[1, 2, 3].map((card) => (
                              <div
                                key={card}
                                className="bg-muted relative h-24 w-16 flex-shrink-0 rounded-lg border"
                              >
                                <Image
                                  height={200}
                                  width={200}
                                  src={`/back.png`}
                                  alt={`Wanted Card ${card}`}
                                  className="h-full w-full rounded-lg object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="rounded-full"
                      >
                        Cancel Trade
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="create-trade">
              <Card className="overflow-hidden rounded-xl border-none shadow-md">
                <CardHeader className="bg-gradient-to-r from-red-500/10 to-red-400/10">
                  <CardTitle>Create a New Trade Offer</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid gap-6">
                    <div>
                      <h3 className="mb-4 text-lg font-medium">
                        Cards You&apos;re Offering
                      </h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-4">
                          <div className="relative">
                            <Search className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                            <Input
                              placeholder="Search your collection..."
                              className="rounded-full pl-9"
                            />
                          </div>
                          <div className="h-64 overflow-y-auto rounded-xl border p-4">
                            {[1, 2, 3, 4, 5, 6].map((card) => (
                              <div
                                key={card}
                                className="flex items-center space-x-2 py-2"
                              >
                                <Checkbox
                                  id={`card-${card}`}
                                  className="rounded-full"
                                />
                                <div className="bg-muted h-14 w-10 rounded-lg">
                                  <Image
                                    height={200}
                                    width={200}
                                    src={`/back.png`}
                                    alt={`Card ${card}`}
                                    className="h-full w-full rounded-lg object-cover"
                                  />
                                </div>
                                <Label
                                  htmlFor={`card-${card}`}
                                  className="flex-1"
                                >
                                  Pokémon Card #{card}
                                </Label>
                                <Badge
                                  variant="outline"
                                  className="rounded-full"
                                >
                                  Common
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="h-64 overflow-y-auto rounded-xl border p-4">
                          <h4 className="mb-2 font-medium">
                            Selected Cards (0)
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {/* Selected cards will appear here */}
                            <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                              No cards selected
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4 text-lg font-medium">
                        Cards You&apos;re Looking For
                      </h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-4">
                          <div className="relative">
                            <Search className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                            <Input
                              placeholder="Search all cards..."
                              className="rounded-full pl-9"
                            />
                          </div>
                          <div className="h-64 overflow-y-auto rounded-xl border p-4">
                            {[1, 2, 3, 4, 5, 6].map((card) => (
                              <div
                                key={card}
                                className="flex items-center space-x-2 py-2"
                              >
                                <Checkbox
                                  id={`want-${card}`}
                                  className="rounded-full"
                                />
                                <div className="bg-muted h-14 w-10 rounded-lg">
                                  <Image
                                    height={200}
                                    width={200}
                                    src={`/back.png`}
                                    alt={`Wanted Card ${card}`}
                                    className="h-full w-full rounded-lg object-cover"
                                  />
                                </div>
                                <Label
                                  htmlFor={`want-${card}`}
                                  className="flex-1"
                                >
                                  Wanted Card #{card}
                                </Label>
                                <Badge
                                  variant="outline"
                                  className="rounded-full"
                                >
                                  Rare
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="h-64 overflow-y-auto rounded-xl border p-4">
                          <h4 className="mb-2 font-medium">Wanted Cards (0)</h4>
                          <div className="flex flex-wrap gap-2">
                            {/* Wanted cards will appear here */}
                            <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                              No cards selected
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="rounded-full">Create Trade Offer</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
