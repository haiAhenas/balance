import React from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
};

const Mybutton: React.FC<Props> = ({
  title,
  onPress,
  backgroundColor = '#007AFF',
  textColor = '#fff',
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? '#005BBB' : backgroundColor },
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    margin: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Mybutton;
