/*
  Warnings:

  - A unique constraint covering the columns `[userId,code]` on the table `otps` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "otps_userId_code_key" ON "otps"("userId", "code");
