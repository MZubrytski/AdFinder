import { AppButton } from '@/components/ui/AppButton';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View, Text } from 'react-native-ui-lib';

const offlineImage = require('@/assets/images/offline.jpg');

export default function OfflinePage() {
  const { t } = useTranslation();

  const reloadApp = () => {
    router.push('/');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        paddingH-16
        flex
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <Image
          style={{
            width: '80%',
            height: 400,
          }}
          source={offlineImage}
        ></Image>
        <Text bodyMedium marginV-16>
          {t('pageNotAvailableOffline')}
        </Text>
        <AppButton
          label="goToMainPage"
          modifiers={{ primary: true }}
          onPress={reloadApp}
        />
      </View>
    </SafeAreaView>
  );
}
