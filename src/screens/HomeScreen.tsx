import {Header, ListNote} from '../components';
import auth from '@react-native-firebase/auth';
import {StyleSheet, View} from 'react-native';
import {RootNavigatorParams} from '../navigations/RootNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppDispatch} from '../stores/store';
import {authActions} from '../stores/redux/auth_slice';

interface Props {
  navigation: NativeStackNavigationProp<RootNavigatorParams, 'HomeScreen'>;
}

export default function HomeScreen({navigation}: Props) {
  const dispatch = useAppDispatch();

  function signOut() {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        dispatch(authActions.signOut());
      });
  }

  function addNote() {
    navigation?.navigate('EditScreen', {
      type: 'Add Note',
    });
  }

  return (
    <View style={styles.container}>
      <Header onSignOut={signOut} onAddNote={addNote} />
      <ListNote uid={auth().currentUser!.uid} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
});
