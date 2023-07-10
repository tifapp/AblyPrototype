import { useState } from "react";
import {
  Pressable,
  StyleProp,
  View,
  ViewStyle,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ContentText } from "./ContentText";
import { useChannelMessageSender } from "./ably";

export type ChannelInputProps = {
  name: string;
  style?: StyleProp<ViewStyle>;
};

export const ChannelInputView = ({ name, style }: ChannelInputProps) => {
  const messageSender = useChannelMessageSender(name);
  const [text, setText] = useState("");
  const [isEventOver, setIsEventOver] = useState(false);
  return (
    <View style={style}>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Pressable onPress={() => setIsEventOver((isOver) => !isOver)}>
          <Ionicons
            name={
              isEventOver ? "information-circle" : "ellipsis-horizontal-sharp"
            }
            size={24}
            color="black"
            style={{ opacity: 0.5, marginRight: 16 }}
          />
        </Pressable>
        {isEventOver ? (
          <Text style={{ flex: 1, opacity: 0.5 }}>
            This event has ended. You can still read messages, but you cannot
            send messages.
          </Text>
        ) : (
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 12,
            }}
          >
            <TextInput
              style={{ flex: 1, padding: 8 }}
              placeholder="Enter a message..."
              onChangeText={setText}
            >
              <ContentText text={text} />
            </TextInput>
            <TouchableOpacity
              onPress={() => {
                messageSender.send(text);
                setText("");
              }}
            >
              <Ionicons
                name="send"
                size={24}
                color="black"
                style={{ opacity: 0.5, padding: 8 }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
