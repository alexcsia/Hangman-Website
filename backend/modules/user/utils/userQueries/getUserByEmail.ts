import { User, IUser } from "../../../models/User";

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  const user = await User.findOne({ email });
  return user;
};
