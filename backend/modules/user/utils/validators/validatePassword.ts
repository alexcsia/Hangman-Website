import validator from "validator";
import { ApiError } from "../../../../errors/ApiError";

export const validatePassword = (password: string): string => {
  if (
    !validator.isStrongPassword(password, {
      minLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    throw new ApiError(400, "Password not strong enough");
  }
  if (!validator.isLength(password, { min: 10, max: 64 })) {
    throw new ApiError(400, "Password cannot exceed 64 characters");
  }

  return password;
};
