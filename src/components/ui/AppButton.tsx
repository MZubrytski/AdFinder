import { Button, Colors } from 'react-native-ui-lib';
import { ButtonSizeProp } from 'react-native-ui-lib/src/components/button/types';

export const AppButton = ({
  children,
  disabled = false,
  onPress,
  type = 'primary',
  size = Button.sizes.medium,
}: {
  children: string;
  disabled?: boolean;
  onPress?: () => void;
  type?: any;
  size?: ButtonSizeProp;
}) => {
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
    />
  );
};
