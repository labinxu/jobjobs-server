import { PrismaClient } from "@prisma/client";
import ObjectId from "bson-objectid";
const prisma = new PrismaClient();
function stringToObjectId(idString: string): ObjectId | null {
  try {
    // Check if the string is a valid ObjectId
    if (!ObjectId.isValid(idString)) {
      console.error("Invalid ObjectId string:", idString);
      return null; // Or throw an error, depending on your use case
    }

    const objectId = new ObjectId(idString);
    return objectId;
  } catch (error) {
    console.error("Error converting string to ObjectId:", error);
    return null; // Or throw an error
  }
}
async function main() {
  const idString = "67ab632c08e94cac278a501467ab5fc5844591e148491d8a";
  const result = ObjectId.isValid(
    "67ab632c08e94cac278a501467ab5fc5844591e148491d8a",
  );
  console.log(result);
  const obid = stringToObjectId(idString);
  const res = obid && ObjectId.isValid(obid);

  console.log(res);
  const tasks = await prisma.task.findMany({
    where: {
      userId: obid?.toHexString(),
    },
  });

  console.log(tasks);
  console.dir(tasks, { depth: Infinity });
}
main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
