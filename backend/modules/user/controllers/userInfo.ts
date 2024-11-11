import { Request, Response } from "express";
import { IAuthenticatedRequest } from "../../types/IAuthenticatedRequest";

/**
 * Controller function to retrieve the authenticated user's basic information
 *
 * This function checks if the request contains a valid authenticated user. If no user is found, a 401 Unauthorized
 * response is returned. If the user is authenticated, it proceeds to send a 200 response with the user's `id`,
 * `username`, and `email`. In case of any internal error, a 500 response is returned
 *
 * @param req - The incoming request object containing the authenticated user in `req.user`
 * @param res - The response object used to send the user's information or an error message
 * @returns A JSON response containing the authenticated user's details or an error message
 */

export const getUserInfo = async (
  req: IAuthenticatedRequest,
  res: Response
) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};
