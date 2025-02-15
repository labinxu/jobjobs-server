import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  result: {
    goods: {
      update_time: {
        needs: {},
        compute: (goods) => goods.update_time || new Date(),
      },
    },
  },
});

export default prisma;
