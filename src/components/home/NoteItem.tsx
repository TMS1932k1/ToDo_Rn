import {Text, View, StyleSheet, Pressable} from 'react-native';
import {Note} from '../../types/Note';
import {MyColors} from '../../constants';
import {globalStyle} from '../../styles/global';
import {convertDateFromString} from '../../utils/date';

interface Props {
  note: Note;
  onPress?: () => void;
}

export default function NoteItem({note, onPress}: Props) {
  return (
    <Pressable
      style={({pressed}) => pressed && globalStyle.press}
      onPress={onPress}>
      <View style={styles.borderContainer}>
        <View style={styles.rowContainer}>
          <View style={[styles.priorityBar, {backgroundColor: note.color}]} />
          <View>
            <Text style={globalStyle.labelSmall}>
              {note.title.toLocaleUpperCase()}{' '}
              {
                <Text style={globalStyle.bodySmall}>
                  ({convertDateFromString(note.date).toDateString()})
                </Text>
              }
            </Text>
            <Text style={[globalStyle.bodySmall, styles.textSubtitle]}>
              {note.subtitle}
            </Text>
            <Text style={globalStyle.marginTopSmallContainer}>
              Content: {note.content}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  borderContainer: {
    width: '100%',
    marginVertical: 4,
    shadowColor: 'gray',
    borderRadius: 5,
    overflow: 'hidden',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  rowContainer: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  priorityBar: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
    opacity: 0.7,
  },
  textTitle: {
    opacity: 0.7,
  },
  textSubtitle: {
    color: MyColors.onSuface,
  },
});
