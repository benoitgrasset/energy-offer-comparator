-- CreateTable
CREATE TABLE "EnergyProvider" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "EnergyProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnergyOffer" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "consumption_pricing" DOUBLE PRECISION NOT NULL,
    "subscription_cost" DOUBLE PRECISION NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "EnergyOffer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EnergyProvider_slug_key" ON "EnergyProvider"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EnergyOffer_slug_key" ON "EnergyOffer"("slug");

-- AddForeignKey
ALTER TABLE "EnergyOffer" ADD CONSTRAINT "EnergyOffer_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "EnergyProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
