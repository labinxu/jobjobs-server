import prisma, { Prisma } from "@/lib/API/Services/init/prisma";
import { stringToObjectId } from "@/lib/utils/helpers";
export const getTasksByUserId = async (userId: string | undefined) => {
  if (!userId) return [];
  try {
    const objUserId = stringToObjectId(userId);
    if (!objUserId) {
      console.log(`invalid userId`);
    }
    const tasks = await prisma.task.findMany({
      where: { userId: objUserId?.toHexString() },
    });
    return tasks;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const QueryTasksForUserPagination = async ({
  page,
  size,
  userId,
}: {
  page: number;
  size: number;
  userId: string;
}) => {
  console.log(`query task page:${page},size:${size} userId:${userId}`);
  try {
    const objUserId = stringToObjectId(userId);
    if (!objUserId) {
      console.log(`invalid userId`);
    }
    const [total, tasks] = await prisma.$transaction([
      prisma.task.count({ where: { userId: objUserId?.toHexString() } }),
      prisma.task.findMany({
        where: {
          userId: objUserId?.toHexString(),
        },
        skip: size * page,
        take: size,
      }),
    ]);

    // const total = await prisma.task.count({
    //   where: { userId: objUserId?.toHexString() },
    // });
    // const tasks = await prisma.task.findMany({
    //   where: { userId: objUserId?.toHexString() },
    //   skip: size * page,
    //   take: size,
    // });
    return { page, size, total, rowData: tasks };
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getTasksForUser = async (userId: string) => {
  console.log(`get task by userId ${userId}`);
  const objUserId = stringToObjectId(userId);
  if (!objUserId) {
    console.log(`invalid userId`);
  }

  try {
    const ret = await prisma.task.findFirst();
    return [ret];
    const tasks = await prisma.task.findMany({
      where: {
        userId: { equals: userId },
      },
    });
    console.log("Tasks for user:", tasks);
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks for user:", error);
    throw error;
  } finally {
  }
};
export async function CreateTask(
  userId: string,
  taskData: Prisma.TaskCreateInput,
) {
  const objId = stringToObjectId(userId);
  const newTask = await prisma.user.update({
    where: {
      id: objId?.toHexString(),
    },
    data: {
      tasks: {
        create: [{ ...taskData }],
      },
    },
  });
  return newTask;
}
export async function DeleteTask(taskData: Prisma.TaskCreateInput) {
  console.log(`Delete task: ${taskData.id}`);
  if (taskData.id) {
    const objId = stringToObjectId(taskData.id);
    console.log(`task objid ${objId?.toHexString()}`);
    await prisma.task.delete({
      where: {
        id: objId?.toHexString(),
      },
    });
  }
}
