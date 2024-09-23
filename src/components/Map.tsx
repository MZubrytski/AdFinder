import { useTranslation } from 'react-i18next';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { Colors } from 'react-native-ui-lib';

const markerImage = require('@/assets/icons/marker.png');

export const Map = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const { t } = useTranslation();

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      tintColor={Colors.black}
      style={{
        width: '100%',
        height: 300,
      }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      showsPointsOfInterest={false}
      userInterfaceStyle="light"
    >
      <Marker
        coordinate={{
          latitude,
          longitude,
        }}
        title={t('text.seller')}
        image={markerImage}
      ></Marker>
    </MapView>
  );
};
