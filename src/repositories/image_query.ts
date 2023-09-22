import storage from '@react-native-firebase/storage';

export const ImageQuery = {
  upImage: async (uri: string, name: string, uid: string) => {
    const reference = storage().ref(`/${uid}/${name}`);
    await reference.putFile(uri);
    const url = await reference.getDownloadURL();
    return {name: name, url: url};
  },
  removeImage: async (name: string, uid: string) => {
    const reference = storage().ref(`/${uid}/${name}`);
    const result = await reference.delete();
  },
};
