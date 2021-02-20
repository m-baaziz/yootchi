import { Message } from "../types/chat";

export async function sendMessage(message: Message): Promise<void> {
  console.log("sending message: ", message);
  return Promise.resolve();
}
