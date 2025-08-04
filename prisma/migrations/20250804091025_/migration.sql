/*
  Warnings:

  - You are about to drop the column `providerId` on the `EnergyOffer` table. All the data in the column will be lost.
  - Added the required column `provider_id` to the `EnergyOffer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EnergyOffer" DROP CONSTRAINT "EnergyOffer_providerId_fkey";

-- AlterTable
ALTER TABLE "EnergyOffer" DROP COLUMN "providerId",
ADD COLUMN     "provider_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "EnergyOffer" ADD CONSTRAINT "EnergyOffer_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "EnergyProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
