import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {RootNavigator} from './src//navigations';
import {globalStyle} from './src/styles/global';
import Toast from 'react-native-toast-message';
import {MyColors} from './src/constants';
import {Provider} from 'react-redux';
import {store} from './src/stores/store';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaView style={globalStyle.rootContainer}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={MyColors.background}
        />
        <RootNavigator />
      </SafeAreaView>
      <Toast />
    </Provider>
  );
}

export default App;
