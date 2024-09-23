import { User, IUser } from "../model.ts";

//TODO: add hashing to password + encode +sanitize etc
export const addUser = async (userData: IUser) => {
  const { username, email, password } = userData;
  const newUser = new User({ username, email, password });
  await newUser.save();
};
