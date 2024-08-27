import { useAdvert } from '@/hooks/useAdvert';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { Text, View, Image } from 'react-native-ui-lib';

export default function Advert() {
  const { id } = useLocalSearchParams();
  const { advert, isFetching } = useAdvert(id as string);

  if (isFetching || !advert) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <View>
      <Image
        marginV-32
        source={{
          uri: advert.images?.[0]
            ? advert.images?.[0]
            : 'https://fastly.picsum.photos/id/295/200/200.jpg?hmac=nsWHMt5f11TALPFeS_0t6tIlO2CkViBNAbAbSlhu8P4',
        }}
        style={{
          width: '100%',
          height: 196,
          borderRadius: 8,
        }}
      />
      <View>
        <Text headerMedium marginB-8>
          {advert.title}
        </Text>
        <Text headerSmall marginB-8>
          {advert.price} {advert.currency}
        </Text>
        <Text bodyMedium gray400>
          {advert.description}
        </Text>
      </View>
    </View>
  );
}
