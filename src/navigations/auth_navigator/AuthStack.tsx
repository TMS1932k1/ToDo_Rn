import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, RegisterScreen} from '../../screens';
import {RootNavigatorParams} from '../RootNavigator';

const Stack = createNativeStackNavigator<RootNavigatorParams>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
