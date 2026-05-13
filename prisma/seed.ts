import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import seedUsers from "./seeds/user";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const start = Date.now();

  console.log("🌱  Seeding users...");
  await seedUsers(prisma);

  return Date.now() - start;
}

main()
  .then(elapsedTime => console.log(`✨  Seeding done in ${elapsedTime}ms`))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
