import prisma from "@/lib/API/Services/init/prisma";
export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findUnique({
      where: { token },
    });

    return twoFactorToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });

    return twoFactorToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
