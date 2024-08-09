import { useAdvert } from '@/hooks/useAdvert';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

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

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title={advert.title} />
        <Card.Content>
          <Text variant="bodyMedium">{advert.description}</Text>
          <Text variant="bodyMedium" style={styles.category}>
            {advert.category}
          </Text>
          <Text variant="titleLarge" style={styles.price}>
            {advert.price} {advert.currency}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => router.back()}>
            Go Back
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  category: {
    color: '#777',
  },
  price: {
    fontWeight: 'bold',
  },
});
