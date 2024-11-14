import { rematchCounts } from "../../../types";

export const isRematchReady = (lobbyId: string): boolean => {
  return rematchCounts[lobbyId]?.size === 2;
};
