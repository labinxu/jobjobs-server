import { auth } from "@/auth";
import {
  QueryGoodsForUserPagination,
  queryGoodsByDateRange,
} from "@/actions/goods";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method === "POST") {
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
  console.log(req.method);

  try {
    res.status(200).json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ message: "failed to load data" });
  }
}

export const testget = async (req) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "0");
  const size = parseInt(searchParams.get("size") || "20");
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  console.log(`1 start:${start} end:${end}`);
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
  }
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }
  if (start != "undefined" && end != "undefined") {
    console.log(`2 start:${start} end:${end}`);

    const startDate = new Date(start);
    const endDate = new Date(end);
    const query = {
      page,
      size,
      userId,
      startDate,
      endDate,
    };
    const result = await queryGoodsByDateRange(query);
    return Response.json(result);
  } else {
    const query = {
      page,
      size,
      userId,
    };
    const result = await QueryGoodsForUserPagination(query);
    return Response.json(result);
  }
};
