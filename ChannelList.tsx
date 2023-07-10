import {
  StyleProp,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import { CHANNEL_NAMES } from "./ably";
import { ChannelPreviewView } from "./ChannelPreview";
import { useState } from "react";
import { ChatChannelView } from "./ChatChannelView";
import { Divider } from "./Divider";
import { ChannelHeaderView } from "./ChannelHeader";

export type ChannelListProps = {
  style?: StyleProp<ViewStyle>;
};

export const ChannelListView = ({ style }: ChannelListProps) => {
  const [presentedChannel, setPresentedChannel] = useState<
    string | undefined
  >();
  return (
    <View style={style}>
      <Text
        style={{
          fontSize: 34,
          fontWeight: "bold",
          marginBottom: 24,
          paddingHorizontal: 16,
        }}
      >
        Channels
      </Text>
      {CHANNEL_NAMES.map((name) => (
        <TouchableOpacity key={name} onPress={() => setPresentedChannel(name)}>
          <ChannelPreviewView name={name} style={{ marginHorizontal: 16 }} />
          <Divider style={{ marginVertical: 16 }} />
        </TouchableOpacity>
      ))}
      <Modal
        animationType="slide"
        visible={!!presentedChannel}
        onRequestClose={() => {
          setPresentedChannel(undefined);
        }}
      >
        <SafeAreaView>
          {presentedChannel && (
            <>
              <ChannelHeaderView
                name={presentedChannel}
                onClosed={() => setPresentedChannel(undefined)}
                style={{ paddingHorizontal: 16 }}
              />
              <ChatChannelView
                name={presentedChannel}
                style={{ marginTop: 24 }}
              />
            </>
          )}
        </SafeAreaView>
      </Modal>
    </View>
  );
};
