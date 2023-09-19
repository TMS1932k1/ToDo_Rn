import {Toast} from 'react-native-toast-message/lib/src/Toast';

export const showToast = (type: 'success' | 'error', mes: string) => {
  Toast.hide();
  Toast.show({
    type: type,
    text1: mes,
    visibilityTime: 2000,
  });
};
