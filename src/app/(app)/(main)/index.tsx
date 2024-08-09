import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAdverts } from '@/hooks/useAdverts';
import { Advert } from '@/types/advert';
import { Href, router } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, Text } from 'react-native-paper';

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

  const renderItem = ({ item }: { item: Advert }) => {
    return (
      <Card style={styles.card}>
        <Card.Title title={item.title}></Card.Title>
        <Card.Content>
          <Text>{item.description}</Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.price}>
            {item.price} {item.currency}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() =>
              router.push(`/advert/${item.id}` as Href<`/advert/${string}`>)
            }
          >
            View Details
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <SafeAreaView>
      <ThemedView>
        <ThemedText>Home Screen</ThemedText>

        <FlatList
          data={adverts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
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
  card: {
    marginBottom: 10,
    borderRadius: 8,
  },
  category: {
    color: '#777',
  },
  price: {
    fontWeight: 'bold',
  },
});
