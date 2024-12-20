import { Response } from "express";
import { IAuthenticatedRequest } from "../../types/IAuthenticatedRequest";
import { getSanitizedUser } from "../services/getSanitizedUser";
import { ApiError } from "../../../errors/ApiError";

/**
 * Controller function to retrieve a user's profile
 *
 * This function checks if the authenticated user has permission to access the requested profile. It compares
 * the userId in the request parameters with the userId extracted from the JWT payload. If they match, it
 *  retrieves user data from the database and returns the data with a 200 status. If the user IDs
 * do not match, it sends a 403 status response indicating access is denied
 *
 * @param req - The incoming request object, expected to include userId in the parameters and an authenticated user object
 * @param res - The response object used to send the retrieved user profile data or an error message
 * @returns A JSON response with the user's profile data upon success, or an error message in case of failure
 */

export const getUserProfile = async (
  req: IAuthenticatedRequest,
  res: Response
) => {
  const userIdFromParams = req.params.userId;
  const userIdFromToken = req.user?.id;

  if (userIdFromParams !== userIdFromToken) {
    throw new ApiError(
      403,
      "You do not have permission to access this profile."
    );
  }

  try {
    const userData = await getSanitizedUser(userIdFromParams);
    return res.status(200).json(userData);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Could not retrieve user data");
  }
};
