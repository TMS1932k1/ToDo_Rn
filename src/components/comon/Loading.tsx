import {
  StyleProp,
  View,
  ViewStyle,
  ActivityIndicator,
  ColorValue,
} from 'react-native';
import {globalStyle} from '../../styles/global';
import {MyColors} from '../../constants';

interface Props {
  style?: StyleProp<ViewStyle>;
  size?: number | 'large' | 'small' | undefined;
  color?: ColorValue;
}

export default function Loading({style, size, color}: Props) {
  return (
    <View style={[globalStyle.centerContainer, style]}>
      <ActivityIndicator size={size} color={color ?? MyColors.primary} />
    </View>
  );
}
