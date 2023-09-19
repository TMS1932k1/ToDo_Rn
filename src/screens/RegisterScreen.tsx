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
import {useEffect, useState} from 'react';
import {regexEmail, regexPassword} from '../utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootNavigatorParams} from '../navigations/RootNavigator';
import {useAppDispatch, useAppSelector} from '../stores/store';
import {loginGoogle, registerEmailPassword} from '../stores/redux/auth_slice';

const width = Dimensions.get('screen').width;

interface Props {
  navigation: NativeStackNavigationProp<RootNavigatorParams, 'RegisterScreen'>;
}

export default function RegisterScreen({navigation}: Props) {
  const isLoading = useAppSelector(state => state.authState.isLoading);
  const dispatch = useAppDispatch();

  // Email value, Password value and ConfirmPassword value
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Condition to register auth
  const [isInvalid, setInvalid] = useState(false);
  const [isFillOut, setFillOut] = useState(false);

  useEffect(() => {
    if (
      (email.length <= 0 &&
        password.length <= 0 &&
        confirmPassword.length <= 0) ||
      (regexEmail(email) &&
        regexPassword(password) &&
        isCheckConfirmPassword(confirmPassword))
    ) {
      setInvalid(false);
    } else {
      setInvalid(true);
    }

    if (email.length > 0 && password.length > 0 && confirmPassword.length > 0) {
      setFillOut(true);
    } else {
      setFillOut(false);
    }
  }, [email, password, confirmPassword]);

  function handleRegister() {
    dispatch(registerEmailPassword({email, password}));
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

  function onChangeConfirmPassword(textConfirmPassword: string) {
    setConfirmPassword(textConfirmPassword);
  }

  function isCheckConfirmPassword(confirm: string): boolean {
    const isConfirmPassword = confirm === password;
    //console.log('isConfirm: ' + isConfirmPassword);
    return isConfirmPassword;
  }

  function navigateLogin() {
    navigation?.navigate('LoginScreen');
  }

  return (
    <View style={styles.container}>
      <View style={styles.formInputContainer}>
        <Text style={[globalStyle.labelLarge, styles.titleText]}>REGISTER</Text>
        <Text style={[globalStyle.bodySmall, styles.subtileText]}>
          Sign up with your email
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
          <InputField
            placeHolder="Confirm password"
            secureTextEntry={true}
            onChange={onChangeConfirmPassword}
          />
        </View>
        <View
          style={[
            globalStyle.centerContainer,
            globalStyle.marginTopSmallContainer,
          ]}>
          <TextButton
            onPress={navigateLogin}
            styleText={[globalStyle.bodySmall, styles.titleText]}>
            Do you want to login an account?
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
                onPress={handleRegister}
                styleButton={globalStyle.marginTopSmallContainer}>
                Register
              </ElevationButton>
            )}
            {(isInvalid || !isFillOut) && (
              <ElevationButton
                styleButton={[globalStyle.marginTopSmallContainer]}>
                Register
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
