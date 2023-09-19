import {Note} from '../types/Note';
import database from '@react-native-firebase/database';

export const NoteQuery = {
  addNote: async (
    note: Note,
    uid: string,
    onCompleted?: (isSuccess: boolean) => void,
  ) => {
    try {
      database()
        .ref(`/${uid}/notes`)
        .push(note, () => {
          if (onCompleted) onCompleted(true);
        });
    } catch (e) {
      if (onCompleted) onCompleted(false);
    }
  },
};
