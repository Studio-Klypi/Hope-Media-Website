import type { PrismaClient } from "@prisma/client";

const users = [
  {
    id: 1,
    firstName: "Root",
    lastName: "ROOT",
    email: "root@root.xyz",
  },
];

export default async function (client: PrismaClient) {
  for (const user of users) {
    await client.user.upsert({
      where: {
        id: user.id,
      },
      create: {
        ...user,
      },
      update: {
        ...user,
      },
    });
  }

  console.log(`🌳  ${users.length} users created or updated!`);
}
