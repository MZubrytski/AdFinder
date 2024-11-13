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
import {
  Text,
  View,
  Image,
  Colors,
  TouchableOpacity,
} from 'react-native-ui-lib';
import { convertNumberToDate, convertTimestamp } from '@/utils/dateFormat';
import { AppButton } from '@/components/ui/AppButton';
import { AdvertInfo } from '@/components/AdvertInfo';

import ReactNativeModal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { Map } from '@/components/Map';
import { useTranslation } from 'react-i18next';
import { useNetInfo } from '@react-native-community/netinfo';
import { ConnectionIndicator } from '@/components/ConnectionIndicator';

const { width, height } = Dimensions.get('window');

export default function Advert() {
  const { id } = useLocalSearchParams();
  const { isConnected } = useNetInfo();
  const { advert, isFetching } = useAdvert(id as string);
  const [currentImageNumber, setCurrentImageNumber] = useState(1);
  const [isFullScreenImageVisible, setFullScreenImageVisible] = useState(false);

  const { t } = useTranslation();

  if (isFetching || !advert) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const dateOfCreated =
    typeof advert.created === 'number'
      ? convertNumberToDate(advert.created)
      : convertTimestamp(advert.created);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView overScrollMode="never">
        <View style={{ width: width, height: width * 0.7 }}>
          {advert.images?.length ? (
            <>
              <Carousel
                width={width}
                data={advert.images}
                style={{ width: width, height: width * 0.7 }}
                scrollAnimationDuration={200}
                onSnapToItem={(index) => setCurrentImageNumber(index + 1)}
                loop={false}
                renderItem={({ index, item }) => (
                  <TouchableOpacity
                    onPress={() => setFullScreenImageVisible(true)}
                  >
                    <View key={index}>
                      <Image
                        style={{ width: width, height: width * 0.7 }}
                        source={{
                          uri: item,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />

              <View
                padding-8
                style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 10,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: 8,
                }}
              >
                <Text bodySmall white>
                  {currentImageNumber}/{advert.images?.length}
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
            {dateOfCreated as string}
          </Text>
        </View>

        <AdvertInfo
          containerStyles={{
            marginTop: 8,
          }}
          infoTitle={t('text.description')}
        >
          <Text>{advert.description}</Text>
        </AdvertInfo>

        <AdvertInfo
          containerStyles={{
            marginTop: 8,
          }}
          infoTitle={t('text.seller')}
        >
          <Text>{advert.userName}</Text>
        </AdvertInfo>
        {advert.coordinates ? (
          <AdvertInfo
            containerStyles={{
              marginTop: 8,
            }}
            infoTitle={t('text.sellerLocation')}
          >
            <Map
              longitude={advert.coordinates?.longitude}
              latitude={advert.coordinates?.latitude}
            />
          </AdvertInfo>
        ) : null}
      </ScrollView>

      <View
        padding-16
        style={{
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.gray200,
          paddingBottom: isConnected ? 16 : 40,
        }}
      >
        <AppButton modifiers={{ primary: true }} label="write" />
      </View>

      <ReactNativeModal
        animationIn={'bounceInRight'}
        style={{ backgroundColor: Colors.black, margin: 0 }}
        isVisible={isFullScreenImageVisible}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <View
            paddingH-8
            paddingV-4
            row
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text bodyMedium white>
              {currentImageNumber}/{advert.images?.length}
            </Text>
            <Ionicons
              name="close-outline"
              color={Colors.white}
              size={36}
              onPress={() => setFullScreenImageVisible(false)}
            />
          </View>
          <View style={{ width: width, height: height * 0.65 }}>
            <Carousel
              width={width}
              data={advert.images}
              style={{ width: width, height: height * 0.65 }}
              scrollAnimationDuration={200}
              autoPlay={false}
              loop={false}
              onSnapToItem={(index) => setCurrentImageNumber(index + 1)}
              renderItem={({ index, item }) => (
                <View key={index}>
                  <Image
                    style={{
                      width: width,
                      height: height * 0.65,
                    }}
                    source={{
                      uri: item,
                    }}
                  />
                </View>
              )}
            />
          </View>
          <View padding-8 style={{ height: 100 }}>
            <AppButton
              modifiers={{ primary: true }}
              onPress={() => null}
              label="write"
            />
          </View>
        </View>
      </ReactNativeModal>

      {isConnected ? null : (
        <ConnectionIndicator
          containerStyles={{
            position: 'absolute',
            paddingHorizontal: 16,
            bottom: 4,
          }}
        />
      )}
    </View>
  );
}
