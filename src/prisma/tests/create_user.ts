//import prisma, { Prisma } from "@/lib/API/Services/init/prisma";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const userData: Prisma.UserCreateInput[] = [
  {
    name: "test_create",
    email: "test_create@g.com",
  },
];

async function main() {
  const hana = await prisma.user.create({
    data: userData[0],
  });

  console.log(hana);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
