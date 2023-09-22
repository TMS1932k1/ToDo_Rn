import storage from '@react-native-firebase/storage';

export const ImageQuery = {
  upImage: async (uri: string, name: string, uid: string) => {
    const reference = storage().ref(`/${uid}/${name}`);
    const result = await reference.putFile(uri);
    return await reference.getDownloadURL();
  },
};
