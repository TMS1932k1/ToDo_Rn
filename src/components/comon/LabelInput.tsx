import {
  View,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';

import {MyColors} from '../../constants';
import {globalStyle} from '../../styles/global';

interface Props {
  style?: StyleProp<ViewStyle>;
  styleBorder?: StyleProp<ViewStyle>;
  label: string;
  placeHolder?: string;
  numberOfLines?: number;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  onChangeText?: (text: string) => void;
  value?: string;
}

export default function LabelInput({
  style,
  styleBorder,
  label,
  placeHolder,
  numberOfLines,
  keyboardType,
  maxLength,
  onChangeText,
  value,
}: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[globalStyle.bodyMedium, styles.textOnSuface]}>{label}</Text>
      <TextInput
        style={[styles.inputContainer, styleBorder]}
        value={value}
        placeholder={placeHolder}
        multiline={numberOfLines ? true : false}
        numberOfLines={numberOfLines ?? 1}
        maxLength={maxLength}
        textAlignVertical={numberOfLines ? 'top' : 'auto'}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  textOnSuface: {
    color: MyColors.onSuface,
  },
  inputContainer: {
    borderBottomColor: MyColors.primary,
    borderBottomWidth: 1,
    marginTop: 4,
  },
});
