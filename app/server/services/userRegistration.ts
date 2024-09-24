import { User, IUser } from "../model.ts";
import bcrypt from "bcrypt";
import validator from "validator";

export const addUser = async (userData: IUser) => {
  try {
    const username = userData.username.trim();
    const email = userData.email.trim();
    const password = userData.password;

    const sanitizedUsername = validator.escape(username);

    const sanitizedEmail = validator.normalizeEmail(email) || email;
    if (!validator.isEmail(sanitizedEmail)) {
      throw new Error("Invalid email format");
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 10,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      throw new Error("Password not strong enough");
    }

    console.log(sanitizedEmail, sanitizedUsername, password);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: sanitizedUsername,
      email: sanitizedEmail,
      password: hashedPassword,
    });
    await newUser.save();
  } catch (error: any) {
    throw new Error(error.message || "Could not save user");
  }
};
