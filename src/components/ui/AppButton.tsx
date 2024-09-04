import { Ionicons } from '@expo/vector-icons';
import { ImageStyle, StyleProp } from 'react-native';
import { Button, Colors } from 'react-native-ui-lib';
import { ButtonSizeProp } from 'react-native-ui-lib/src/components/button/types';

export const AppButton = ({
  children,
  disabled = false,
  onPress,
  modifiers,
  size = Button.sizes.medium,
  iconSource,
}: {
  children: string;
  disabled?: boolean;
  onPress?: () => void;
  modifiers?: Record<string, boolean | number | string>;
  size?: ButtonSizeProp;
  iconSource?:
    | ((iconStyle?: StyleProp<ImageStyle>[] | undefined) => JSX.Element)
    | null;
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
      iconSource={iconSource}
      labelStyle={{ fontSize: 16, fontWeight: 700 }}
    />
  );
};
