import { StyleProp, View, ViewStyle, Text } from "react-native";
import { channelColor } from "./ably";

export type ChannelPreviewProps = {
  name: string;
  style?: StyleProp<ViewStyle>;
};

export const ChannelPreviewView = ({ name, style }: ChannelPreviewProps) => {
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
        <Text style={{ opacity: 0.5, marginTop: 4 }}>
          Lorem Ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </View>
    </View>
  );
};
