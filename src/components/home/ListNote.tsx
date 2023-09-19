import {View, StyleSheet, Text, FlatList} from 'react-native';
import {useEffect, useState, useContext} from 'react';
import database from '@react-native-firebase/database';
import {Note} from '../../types/Note';
import {globalStyle} from '../../styles/global';
import NoteItem from './NoteItem';
import {NavigationContext} from '@react-navigation/native';

interface Props {
  uid: string;
}

export default function ListNote({uid}: Props) {
  const navigation = useContext(NavigationContext);

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    try {
      database()
        .ref(`/${uid}/notes`)
        .on('value', snapshot => {
          console.log(snapshot.val());
          if (snapshot.val()) {
            var notesTemp: Note[] = [];
            snapshot.forEach(item => {
              notesTemp.push({
                id: item.key,
                title: item.child('title').val() as string,
                color: item.child('color').val() as string,
                content: item.child('content').val() as string,
                subtitle: item.child('subtitle').val() as string,
                date: item.child('subtitle').val() as string,
              });
              return undefined;
            });
            setNotes(notesTemp.reverse());
          } else {
            console.log('No have value');
          }
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  function onClickNote(note: Note) {
    navigation?.navigate('EditScreen', {
      type: 'Update Note',
      note: note,
    });
  }

  return (
    <View style={globalStyle.rootContainer}>
      {notes.length <= 0 && (
        <View style={[globalStyle.rootContainer, styles.center]}>
          <Text>Note list is empty</Text>
        </View>
      )}
      {notes.length > 0 && (
        <View style={globalStyle.rootContainer}>
          <FlatList
            data={notes}
            renderItem={({item}) => (
              <NoteItem note={item} onPress={() => onClickNote(item)} />
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
function auth() {
  throw new Error('Function not implemented.');
}
