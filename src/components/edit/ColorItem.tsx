import {Pressable, StyleSheet, View} from 'react-native';
import {globalStyle} from '../../styles/global';

interface Props {
  color: string;
  isSelected?: boolean;
  onPress?: () => void;
}

export default function ColorItem({color, isSelected, onPress}: Props) {
  return (
    <Pressable
      key={color}
      onPress={onPress}
      style={({pressed}) => [
        styles.itemColor,
        isSelected && {...styles.itemSelected, borderColor: color},
        pressed && globalStyle.press,
      ]}>
      <View
        key={color}
        style={[styles.contentSelect, {backgroundColor: color}]}></View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemColor: {
    marginHorizontal: 4,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  itemSelected: {
    borderWidth: 2,
    padding: 2,
  },
  contentSelect: {
    flex: 1,
    borderRadius: 15,
  },
});
