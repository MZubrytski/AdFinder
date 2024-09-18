import { useTranslation } from 'react-i18next';
import { ImageStyle, StyleProp } from 'react-native';
import { Button } from 'react-native-ui-lib';
import { ButtonSizeProp } from 'react-native-ui-lib/src/components/button/types';

export const AppButton = ({
  label,
  disabled = false,
  onPress,
  modifiers,
  size = Button.sizes.medium,
  iconSource,
}: {
  label: string;
  disabled?: boolean;
  onPress?: () => void;
  modifiers?: Record<string, boolean | number | string>;
  size?: ButtonSizeProp;
  iconSource?:
    | ((iconStyle?: StyleProp<ImageStyle>[] | undefined) => JSX.Element)
    | null;
}) => {
  const { t } = useTranslation();
  return (
    <Button
      {...modifiers}
      paddingV-16
      paddingH-32
      disabled={disabled}
      label={t(`buttons.${label}`)}
      size={size}
      onPress={onPress}
      iconSource={iconSource}
      labelStyle={{ fontSize: 16, fontWeight: 700 }}
    />
  );
};
