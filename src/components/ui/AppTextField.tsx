import { Colors, TextField } from 'react-native-ui-lib';

export const AppTextField = ({
  placeholder,
  modifiers,
  onChangeText,
  trailingAccessory = undefined,
  secureTextEntry = false,
}: {
  placeholder: string;
  modifiers?: Record<string, boolean>;
  onChangeText?: (text: string) => void;
  trailingAccessory?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
  secureTextEntry?: boolean;
}) => {
  return (
    <TextField
      {...modifiers}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={Colors.gray300}
      trailingAccessory={trailingAccessory}
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
    />
  );
};
