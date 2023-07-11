import { StyleProp, View, ViewStyle, Text } from "react-native";
import {
  channelColor,
  useChannelMessageHistory,
  useLatestChannelMessage,
} from "./ably";
import Ably from "ably";
import { ContentText } from "./ContentText";

export type ChannelPreviewProps = {
  name: string;
  style?: StyleProp<ViewStyle>;
};

export const ChannelPreviewView = ({ name, style }: ChannelPreviewProps) => {
  const history = useChannelMessageHistory(name, 25);
  const latestMessage =
    useLatestChannelMessage(name) ?? history[history.length - 1];
  return (
    <View
      style={[
        style,
        { display: "flex", flexDirection: "row", alignItems: "center" },
      ]}
    >
      <View
        style={{
          backgroundColor: channelColor(name),
          width: 44,
          height: 44,
          borderRadius: 128,
          marginRight: 16,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{name}</Text>
        {latestMessage && (
          <ContentText
            text={latestMessage.data[latestMessage.data.length - 1]}
            numberOfLines={2}
            style={{ opacity: 0.5, marginTop: 4 }}
          />
        )}
      </View>
    </View>
  );
};
