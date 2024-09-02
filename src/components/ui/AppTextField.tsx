import { Colors, Text, TextField, View } from 'react-native-ui-lib';

export const AppTextField = ({
  placeholder,
  value,
  margins,
  modifiers,
  onChangeText,
  errorMessage,
  trailingAccessory = undefined,
  secureTextEntry = false,
}: {
  placeholder: string;
  value?: string;
  margins?: Record<string, boolean>;
  modifiers?: Record<string, boolean | number | string>;
  onChangeText?: (text: string) => void;
  errorMessage?: string;
  trailingAccessory?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
  secureTextEntry?: boolean;
}) => {
  return (
    <View {...margins}>
      <TextField
        {...modifiers}
        bodyMedium
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray300}
        trailingAccessory={trailingAccessory}
        value={value}
      />
      {!!errorMessage && (
        <Text marginT-4 marginL-8 bodySmall dangerText>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};
