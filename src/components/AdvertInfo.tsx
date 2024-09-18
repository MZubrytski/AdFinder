import { Colors, Text, View } from 'react-native-ui-lib';
import { useTranslation } from 'react-i18next';

export const AdvertInfo = ({
  containerStyles,
  infoTitle,
  infoData,
}: {
  containerStyles: Record<string, any>;
  infoTitle: string;
  infoData: string;
}) => {
  const { t } = useTranslation();
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        ...containerStyles,
      }}
    >
      <View
        padding-16
        style={{
          backgroundColor: Colors.white,
          borderBottomWidth: 1,
          borderBottomColor: Colors.gray200,
        }}
      >
        <Text headerSmall>{infoTitle}</Text>
      </View>

      <View padding-16>
        <Text>{t(infoData)}</Text>
      </View>
    </View>
  );
};
