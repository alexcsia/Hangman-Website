import { User } from "../../modules/models/User.ts";

const addWinToUser = async (playerId: string) => {
  const user = await User.findById(playerId);
  if (user) {
    user.winNum = user.winNum.valueOf() + 1;
    await user.save();
  }
};

export default addWinToUser;
