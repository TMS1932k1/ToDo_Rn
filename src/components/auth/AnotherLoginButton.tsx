import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {MyColors} from '../../constants';
import {globalStyle} from '../../styles/global';
import {ReactNode} from 'react';

interface Props {
  children: ReactNode;
  imageIcon: ImageSourcePropType;
  styleButton?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export default function AnotherLoginButton({
  children,
  imageIcon,
  styleButton,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.buttonContainer,
        styleButton,
        (pressed || !onPress) && globalStyle.press,
      ]}>
      <View style={styles.rowContainer}>
        <View>
          <Image source={imageIcon} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={globalStyle.bodyMedium}>{children}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 12,
    height: 50,
    width: '100%',
    borderRadius: 25,
    borderColor: MyColors.primary,
    borderWidth: 1,
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 25,
    width: 25,
    resizeMode: 'cover',
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
