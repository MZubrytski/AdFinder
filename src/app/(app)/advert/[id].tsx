import { useAdvert } from '@/hooks/useAdvert';
import { useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

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

  return <View style={styles.container}>Advert Page</View>;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
