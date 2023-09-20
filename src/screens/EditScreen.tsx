import {View, StyleSheet, Text} from 'react-native';
import {globalStyle} from '../styles/global';
import {useEffect, useLayoutEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {RootNavigatorParams} from '../navigations/RootNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ColorsBar,
  ElevationButton,
  IconButton,
  LabelInput,
  Loading,
} from '../components';
import {MyColors} from '../constants';
import {NoteQuery} from '../repositories';
import auth from '@react-native-firebase/auth';
import {Note} from '../types/Note';

interface Props {
  navigation: NativeStackNavigationProp<RootNavigatorParams, 'EditScreen'>;
  route: RouteProp<RootNavigatorParams, 'EditScreen'>;
}

export default function EditScreen({navigation, route}: Props) {
  const colors: string[] = ['red', 'orange', 'green', 'blue'];

  const [id, setId] = useState<string>();
  const [titleText, setTitleText] = useState('');
  const [subtitleText, setSubtitleText] = useState('');
  const [contentText, setContentText] = useState('');
  const [color, setColor] = useState(colors[0]);
  const [date, setDate] = useState(new Date().toISOString());

  const [isValided, setValided] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (route!.params.type === 'Update Note') {
      // Set init note's value
      const note = route!.params.note!;
      setId(note.id!);
      setTitleText(note.title);
      setSubtitleText(note.subtitle!);
      setContentText(note.content);
      setColor(note.color);
      setDate(note.date);
    }
  }, [navigation, route]);

  useEffect(() => {
    const isChecked =
      titleText.trim().length > 0 && contentText.trim().length > 0;

    setValided(isChecked);
  }, [titleText, contentText]);

  useLayoutEffect(() => {
    var onHeaderRightHandler: (() => void) | undefined;

    if (isValided) {
      if (route!.params.type === 'Add Note') {
        onHeaderRightHandler = onAddNote;
      }

      if (route!.params.type === 'Update Note') {
        onHeaderRightHandler = onUpdateNote;

        const note = route!.params.note!;
      }
    }

    navigation?.setOptions({
      title: route!.params.type,
      headerRight: () =>
        isLoading ? (
          <Loading size={'large'} />
        ) : (
          <ElevationButton
            onPress={onHeaderRightHandler}
            styleButton={{width: 80, height: 35, padding: 0}}
            styleText={{fontSize: 13}}>
            {route!.params.type === 'Add Note' ? 'Add' : 'Update'}
          </ElevationButton>
        ),
    });
  }, [
    route,
    titleText,
    subtitleText,
    color,
    contentText,
    isLoading,
    isValided,
  ]);

  function onChangeTitle(text: string) {
    setTitleText(text.trim());
  }

  function onChangeSubtitle(text: string) {
    setSubtitleText(text.trim());
  }

  function onChangeContent(text: string) {
    setContentText(text.trim());
  }

  function setColorPriority(index: number) {
    setColor(colors[index]);
  }

  function onAddNote() {
    setLoading(true);
    const account = auth().currentUser;
    NoteQuery.addNote(
      {
        id: null,
        title: titleText,
        subtitle: subtitleText,
        content: contentText,
        color: color,
        date: date,
      },
      account!.uid,
      isSuccess => {
        if (isSuccess) navigation.pop();
        setLoading(false);
      },
    );
  }

  function onUpdateNote() {
    setLoading(true);
    const account = auth().currentUser;
    NoteQuery.updateNote(
      {
        id: id!,
        title: titleText,
        subtitle: subtitleText,
        content: contentText,
        color: color,
        date: date,
      },
      account!.uid,
      isSuccess => {
        if (isSuccess) navigation.pop();
        setLoading(false);
      },
    );
  }

  function onDeleteNote() {
    setLoading(true);
    const account = auth().currentUser;
    NoteQuery.deleteNote(id!, account!.uid, isSuccess => {
      if (isSuccess) navigation.pop();
      setLoading(false);
    });
  }

  function openCamera() {}

  function openGalary() {}

  return (
    <View style={[globalStyle.rootContainer]}>
      <View style={styles.inputContainer}>
        <LabelInput
          value={titleText}
          label="Title"
          placeHolder="Input note's title"
          maxLength={30}
          onChangeText={onChangeTitle}
        />
        <ColorsBar
          style={globalStyle.marginTopLargeContainer}
          colors={colors}
          callbackColor={setColorPriority}
          value={colors.indexOf(color)}
        />
        <LabelInput
          label="Subtitle (Option)"
          style={globalStyle.marginTopLargeContainer}
          placeHolder="Input note's subtitle"
          maxLength={50}
          onChangeText={onChangeSubtitle}
          value={subtitleText}
        />
        <LabelInput
          label="Content"
          style={globalStyle.marginTopLargeContainer}
          styleBorder={styles.contentInput}
          placeHolder="Input content"
          numberOfLines={6}
          maxLength={300}
          onChangeText={onChangeContent}
          value={contentText}
        />
        <View style={styles.moreContainer}>
          <Text style={[globalStyle.bodySmall, styles.more]}>Add picture:</Text>
          <IconButton icon="camera" onPress={openCamera} size={24} />
          <IconButton icon="image" onPress={openGalary} size={24} />
        </View>
      </View>
      <View style={styles.deleteContainer}>
        {isLoading && route!.params.type === 'Update Note' && (
          <Loading size={'large'} color={MyColors.error} />
        )}
        {!isLoading && route!.params.type === 'Update Note' && (
          <ElevationButton styleButton={styles.delete} onPress={onDeleteNote}>
            Delete
          </ElevationButton>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: MyColors.primary,
    borderRadius: 10,
  },
  moreContainer: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteContainer: {
    padding: 12,
  },
  delete: {
    backgroundColor: MyColors.error,
  },
  more: {
    color: MyColors.primary,
  },
});
