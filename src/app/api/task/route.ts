import { auth } from "@/auth";
import {
  CreateTask,
  DeleteTask,
  QueryTasksForUserPagination,
} from "@/actions/task";
export const GET = auth(async (req) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "0");
  const size = parseInt(searchParams.get("size") || "20");
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
  }
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }
  console.log("get task", userId);

  if (req.auth) {
    const query = {
      page,
      size,
      userId,
    };
    const result = await QueryTasksForUserPagination(query);
    //const tasks = await getTasksByUserId(userId);
    return Response.json(result);
  }

  return Response.json({ message: "Not authenticated" }, { status: 401 });
});
export const POST = auth(async (req) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId)
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  try {
    if (req.auth) {
      const data = await req.json();
      console.log("received taskdata", data);
      const task = await CreateTask(userId, data);
      return Response.json(task);
    }
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  } catch (err) {
    console.log(err);
  }
});
export const DELETE = auth(async (req) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId)
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  try {
    if (req.auth) {
      const data = await req.json();

      console.log("received delete taskdata", data);
      await DeleteTask(data);
      return Response.json({ message: "Task delete successfully." });
    }
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  } catch (err) {
    console.log(err);
  }
});
