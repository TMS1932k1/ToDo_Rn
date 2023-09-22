import {View, StyleSheet, Image} from 'react-native';
import IconButton from '../comon/IconButton';
import {MyColors, MyImage} from '../../constants';
import {isTablet} from '../../utils';

interface Props {
  uri?: string;
  onDelete?: () => void;
}

export default function ImageView({uri, onDelete}: Props) {
  return (
    <View
      style={[
        styles.imageContainerMobile,
        isTablet() && styles.imageContainerTablet,
      ]}>
      {uri && <Image source={{uri: uri}} style={styles.image} />}
      {!uri && <Image source={MyImage.imgPlaceholder} style={styles.image} />}
      {uri && (
        <IconButton
          icon="trash"
          style={styles.delete}
          size={13}
          color={MyColors.background}
          onPress={onDelete}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainerMobile: {
    width: '100%',
    height: 240,
    padding: 12,
  },
  imageContainerTablet: {
    height: '100%',
    padding: 12,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'relative',
    resizeMode: 'cover',
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
