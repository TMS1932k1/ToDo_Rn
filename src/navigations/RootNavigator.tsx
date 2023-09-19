import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStack from './home_navigator/MainStack';
import AuthStack from './auth_navigator/AuthStack';
import {useAppSelector} from '../stores/store';
import {Note} from '../types/Note';

const Stack = createNativeStackNavigator<RootNavigatorParams>();

export default function RootNavigator() {
  const isLogin = useAppSelector(state => state.authState.isLogin);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLogin ? (
          <Stack.Screen name="MainStack" component={MainStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type RootNavigatorParams = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  AuthStack: undefined;
  MainStack: undefined;
  EditScreen: {
    type: 'Add Note' | 'Update Note';
    note?: Note;
  };
};
