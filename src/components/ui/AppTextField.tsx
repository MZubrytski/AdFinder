import { Colors, Text, TextField } from 'react-native-ui-lib';

export const AppTextField = ({
  placeholder,
  modifiers,
  onChangeText,
  trailingAccessory = null,
  secureTextEntry = false,
}: any) => {
  return (
    <TextField
      {...modifiers}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={Colors.gray300}
      containerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderColor: Colors.gray200,
        borderWidth: 1,
        backgroundColor: Colors.gray100,
        borderRadius: 8,
      }}
      style={{
        fontSize: 16,
        fontWeight: 'medium',
      }}
      trailingAccessory={trailingAccessory}
    />
  );
};
