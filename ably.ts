import { useState, useEffect, useMemo } from "react";
import Ably from "ably";
import { ABLY_API_KEY } from "./secrets";

const CHAT_MESSAGE_EVENT_NAME = "chat-message";

const ably = new Ably.Realtime.Promise(ABLY_API_KEY);

export const useIsConnectedToAbly = () => {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    const connect = async () => {
      await ably.connection.once("connected");
      setIsConnected(true);
    };
    connect();
    return ably.close;
  }, []);
  return isConnected;
};

export const useChannel = (name: string) => {
  return useMemo(() => ably.channels.get(name), [name]);
};

export const useLatestChannelMessage = (name: string) => {
  const [message, setMessage] = useState<Ably.Types.Message | undefined>();

  useEffect(() => {
    const listen = async () => {
      await ably.channels
        .get(name)
        .subscribe(CHAT_MESSAGE_EVENT_NAME, setMessage);
    };
    listen();
  });

  return message;
};

class ChunkedMessageSender {
  private readonly channel: Ably.Types.RealtimeChannelPromise;
  private queuedMessages = [] as string[];
  private timeoutId?: NodeJS.Timeout;

  constructor(channel: Ably.Types.RealtimeChannelPromise) {
    this.channel = channel;
  }

  send(message: string) {
    this.queuedMessages.push(message);
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(async () => {
      await this.channel.publish(CHAT_MESSAGE_EVENT_NAME, this.queuedMessages);
      this.queuedMessages = [];
    }, 500);
  }
}

export const useChannelMessageSender = (name: string) => {
  return useMemo(
    () => new ChunkedMessageSender(ably.channels.get(name)),
    [name]
  );
};

export const CHANNEL_NAMES = [
  "5K Setup",
  "Wrestling Tournament",
  "Group Hike",
  "Secret Mystery Event",
];

export const channelColor = (name: string) => {
  if (name === CHANNEL_NAMES[0]) return "green";
  if (name === CHANNEL_NAMES[1]) return "red";
  if (name === CHANNEL_NAMES[2]) return "blue";
  return "orange";
};
