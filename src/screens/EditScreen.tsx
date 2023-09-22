import {View, StyleSheet, Text, ScrollView} from 'react-native';
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
import {ImageQuery, NoteQuery} from '../repositories';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ImageView} from '../components';
import {Image} from '../types/Image';

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
  const [image, setImage] = useState<Image | null>();
  const [oldImage, setOldImage] = useState<Image | null>();
  const [isAddImg, setIsAdd] = useState(false);

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
      setImage(note.image);
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
    image,
    oldImage,
    date,
    isAddImg,
    isLoading,
    isValided,
  ]);

  function onChangeTitle(text: string) {
    setTitleText(text);
  }

  function onChangeSubtitle(text: string) {
    setSubtitleText(text);
  }

  function onChangeContent(text: string) {
    setContentText(text);
  }

  function setColorPriority(index: number) {
    setColor(colors[index]);
  }

  async function onAddNote() {
    setLoading(true);
    const account = auth().currentUser;

    // Up new image
    var imageResult: Image | undefined;
    if (image) {
      imageResult = await ImageQuery.upImage(
        image.url,
        image.name,
        account!.uid,
      );
    }

    NoteQuery.addNote(
      {
        id: null,
        title: titleText.trim(),
        subtitle: subtitleText.trim(),
        content: contentText.trim(),
        color: color,
        date: date,
        image: imageResult,
      },
      account!.uid,
      isSuccess => {
        if (isSuccess) navigation.pop();
        setLoading(false);
      },
    );
  }

  async function onUpdateNote() {
    setLoading(true);
    const account = auth().currentUser;

    // Remove old image
    if (oldImage) {
      await ImageQuery.removeImage(oldImage.name, account!.uid);
      console.log('Deleted!');
    }

    // Up new image
    var imageResult: Image | undefined;
    if (image && isAddImg) {
      imageResult = await ImageQuery.upImage(
        image.url,
        image.name,
        account!.uid,
      );
      console.log('Updated!');
    }

    NoteQuery.updateNote(
      {
        id: id!,
        title: titleText,
        subtitle: subtitleText,
        content: contentText,
        color: color,
        date: date,
        image: imageResult,
      },
      account!.uid,
      isSuccess => {
        if (isSuccess) navigation.pop();
        setLoading(false);
      },
    );
  }

  async function onDeleteNote() {
    setLoading(true);
    const account = auth().currentUser;
    if (image) {
      await ImageQuery.removeImage(image.name, account!.uid);
      console.log('Deleted!');
    }

    NoteQuery.deleteNote(id!, account!.uid, isSuccess => {
      if (isSuccess) navigation.pop();
      setLoading(false);
    });
  }

  function removePic() {
    setImage(null);
  }

  async function openCamera() {
    await launchCamera({mediaType: 'photo', saveToPhotos: true}, response => {
      if (response.didCancel) {
        console.log('Cancle image picked');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      } else {
        setOldImage(image);
        setIsAdd(true);
        response.assets?.forEach(image => {
          setImage({url: image.uri, name: image.fileName} as Image);
        });
      }
    });
  }

  async function openGalary() {
    await launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('Cancle image picked');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      } else {
        setOldImage(image);
        setIsAdd(true);
        response.assets?.forEach(image => {
          setImage({url: image.uri, name: image.fileName} as Image);
        });
      }
    });
  }

  return (
    <View style={[globalStyle.rootContainer]}>
      <ScrollView>
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
          {image && <ImageView uri={image.url} onDelete={removePic} />}
          <View style={styles.moreContainer}>
            <Text style={[globalStyle.bodySmall, styles.more]}>
              Add picture:
            </Text>
            <IconButton icon="camera" onPress={openCamera} size={24} />
            <IconButton icon="image" onPress={openGalary} size={24} />
          </View>
        </View>
      </ScrollView>
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
