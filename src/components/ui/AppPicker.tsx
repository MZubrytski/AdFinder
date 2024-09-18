import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import {
  Text,
  Colors,
  Icon,
  ModalTopBarProps,
  Picker,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';

const dropdown = require('@/assets/icons/chevronDown.png');

export const AppPicker = ({
  items,
  value,
  onChange,
  placeholderTitle,
  topBarProps,
  margins,
  errorMessage,
}: {
  items: {
    label: string;
    value: string;
  }[];
  value: string;
  onChange: (item: any) => void;
  placeholderTitle: string;
  topBarProps: ModalTopBarProps;
  margins?: Record<string, boolean | number | string>;
  errorMessage?: string;
}) => {
  const { t } = useTranslation();

  return (
    <View {...margins} style={{ position: 'relative' }}>
      <Picker
        placeholder={t(`placeholders.${placeholderTitle}`)}
        value={value}
        onChange={onChange}
        topBarProps={topBarProps}
        placeholderTextColor={Colors.gray300}
        items={items}
        trailingAccessory={!!value ? undefined : <Icon source={dropdown} />}
      />
      {!!value ? (
        <TouchableOpacity
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            right: 4,
            width: 40,
            height: 40,
            backgroundColor: 'transparent',
            zIndex: 5,
            top: 12,
          }}
          onPress={() => onChange('')}
        >
          <Ionicons name="close-outline" color={Colors.black} size={24} />
        </TouchableOpacity>
      ) : null}
      {!!errorMessage && (
        <Text marginT-4 marginL-8 bodySmall dangerText>
          {errorMessage as string}
        </Text>
      )}
    </View>
  );
};
