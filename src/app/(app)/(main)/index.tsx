import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAdverts } from '@/hooks/useAdverts';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
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
      <ThemedView>
        <ThemedText>Home Screen</ThemedText>

        <FlatList
          data={adverts}
          keyExtractor={(item) => item.id}
          renderItem={() => <AdvertItem />}
          contentContainerStyle={styles.listContainer}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
});
