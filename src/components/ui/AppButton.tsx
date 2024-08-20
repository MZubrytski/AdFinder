import { Button, Colors } from 'react-native-ui-lib';

export const AppButton = ({
  children,
  onPress,
  disabled,
  type = 'primary',
  size = Button.sizes.medium,
}: any) => {
  return (
    <Button
      paddingV-16
      paddingH-32
      disabled={disabled}
      type={type}
      label={children}
      size={size}
      onPress={onPress}
      labelStyle={{ fontSize: 16, fontWeight: 700 }}
      style={disabled ? { backgroundColor: Colors.gray100 } : {}}
      color={disabled ? Colors.gray300 : ''}
    />
  );
};
