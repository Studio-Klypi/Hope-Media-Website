-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EntryType" ADD VALUE 'WEB_MESSAGE_RECEIVED';
ALTER TYPE "EntryType" ADD VALUE 'WEB_MESSAGE_REPLYED';
ALTER TYPE "EntryType" ADD VALUE 'WEB_MESSAGE_IGNORE';
ALTER TYPE "EntryType" ADD VALUE 'WEB_SENDER_BLOCKED';

-- CreateTable
CREATE TABLE "web_contacts" (
    "id" TEXT NOT NULL,
    "replyTo" TEXT,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "repliedAt" TIMESTAMP(3),
    "ignoredAt" TIMESTAMP(3),
    "blockedAt" TIMESTAMP(3),

    CONSTRAINT "web_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "web_blocks" (
    "email" TEXT NOT NULL,
    "reason" TEXT,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "web_blocks_pkey" PRIMARY KEY ("email")
);

-- AddForeignKey
ALTER TABLE "web_contacts" ADD CONSTRAINT "web_contacts_replyTo_fkey" FOREIGN KEY ("replyTo") REFERENCES "web_contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "web_blocks" ADD CONSTRAINT "web_blocks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
