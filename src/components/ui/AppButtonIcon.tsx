import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { Colors } from 'react-native-ui-lib';

export const AppButtonIcon = ({
  style = {},
  size = 24,
  color = Colors.white,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>['name']>) => {
  return (
    <Ionicons
      style={[{ marginLeft: 4 }, style]}
      size={size}
      color={color}
      {...rest}
    />
  );
};
