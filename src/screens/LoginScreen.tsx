import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {globalStyle} from '../styles/global';
import {
  AnotherLogin,
  ElevationButton,
  InputField,
  Loading,
  TextButton,
} from '../components';
import {MyColors} from '../constants';
import {regexEmail, regexPassword} from '../utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootNavigatorParams} from '../navigations/RootNavigator';
import {useAppSelector, useAppDispatch} from '../stores/store';
import {useState, useEffect} from 'react';
import {loginEmailPassword, loginGoogle} from '../stores/redux/auth_slice';

const width = Dimensions.get('screen').width;

interface Props {
  navigation: NativeStackNavigationProp<RootNavigatorParams, 'LoginScreen'>;
}

export default function LoginScreen({navigation}: Props) {
  const isLoading = useAppSelector(state => state.authState.isLoading);
  const dispatch = useAppDispatch();

  // Email value and Password value
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Condition to login auth
  const [isInvalid, setInvalid] = useState(false);
  const [isFillOut, setFillOut] = useState(false);

  useEffect(() => {
    if (
      (email.length <= 0 && password.length <= 0) ||
      (regexEmail(email) && regexPassword(password))
    ) {
      setInvalid(false);
    } else {
      setInvalid(true);
    }

    if (email.length > 0 && password.length > 0) {
      setFillOut(true);
    } else {
      setFillOut(false);
    }
  }, [email, password]);

  function handleLogin() {
    dispatch(loginEmailPassword({email, password}));
  }

  function signInGoogle() {
    dispatch(loginGoogle());
  }

  function onChangeEmail(textEmail: string) {
    setEmail(textEmail);
  }

  function onChangePassword(textPassword: string) {
    setPassword(textPassword);
  }

  function navigateRegister() {
    navigation?.navigate('RegisterScreen');
  }

  return (
    <View style={styles.container}>
      <View style={styles.formInputContainer}>
        <Text style={[globalStyle.labelLarge, styles.titleText]}>LOGIN</Text>
        <Text style={[globalStyle.bodySmall, styles.subtileText]}>
          Sign in with your email
        </Text>
        <View style={globalStyle.marginTopMediumContainer}>
          <InputField
            placeHolder="Email"
            keyboardType="email-address"
            onChange={onChangeEmail}
          />
          <InputField
            placeHolder="Password"
            secureTextEntry={true}
            onChange={onChangePassword}
          />
        </View>
        <View
          style={[
            globalStyle.centerContainer,
            globalStyle.marginTopSmallContainer,
          ]}>
          <TextButton
            onPress={navigateRegister}
            styleText={[globalStyle.bodySmall, styles.titleText]}>
            Do you want to sign up?
          </TextButton>
        </View>
        {!isLoading && (
          <View style={globalStyle.marginTopLargeContainer}>
            {isInvalid && (
              <View style={globalStyle.centerContainer}>
                <Text style={[globalStyle.bodySmall, styles.errorText]}>
                  Input is invalid!
                </Text>
              </View>
            )}
            {!isInvalid && isFillOut && (
              <ElevationButton
                onPress={handleLogin}
                styleButton={globalStyle.marginTopSmallContainer}>
                Login
              </ElevationButton>
            )}
            {(isInvalid || !isFillOut) && (
              <ElevationButton
                styleButton={[globalStyle.marginTopSmallContainer]}>
                Login
              </ElevationButton>
            )}
            <AnotherLogin
              styleContainer={globalStyle.marginTopMediumContainer}
              signInGoogle={signInGoogle}
            />
          </View>
        )}
        {isLoading && (
          <Loading style={globalStyle.marginTopLargeContainer} size="large" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formInputContainer: {
    width: width * 0.8,
    maxWidth: 320,
  },
  titleText: {
    color: MyColors.primary,
  },
  subtileText: {
    color: MyColors.onSuface,
  },
  errorText: {
    color: MyColors.error,
  },
});
