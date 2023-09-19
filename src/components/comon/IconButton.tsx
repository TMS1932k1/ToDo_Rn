import {
  ColorValue,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {MyColors} from '../../constants';
import {globalStyle} from '../../styles/global';

interface Props {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  size?: number;
  color?: number | ColorValue | undefined;
  icon: string;
}

export default function IconButton({style, onPress, size, color, icon}: Props) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        style,
        pressed && globalStyle.press,
      ]}
      onPress={onPress}>
      <Icon name={icon} size={size ?? 30} color={color ?? MyColors.primary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
});
