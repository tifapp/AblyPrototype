import React from "react";
import {
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export type ChannelHeaderProps = {
  name: string;
  onClosed: () => void;
  style?: StyleProp<ViewStyle>;
};

export const ChannelHeaderView = ({
  name,
  onClosed,
  style,
}: ChannelHeaderProps) => (
  <View style={style}>
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={onClosed}>
        <Ionicons
          name="close-circle"
          size={24}
          color="black"
          style={{ opacity: 0.5 }}
        />
      </TouchableOpacity>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{name}</Text>
      <View />
    </View>
  </View>
);
