import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export type Task = {
  id: string;
  name: string;
  syncData: string;
  status: "pending" | "processing" | "success" | "failed";
};

export default async function seedGoods(data: Task) {
  console.log("seed goods");
  const user = await prisma?.user.findFirst({
    where: {
      email: "test1@google.com",
    },
  });
  console.log(`find user ${user?.id}`);
  try {
    const task = await prisma.task.findFirst({ where: { userId: user?.id } });
    if (task) {
      console.log(`find task ${task}`);
      await prisma?.task.update({
        where: { id: task.id },
        data: { goods: { create: data } },
      });
      console.log("seed goods finished!");

      const total = await prisma?.goods.count({ where: { taskId: task.id } });
      console.log(`total insert ${total}`);
    } else {
      console.log(`task not found test1@google.com`);
    }
  } catch (err) {
    console.log(err);
  }
}
export function getRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
export function getRandomShop(): string {
  const characters = ["shop_1", "shop_2", "shop_3"];
  const result =
    characters.at(Math.floor(Math.random() * characters.length)) ||
    characters[0];
  return result;
}

export function getRandomId(length: number): string {
  const characters = "0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomPrice(): string {
  return (Math.random() * 1000).toFixed(2);
}
export function getRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function generateRandomGoods() {
  return {
    sku_name: `SKU-${getRandomString(5)}`,
    sku_id: getRandomId(8),
    shop_name: getRandomShop(),
    final_price: getRandomNumber(100, 150).toString(),
    jd_price: getRandomPrice(),
    detail: `Detail about the product ${getRandomString(10)}`,
    source: `Source-${getRandomString(4)}`,
    update_time: getRandomDate(new Date(2025, 0, 1), new Date()),
  };
}

async function main() {
  await prisma.goods.deleteMany({});
  const goodses = [];
  for (let i = 0; i < 100; i++) {
    const g = generateRandomGoods();
    goodses.push(g);
  }
  console.log(`seed goods ${goodses.length}`);
  await seedGoods(goodses);
  //await updateGoods();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  });
