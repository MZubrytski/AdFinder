import { Text, View } from 'react-native-ui-lib';
import { useTranslation } from 'react-i18next';

export const ConnectionIndicator = ({
  containerStyles,
}: {
  containerStyles: Record<string, string | boolean | number>;
}) => {
  const { t } = useTranslation();

  return (
    <View
      style={{
        ...containerStyles,
        width: '100%',
        alignItems: 'center',
      }}
    >
      <View
        padding-4
        style={{
          width: '100%',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}
      >
        <Text white>{t('text.offlineMode')}</Text>
      </View>
    </View>
  );
};
