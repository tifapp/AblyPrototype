import { useState, useEffect, useMemo } from "react";
import Ably from "ably";
import { ABLY_API_KEY } from "./secrets";

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
