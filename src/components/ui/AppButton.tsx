import { Button } from 'react-native-ui-lib';
import { ButtonSizeProp } from 'react-native-ui-lib/src/components/button/types';

export const AppButton = ({
  children,
  disabled = false,
  onPress,
  modifiers,
  size = Button.sizes.medium,
}: {
  children: string;
  disabled?: boolean;
  onPress?: () => void;
  modifiers?: Record<string, boolean | number | string>;
  size?: ButtonSizeProp;
}) => {
  return (
    <Button
      {...modifiers}
      paddingV-16
      paddingH-32
      disabled={disabled}
      label={children}
      size={size}
      onPress={onPress}
      labelStyle={{ fontSize: 16, fontWeight: 700 }}
    />
  );
};
