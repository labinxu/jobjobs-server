import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: {
      email: "test_create@g.com",
    },
  });
  console.log(user);

  const user2 = await prisma.user.findUnique({
    where: {
      id: user!.id,
    },
  });
  console.log("user2", user2);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
