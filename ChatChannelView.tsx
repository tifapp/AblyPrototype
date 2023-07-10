import {
  StyleProp,
  ViewStyle,
  Text,
  FlatList,
  View,
  SafeAreaView,
} from "react-native";
import { ChannelInputView } from "./ChannelInput";
import { useChannelMessages } from "./ably";

export type ChannelChatProps = {
  name: string;
  style?: StyleProp<ViewStyle>;
};

export const ChannelChatView = ({ name, style }: ChannelChatProps) => {
  const messages = useChannelMessages(name);
  return (
    <View style={style}>
      <SafeAreaView
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        <FlatList
          style={[style, { marginBottom: 130 }]}
          data={messages}
          renderItem={({ item }) => (
            <View>
              {item.data.map((message: string, index: number) => (
                <Text key={`${item.timestamp}-${index}`}>{message}</Text>
              ))}
            </View>
          )}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <ChannelInputView
            name={name}
            style={{ paddingHorizontal: 16, marginBottom: 70, marginTop: 16 }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
