import { StyleProp, ViewStyle, Text } from "react-native";

export type ChatChannelProps = {
  name: string;
  style?: StyleProp<ViewStyle>;
};

export const ChatChannelView = ({ name, style }: ChatChannelProps) => {
  return <Text style={style}>{name} chat</Text>;
};
