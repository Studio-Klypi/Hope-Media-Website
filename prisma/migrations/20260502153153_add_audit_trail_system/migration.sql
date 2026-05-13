-- CreateEnum
CREATE TYPE "EntryType" AS ENUM ('CUSTOM_MESSAGE', 'LOGGED_IN', 'LOGGED_OUT', 'LOGGED_OUT_ALL', 'OTP_REQUESTED', 'OTP_CONSUMED', 'USER_CREATED');

-- CreateTable
CREATE TABLE "audit_entries" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "type" "EntryType" NOT NULL DEFAULT 'CUSTOM_MESSAGE',
    "userId" INTEGER,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" TIMESTAMP(3),

    CONSTRAINT "audit_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "audit_entries_key_key" ON "audit_entries"("key");

-- AddForeignKey
ALTER TABLE "audit_entries" ADD CONSTRAINT "audit_entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
