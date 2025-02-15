import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface DuplicateDocument {
  _id: { shop_name: string; update_time: Date };
  ids: string[];
  count: number;
}

const removeDuplicates = async () => {
  try {
    // Step 1: Find duplicates
    const duplicatesResult = (await prisma.$runCommandRaw({
      aggregate: "Goods",
      pipeline: [
        {
          $group: {
            _id: {
              shop_name: "$shop_name",
              update_date: {
                $dateToString: { format: "%Y-%m-%d", date: "$update_time" },
              },
            },

            ids: { $addToSet: "$_id" },
            count: { $sum: 1 },
          },
        },
        {
          $match: {
            count: { $gt: 1 },
          },
        },
      ],
      cursor: {},
    })) as unknown as { cursor: { firstBatch: DuplicateDocument[] } };

    const duplicates = duplicatesResult.cursor.firstBatch;

    // Step 2: Remove duplicates, keeping the first occurrence
    for (const doc of duplicates) {
      const idsToDelete = doc.ids.slice(1); // Keep the first ID and get the rest for deletion
      await prisma.$runCommandRaw({
        delete: "Goods",
        deletes: [
          {
            q: { _id: { $in: idsToDelete } },
            limit: 0,
          },
        ],
      });
    }

    console.log("Duplicates removed");
  } catch (err) {
    console.error("Error removing duplicates:", err);
  } finally {
    await prisma.$disconnect();
  }
};

removeDuplicates().then(() => {});
