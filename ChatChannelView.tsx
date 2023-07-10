import { StyleProp, ViewStyle, Text } from "react-native";
import { ChannelInputView } from "./ChannelInput";

export type ChatChannelProps = {
  name: string;
  style?: StyleProp<ViewStyle>;
};

export const ChatChannelView = ({ name, style }: ChatChannelProps) => {
  return <ChannelInputView name={name} style={style} />;
};
