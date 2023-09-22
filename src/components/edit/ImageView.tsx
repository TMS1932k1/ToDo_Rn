import {View, StyleSheet, Image} from 'react-native';
import IconButton from '../comon/IconButton';
import {MyColors} from '../../constants';

interface Props {
  uri: string;
  onDelete?: () => void;
}

export default function ImageView({uri, onDelete}: Props) {
  return (
    <View style={styles.imageContainer}>
      <Image source={{uri: uri}} style={styles.image} />
      <IconButton
        icon="trash"
        style={styles.delete}
        size={13}
        color={MyColors.background}
        onPress={onDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 240,
    padding: 12,
  },
  image: {
    flex: 1,
    borderRadius: 10,
    position: 'relative',
  },
  delete: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: MyColors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
