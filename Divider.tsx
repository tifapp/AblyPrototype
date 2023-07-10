import { StyleProp, View, ViewStyle } from "react-native";

export type DividerProps = {
  style?: StyleProp<ViewStyle>;
};

export const Divider = ({ style }: DividerProps) => (
  <View
    style={[style, { width: "100%", height: 1, backgroundColor: "gray" }]}
  />
);
