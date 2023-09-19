import {Pressable, StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import {ReactNode} from 'react';
import {globalStyle} from '../../styles/global';

interface Props {
  children: ReactNode;
  styleText?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export default function TextButton({children, styleText, onPress}: Props) {
  return (
    <Pressable
      style={({pressed}) => [(pressed || !onPress) && globalStyle.press]}
      onPress={onPress}>
      <Text style={[globalStyle.labelSmall, styleText]}>{children}</Text>
    </Pressable>
  );
}
