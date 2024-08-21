import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { Colors } from 'react-native-ui-lib';

export const HeaderIcon = ({
  style = {},
  size = 24,
  color = Colors.dark,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>['name']>) => {
  return (
    <Ionicons
      style={[{ marginTop: 4 }, style]}
      size={size}
      color={color}
      {...rest}
    />
  );
};
