/*
  Warnings:

  - You are about to drop the column `readAt` on the `audit_entries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "audit_entries" DROP COLUMN "readAt";
