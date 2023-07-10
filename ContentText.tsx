import React, { useMemo } from "react";
import { StyleSheet, TextProps, Text } from "react-native";
import { linkify } from "./linkify";
import { Match } from "linkify-it";

export type ContentTextProps = {
  text: string;
} & Omit<TextProps, "children">;

export const ContentText = ({ text, ...props }: ContentTextProps) => (
  <Text {...props} testID="regular-text">
    {useTextBlocks(text)}
  </Text>
);

const useTextBlocks = (text: string) => {
  return useMemo(() => renderLinkTextBlocks(text), [text]);
};

const renderLinkTextBlocks = (text: string) => {
  const matches = linkify.match(text);
  if (!matches) return [text];
  return renderLinkifyMatches(text, matches);
};

const renderLinkifyMatches = (text: string, matches: Match[]) => {
  const blocks = [];
  let anchorIndex = 0;
  for (const match of matches) {
    const isHandleMatch = match.schema === "@";
    blocks.push(text.substring(anchorIndex, match.index));

    if (isHandleMatch) {
      blocks.push(
        <Text key={`handle-${match.index}`} style={styles.handle}>
          {match.text}
        </Text>
      );
    } else {
      blocks.push(
        <Text key={`url-${match.index}`} style={styles.link}>
          {match.text}
        </Text>
      );
    }
    anchorIndex = match.lastIndex;
  }
  blocks.push(text.substring(anchorIndex));
  return blocks;
};

const styles = StyleSheet.create({
  link: {
    color: "#4285F4",
    textDecorationLine: "underline",
  },
  handle: {
    color: "#4285F4",
    fontWeight: "bold",
  },
});
