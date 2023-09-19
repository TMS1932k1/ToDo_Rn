import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {useState, useEffect} from 'react';
import ColorItem from './ColorItem';

interface Props {
  style?: StyleProp<ViewStyle>;
  colors: string[];
  callbackColor?: (index: number) => void;
}

export default function ColorsBar({style, colors, callbackColor}: Props) {
  const [currnentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (callbackColor) callbackColor(currnentIndex);
  }, [currnentIndex]);

  function onSelectColor(index: number) {
    setCurrentIndex(index);
  }

  return (
    <View style={[styles.container, style]}>
      {colors.map((color, index) => (
        <ColorItem
          key={color}
          color={color}
          isSelected={index === currnentIndex}
          onPress={() => {
            onSelectColor(index);
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
});
