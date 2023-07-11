import {
  StyleProp,
  ViewStyle,
  Text,
  FlatList,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { ChannelInputView } from "./ChannelInput";
import { useChannelMessageHistory, useChannelMessages, useYouId } from "./ably";
import { ChatMessage } from "./ChatMessage";
import { ChannelChatMessageView } from "./ChannelChatMessage";
import Ably from "ably";

export type ChannelChatProps = {
  name: string;
  style?: StyleProp<ViewStyle>;
};

export const ChannelChatView = ({ name, style }: ChannelChatProps) => {
  const messages = useChannelChatMessages(name);
  return (
    <View style={style}>
      <SafeAreaView
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        <FlatList
          style={[style, { marginBottom: 130 }]}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChannelChatMessageView
              message={item}
              style={{ paddingVertical: 2, marginHorizontal: 8 }}
            />
          )}
        />
        <KeyboardAvoidingView
          behavior="padding"
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
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const useChannelChatMessages = (name: string) => {
  const youId = useYouId();
  const history = useChannelMessageHistory(name, 100);
  const messages = useChannelMessages(name);
  return [...history, ...messages].reduce((acc, curr) => {
    const isSameSender =
      acc.length > 0 && acc[acc.length - 1].userId === curr.connectionId;
    if (isSameSender) {
      acc[acc.length - 1].isShowingProfile = false;
    }
    const messages = curr.data.map((message: string, index: number) => ({
      id: `${curr.id}-${index}`,
      userId: curr.connectionId,
      text: message,
      isYou: curr.connectionId === youId,
      isShowingProfile: index === curr.data.length - 1,
    })) as ChatMessage[];
    return [...acc, ...messages];
  }, [] as ChatMessage[]);
};
