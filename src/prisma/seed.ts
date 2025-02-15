import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
/* eslint-disable @typescript-eslint/no-unused-vars */
const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@pingcap.com",
    tasks: {
      create: [
        {
          name: "task1",
          syncStrategy: "false",
          syncData: "",
          status: "pending",
          platform: ["taobao/tianmao", "douyinshangchen"],
          keywords: "RTX 3060",
        },
      ],
    },
  },
];
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
async function updateUser(email: string, data: any) {
  console.log("update user;", email);
  await prisma.user.update({
    where: { email: email },
    data: {
      tasks: {
        create: [{ ...data }],
      },
    },
  });
}
async function main() {
  console.log(`Start seeding ...`);
  const d = {
    name: "任务_test",
    keywords: "afeaf",
    platform: ["taobao/tianmao"],
    syncStrategy: "false",
    status: "created",
    syncData: "价格 商家 商品",
  };
  await updateUser("test2@google.com", d);
  return;
  // for (const u of userData) {
  //   const user = await prisma.user.create({
  //     data: u,
  //   });
  //   console.log(`Created user with id: ${user}`);
  // }
  // const uu = {
  //   name: "Alice",
  //   email: "alice@pingcap.com",
  //   tasks: {
  //     create: [
  //       {
  //         name: "task1",
  //         syncStrategy: "false",
  //         status: "pending",
  //         platform: ["taobao/tianmao", "douyinshangchen"],
  //         keywords: "RTX 3060",
  //       },
  //     ],
  //   },
  const user = await prisma.user.findFirst({
    where: { email: "alice@pingcap.com" },
  });
  console.log(user);
  createTask({
    name: "task2",
    syncStrategy: "false",
    status: "pending",
    platform: ["jindong", "douyinshangchen"],
    keywords: "RTX 3069",
    userId: user!.id,
  });
  console.log(`Seeding finished.`);
}
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
async function createTask(taskData: any) {
  try {
    const newTask = await prisma.task.create({
      data: {
        ...taskData,
      },
    });
    console.log("Created task:", newTask);
  } catch (error) {
    console.error("Error creating task:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
