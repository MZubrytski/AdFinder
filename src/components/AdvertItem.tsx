import { placeholderImageUrl } from '@/constants/placeholderImageUrl';
import { Advert } from '@/types/advert';
import { convertTimestamp } from '@/utils/functions';
import { Href, router } from 'expo-router';
import { Card, View, Text, Colors } from 'react-native-ui-lib';

export const AdvertItem = ({ advert }: { advert: Advert }) => {
  return (
    <Card
      row
      marginB-16
      onPress={() => {
        router.push(`/advert/${advert.id}` as Href<`/advert/${string}`>);
      }}
      enableShadow={false}
    >
      <Card.Section
        marginR-16
        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        imageSource={{
          uri: advert.images?.[0] ? advert.images?.[0] : placeholderImageUrl,
        }}
        imageStyle={{
          width: 50,
          height: 50,
          borderRadius: 8,
        }}
      />
      <View
        style={{
          flex: 1,
          borderBottomWidth: 1,
          borderBottomColor: Colors.gray200,
        }}
      >
        <View row marginB-8 style={{ justifyContent: 'space-between' }}>
          <Text headerSmall flexS-1>
            {advert.title}
          </Text>
          <Text bodySmall gray300 marginT-2 flexS-0>
            {convertTimestamp(advert.created)}
          </Text>
        </View>
        <Text marginB-8 bodySmallSemibold>
          {advert.price} {advert.currency}
        </Text>
        <Text marginB-16 bodySmall gray300>
          {advert.category}
        </Text>
      </View>
    </Card>
  );
};
