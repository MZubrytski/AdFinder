import { placeholderImageUrl } from '@/constants/placeholderImageUrl';
import { Advert } from '@/types/advert';
import { convertTimestamp } from '@/utils/functions';
import { Href, router } from 'expo-router';
import { useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { Card, View, Text, Colors, Image } from 'react-native-ui-lib';
import { CarouselDots } from './ui/CarouselDots';
import { useTranslation } from 'react-i18next';

export const AdvertItem = ({ advert }: { advert: Advert }) => {
  const [currentImageNumber, setCurrentImageNumber] = useState(1);
  const { t } = useTranslation();

  return (
    <Card
      row
      marginB-16
      onPress={() => {
        router.push(`/advert/${advert.id}` as Href<`/advert/${string}`>);
      }}
      enableShadow={false}
    >
      {advert.images?.length > 2 ? (
        <View marginR-16 paddingB-8>
          <Carousel
            width={120}
            data={advert.images}
            style={{ width: 120, height: 120 }}
            scrollAnimationDuration={200}
            onSnapToItem={(index) => setCurrentImageNumber(index + 1)}
            loop={false}
            renderItem={({ index, item }) => (
              <View key={index}>
                <Image
                  style={{ width: 120, height: 120, borderRadius: 8 }}
                  source={{
                    uri: item,
                  }}
                />
              </View>
            )}
          />

          <CarouselDots
            containerStyles={{ position: 'absolute', bottom: 12, right: 8 }}
            currentImageNumber={currentImageNumber}
            totalImages={advert?.images?.length || 0}
          ></CarouselDots>
        </View>
      ) : (
        <Card.Section
          marginR-16
          paddingB-8
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          imageSource={
            advert.images?.[0]
              ? {
                  uri: advert.images?.[0],
                }
              : placeholderImageUrl
          }
          imageStyle={{
            width: 120,
            height: 120,
            borderRadius: 8,
          }}
        />
      )}

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
          <Text bodySmall gray300 marginT-2 marginL-4 flexS-0>
            {convertTimestamp(advert.created)}
          </Text>
        </View>
        <Text marginB-8 bodySmallSemibold>
          {advert.price} {advert.currency}
        </Text>
        <Text marginB-16 bodySmall gray300>
          {t(`text.categories.${advert.category}`)}
        </Text>
      </View>
    </Card>
  );
};
