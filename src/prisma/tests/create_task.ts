import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.update({
    where: {
      id: "67ab5fc5844591e148491d8a",
    },
    data: {
      tasks: {
        create: [
          {
            name: "test_t3",
            syncStrategy: "false",
            syncData: "",
            status: "pending",
            platform: ["taobao/tianmao", "douyinshangchen"],
            keywords: "keyworkds",
            update_time: new Date(),
          },
        ],
      },
    },
  });

  console.dir(user, { depth: Infinity });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
