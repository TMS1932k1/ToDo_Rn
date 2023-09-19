import {Dimensions, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import AnotherLoginButton from './AnotherLoginButton';
import {MyColors, MyImage} from '../../constants';

const width = Dimensions.get('screen').width;

interface Props {
  styleContainer?: StyleProp<ViewStyle>;
  signInGoogle?: () => void;
}

export default function AnotherLogin({styleContainer, signInGoogle}: Props) {
  return (
    <View style={styleContainer}>
      <AnotherLoginButton imageIcon={MyImage.imgGoogle} onPress={signInGoogle}>
        Login with Google
      </AnotherLoginButton>
    </View>
  );
}

const styles = StyleSheet.create({
  formInputContainer: {
    width: width * 0.7,
    maxWidth: 320,
  },
  marginTopMediumContainer: {
    marginTop: 12,
  },
  titleText: {
    color: MyColors.primary,
  },
});
