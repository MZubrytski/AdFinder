import { useAdverts } from '@/hooks/useAdverts';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdvertItem } from '@/components/AdvertItem';

export default function HomeScreen() {
  const { adverts, isFetching } = useAdverts();

  if (isFetching) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Home Screen</Text>

        <FlatList
          data={adverts}
          keyExtractor={(item) => item.id}
          renderItem={() => <AdvertItem />}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
});
