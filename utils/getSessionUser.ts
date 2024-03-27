import { getServerSession } from "next-auth";
import { SessionUser, authOptions } from "@/utils/authOptions";

export const getSessionUser = async (): Promise<SessionUser | null> => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return null;
    } else {
      return {
        id: (session.user as SessionUser).id,
        name: session.user,
        email: session.user.email,
        image: session.user.image,
      } as SessionUser;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
