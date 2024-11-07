import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error hashing password:", error.message);
      throw new Error("Failed to hash password");
    }
  }
};
