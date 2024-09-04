import { placeholderImageUrl } from '@/constants/placeholderImageUrl';
import { useAdvert } from '@/hooks/useAdvert';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Text, View, Image, Colors } from 'react-native-ui-lib';
import { convertTimestamp } from '@/utils/functions';
import { AppButton } from '@/components/ui/AppButton';

const { width } = Dimensions.get('window');

export default function Advert() {
  const { id } = useLocalSearchParams();
  const { advert, isFetching } = useAdvert(id as string);
  const [currentImageNumber, setCurrentImageIndex] = useState(1);

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
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ width: width, height: width * 0.7 }}>
          {advert.images?.length ? (
            <>
              <Carousel
                width={width}
                data={advert.images}
                scrollAnimationDuration={100}
                onSnapToItem={(index) => setCurrentImageIndex(index + 1)}
                loop={false}
                renderItem={({ index, item }) => (
                  <View key={index}>
                    <Image
                      style={{ width: width, height: width * 0.7 }}
                      source={{
                        uri: item,
                      }}
                    />
                  </View>
                )}
              />

              <View
                style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 10,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <Text bodySmall white>
                  {currentImageNumber}/{advert.images.length}
                </Text>
              </View>
            </>
          ) : (
            <Image
              source={placeholderImageUrl}
              style={{ width: width, height: width * 0.7 }}
            />
          )}
        </View>

        <View style={{ backgroundColor: Colors.white }} paddingH-16>
          <Text headerMedium marginB-8>
            {advert.price} {advert.currency}
          </Text>
          <Text headerSmall marginB-8>
            {advert.title}
          </Text>
          <Text bodySmall marginB-8>
            {convertTimestamp(advert.created)}
          </Text>
        </View>

        <View
          marginT-8
          style={{
            backgroundColor: Colors.white,
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
            <Text headerSmall>Description</Text>
          </View>
          <View padding-16>
            <Text>{advert.description}</Text>
          </View>
        </View>

        <View
          marginT-8
          style={{
            backgroundColor: Colors.white,
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
            <Text headerSmall>Seller</Text>
          </View>
          <View padding-16>
            <Text>{advert.userName}</Text>
          </View>
        </View>
      </ScrollView>

      <View
        padding-16
        style={{
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.gray200,
        }}
      >
        <AppButton modifiers={{ primary: true }}>Write</AppButton>
      </View>
    </View>
  );
}
