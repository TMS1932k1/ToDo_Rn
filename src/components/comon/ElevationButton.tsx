import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {ReactNode} from 'react';
import {MyColors} from '../../constants';
import {globalStyle} from '../../styles/global';

interface Props {
  children: ReactNode;
  styleButton?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export default function ElevationButton({
  children,
  styleButton,
  styleText,
  onPress,
}: Props) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.buttonContainer,
        styleButton,
        (pressed || !onPress) && globalStyle.press,
      ]}
      onPress={onPress}>
      <Text style={[globalStyle.labelSmall, styles.text, styleText]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    height: 50,
    width: '100%',
    backgroundColor: MyColors.primary,
    borderRadius: 25,
  },
  text: {
    color: MyColors.background,
  },
});
