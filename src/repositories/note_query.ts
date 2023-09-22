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
  updateNote: async (
    note: Note,
    uid: string,
    onCompleted?: (isSuccess: boolean) => void,
  ) => {
    try {
      database()
        .ref(`/${uid}/notes/${note.id}`)
        .update(
          {
            title: note.title,
            subtitle: note.subtitle,
            content: note.content,
            color: note.color,
            date: note.date,
            image: note.image ?? null,
          },
          error => {
            if (onCompleted)
              if (error) {
                onCompleted(false);
              } else {
                onCompleted(true);
              }
          },
        );
    } catch (e) {
      if (onCompleted) onCompleted(false);
    }
  },
  deleteNote: async (
    id: string,
    uid: string,
    onCompleted?: (isSuccess: boolean) => void,
  ) => {
    try {
      database()
        .ref(`/${uid}/notes/${id}`)
        .remove(error => {
          if (onCompleted)
            if (error) {
              onCompleted(false);
            } else {
              onCompleted(true);
            }
        });
    } catch (e) {
      if (onCompleted) onCompleted(false);
    }
  },
};
