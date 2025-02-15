import prisma from "@/lib/API/Services/init/prisma";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await prisma.account.findFirst({
      where: { userId },
    });

    return account;
  } catch (error) {
    console.log(error);
    return null;
  }
};
