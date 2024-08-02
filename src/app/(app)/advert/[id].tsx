import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function Advert() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Advert: {id}</Text>
    </View>
  );
}
