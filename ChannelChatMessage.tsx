import { StyleProp, View, ViewStyle } from "react-native";
import { ChatMessage } from "./ChatMessage";
import { ContentText } from "./ContentText";

export type ChannelChatMessageProps = {
  message: ChatMessage;
  style?: StyleProp<ViewStyle>;
};

export const ChannelChatMessageView = ({
  message,
  style,
}: ChannelChatMessageProps) => (
  <View style={style}>
    <View
      style={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}
    >
      {message.isYou ? (
        <>
          <View style={{ flex: 1 }} />
          <MessageTextView {...message} />
          <CircleView {...message} />
        </>
      ) : (
        <>
          <CircleView {...message} />
          <MessageTextView {...message} />
        </>
      )}
    </View>
  </View>
);

type MessageTextProps = {
  text: string;
  isYou: boolean;
};

const MessageTextView = ({ text, isYou }: MessageTextProps) => (
  <View
    style={{
      borderRadius: 12,
      backgroundColor: isYou ? "#f5f4f2" : "#fff170",
      marginHorizontal: 4,
      maxWidth: "75%",
    }}
  >
    <ContentText text={text} style={{ padding: 16 }} />
  </View>
);

type CircleProps = {
  isShowingProfile: boolean;
  isYou: boolean;
};

const CircleView = ({ isShowingProfile, isYou }: CircleProps) => {
  const initialColor = isShowingProfile ? "red" : "transparent";
  const color = isYou && isShowingProfile ? "purple" : initialColor;
  return (
    <View
      style={{
        width: 32,
        height: 32,
        borderRadius: 128,
        backgroundColor: color,
        marginHorizontal: 4,
      }}
    />
  );
};
