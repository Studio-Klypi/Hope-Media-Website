/*
  Warnings:

  - A unique constraint covering the columns `[sourceId]` on the table `web_blocks` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "web_blocks" ADD COLUMN     "sourceId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "web_blocks_sourceId_key" ON "web_blocks"("sourceId");

-- AddForeignKey
ALTER TABLE "web_blocks" ADD CONSTRAINT "web_blocks_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "web_contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
