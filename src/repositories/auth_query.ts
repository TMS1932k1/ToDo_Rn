import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {showToast} from '../utils';

GoogleSignin.configure({
  webClientId:
    '1064611386326-pgnjgn0gn5sueorbdvp50tvukv097tqn.apps.googleusercontent.com',
});

export const AuthQuery = {
  registerEmailPassword: async (
    email: string,
    password: string,
    onCompleted?: (isSuccess: boolean) => void,
  ) => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        showToast('success', 'Create account successlly');
        if (onCompleted) onCompleted(true);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          showToast('error', 'That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          showToast('error', 'That email address is invalid!');
        }

        showToast('error', 'Sign up failed');
        if (onCompleted) onCompleted(false);
      });
  },
  loginEmailPassword: async (
    email: string,
    password: string,
    onCompleted?: (isSuccess: boolean) => void,
  ) => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        showToast('success', 'Sign in successlly');
        if (onCompleted) onCompleted(true);
      })
      .catch(error => {
        showToast('error', 'Sign in failed!');
        if (onCompleted) onCompleted(false);
      });
  },
  loginGoogle: async (onCompleted?: (isSuccess: boolean) => void) => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    console.log(' 1');
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    console.log('2');

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log('3');

    // Sign-in the user with the credential
    await auth()
      .signInWithCredential(googleCredential)
      .then(() => {
        showToast('success', 'Sign in successlly');
        if (onCompleted) onCompleted(true);
      })
      .catch(error => {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          showToast('error', 'User cancelled the login flow!');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
          showToast(
            'error',
            'Operation (e.g. sign in) is in progress already!',
          );
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
          showToast('error', 'Play services not available or outdated!');
        } else {
          // some other error happened
          showToast('error', 'Sign in failed!');
        }
        if (onCompleted) onCompleted(false);
      });
  },
};
