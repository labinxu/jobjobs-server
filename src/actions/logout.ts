"use server";

import { signOut } from "@/auth";
import { deleteSession } from "@/lib/session";

export const logout = async () => {
  // some server stuff
  await signOut();
  await deleteSession();
};
