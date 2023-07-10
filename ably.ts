import { useState, useEffect } from "react";
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
