import {View, StyleSheet, Text, Pressable} from 'react-native';
import {useLayoutEffect, useState} from 'react';
import {globalStyle} from '../../styles/global';
import {MyColors} from '../../constants';
import auth from '@react-native-firebase/auth';
import IconButton from '../comon/IconButton';

interface Props {
  onAddNote?: () => void;
  onSignOut?: () => void;
}

export default function Header({onAddNote, onSignOut}: Props) {
  const [email, setEmail] = useState<string>();

  useLayoutEffect(() => {
    const account = auth().currentUser;
    if (account?.email) {
      setEmail(account.email);
    }
  }, []);

  return (
    <View style={style.rootContainer}>
      <View>
        <Text style={[globalStyle.labelLarge, style.textPrimary]}>NOTE </Text>
        <View>
          <Text style={[globalStyle.bodyMedium, style.textSuface]}>
            {email}
          </Text>
          <Pressable
            style={({pressed}) => [pressed && globalStyle.press]}
            onPress={onSignOut}>
            <Text style={[globalStyle.bodyMedium, style.textPrimary]}>
              [Sign out]
            </Text>
          </Pressable>
        </View>
      </View>
      <IconButton icon="plus" onPress={onAddNote} size={24} />
    </View>
  );
}

const style = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 24,
  },
  textPrimary: {color: MyColors.primary},
  textSuface: {color: MyColors.onSuface},
});
