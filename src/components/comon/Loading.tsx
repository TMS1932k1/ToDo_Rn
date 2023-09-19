import {StyleProp, View, ViewStyle, ActivityIndicator} from 'react-native';
import {globalStyle} from '../../styles/global';
import {MyColors} from '../../constants';

interface Props {
  style?: StyleProp<ViewStyle>;
  size?: number | 'large' | 'small' | undefined;
}

export default function Loading({style, size}: Props) {
  return (
    <View style={[globalStyle.centerContainer, style]}>
      <ActivityIndicator size={size} color={MyColors.primary} />
    </View>
  );
}
