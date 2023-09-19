import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, EditScreen} from '../../screens';
import {MyColors} from '../../constants';
import {RootNavigatorParams} from '../RootNavigator';

const Stack = createNativeStackNavigator<RootNavigatorParams>();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        contentStyle: {backgroundColor: MyColors.background},
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditScreen"
        component={EditScreen}
        options={{
          headerShadowVisible: false,
          headerTintColor: MyColors.primary,
        }}
      />
    </Stack.Navigator>
  );
}
