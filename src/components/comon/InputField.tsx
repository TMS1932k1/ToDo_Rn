import {
  StyleSheet,
  TextInput,
  StyleProp,
  TextStyle,
  KeyboardTypeOptions,
} from 'react-native';

interface Props {
  placeHolder?: string;
  onChange?: (text: string) => void;
  style?: StyleProp<TextStyle>;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export default function InputField({
  placeHolder,
  onChange,
  style,
  secureTextEntry,
  keyboardType,
}: Props) {
  return (
    <TextInput
      style={[styles.inputContainer, style]}
      placeholder={placeHolder}
      onChangeText={onChange}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#ebece5',
    borderRadius: 25,
    width: '100%',
    height: 50,
    paddingHorizontal: 24,
    marginVertical: 8,
  },
});
