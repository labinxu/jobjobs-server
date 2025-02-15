import prisma from "@/lib/API/Services/init/prisma";
import { stringToObjectId } from "@/lib/utils/helpers";
export interface IGoodsQueryRange {
  page: number;
  size: number;
  userId: string;
  startDate: Date;
  endDate: Date;
}
export interface IGoodsQuery {
  page: number;
  size: number;
  userId: string;
}
export async function GetGoods() {
  const goods = prisma.goods.findMany({});
  return goods;
}
export const queryGoodsByDateRange = async ({
  page,
  size,
  userId,
  startDate,
  endDate,
}: IGoodsQueryRange) => {
  try {
    const objUserId = stringToObjectId(userId);
    if (!objUserId) {
      console.log(`invalid userId`);
    }

    const task = await prisma.task.findFirst({
      where: { userId: objUserId?.toHexString() },
    });
    if (!task) {
      console.log(`no task found ${userId}`);
      return [];
    }
    const [total, goods] = await prisma.$transaction([
      prisma.goods.count({ where: { taskId: task.id } }),
      prisma.goods.findMany({
        where: {
          taskId: task.id,
          update_time: { gte: startDate, lte: endDate },
        },
        skip: size * page,
        take: size,
        orderBy: { update_time: "asc" },
      }),
    ]);
    console.info(`queried data :${goods.length}`);
    return { page, size, total, rowData: goods };
  } catch (error) {
    console.error("Error querying goods by date range:", error);
    return { page, size, total: 0, rowData: [] };
  }
};

export const QueryGoodsForUserPagination = async ({
  page,
  size,
  userId,
}: IGoodsQuery) => {
  console.log(`QueryGoodsForUserPagination query goods ${page},size:${size}`);
  try {
    const objUserId = stringToObjectId(userId);
    if (!objUserId) {
      console.log(`invalid userId`);
    }

    const task = await prisma.task.findFirst({
      where: { userId: objUserId?.toHexString() },
    });
    if (!task) {
      console.log(`no task found ${userId}`);
      return [];
    }
    const [total, goods] = await prisma.$transaction([
      prisma.goods.count({ where: { taskId: task.id } }),
      prisma.goods.findMany({
        where: {
          taskId: task.id,
        },
        skip: size * page,
        take: size,
        orderBy: { update_time: "asc" },
      }),
    ]);

    console.log(`count total ${total} taskId:${task.id}`);
    return { page, size, total, rowData: goods };
  } catch (error) {
    console.log(error);
    return [];
  }
};
