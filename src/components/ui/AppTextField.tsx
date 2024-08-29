import { Colors, TextField } from 'react-native-ui-lib';

export const AppTextField = ({
  placeholder,
  modifiers,
  onChangeText,
  trailingAccessory = undefined,
  secureTextEntry = false,
}: {
  placeholder: string;
  modifiers?: Record<string, boolean | number | string>;
  onChangeText?: (text: string) => void;
  trailingAccessory?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
  secureTextEntry?: boolean;
}) => {
  return (
    <TextField
      {...modifiers}
      bodyMedium
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={Colors.gray300}
      trailingAccessory={trailingAccessory}
    />
  );
};
