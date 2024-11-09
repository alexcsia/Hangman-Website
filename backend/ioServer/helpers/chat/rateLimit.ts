const MESSAGE_LIMIT = 5;
const TIME_WINDOW = 5000;

export const rateLimit = (
  socket: any,
  messageCounts: Map<string, { count: number; timer: NodeJS.Timeout }>
) => {
  const socketId = socket.id;

  if (!messageCounts.has(socketId)) {
    messageCounts.set(socketId, {
      count: 1,
      timer: setTimeout(() => messageCounts.delete(socketId), TIME_WINDOW),
    });
    return false;
  } else {
    const userData = messageCounts.get(socketId)!;
    userData.count += 1;

    if (userData.count > MESSAGE_LIMIT) {
      socket.emit("rate error", "Rate limit exceeded, please wait.");
      return true;
    }
  }
  return false;
};
