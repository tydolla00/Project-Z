-- CreateTable
CREATE TABLE "Card" (
    "card_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "set_id" INTEGER NOT NULL,
    "expansion" TEXT NOT NULL,
    "pokedex" TEXT,
    "url" TEXT,
    "thumbnail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("card_id")
);

-- CreateTable
CREATE TABLE "Set" (
    "set_id" SERIAL NOT NULL,
    "setName" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("set_id")
);

-- CreateTable
CREATE TABLE "Details" (
    "details_id" SERIAL NOT NULL,
    "hp" TEXT,
    "type" TEXT,
    "weakness_type_image" TEXT,
    "weakness_type_value" TEXT,
    "retreat_cost_image" TEXT,
    "retreat_cost_count" INTEGER,
    "card_id" INTEGER NOT NULL,

    CONSTRAINT "Details_pkey" PRIMARY KEY ("details_id")
);

-- CreateTable
CREATE TABLE "WeaknessType" (
    "image" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "WeaknessType_pkey" PRIMARY KEY ("image","value")
);

-- CreateTable
CREATE TABLE "RetreatCost" (
    "image" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "RetreatCost_pkey" PRIMARY KEY ("image","count")
);

-- CreateIndex
CREATE UNIQUE INDEX "Set_setName_key" ON "Set"("setName");

-- CreateIndex
CREATE UNIQUE INDEX "Details_card_id_key" ON "Details"("card_id");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_set_id_fkey" FOREIGN KEY ("set_id") REFERENCES "Set"("set_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Details" ADD CONSTRAINT "Details_weakness_type_image_weakness_type_value_fkey" FOREIGN KEY ("weakness_type_image", "weakness_type_value") REFERENCES "WeaknessType"("image", "value") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Details" ADD CONSTRAINT "Details_retreat_cost_image_retreat_cost_count_fkey" FOREIGN KEY ("retreat_cost_image", "retreat_cost_count") REFERENCES "RetreatCost"("image", "count") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Details" ADD CONSTRAINT "Details_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Card"("card_id") ON DELETE RESTRICT ON UPDATE CASCADE;
