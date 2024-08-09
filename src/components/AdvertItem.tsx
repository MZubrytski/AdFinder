import { Advert } from '@/types/advert';
import { Href, router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';

export const AdvertItem = ({ advert }: { advert: Advert }) => {
  return (
    <Card style={styles.card}>
      <Card.Title title={advert.title}></Card.Title>
      <Card.Content>
        <Text>{advert.description}</Text>
        <Text style={styles.category}>{advert.category}</Text>
        <Text style={styles.price}>
          {advert.price} {advert.currency}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() =>
            router.push(`/advert/${advert.id}` as Href<`/advert/${string}`>)
          }
        >
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
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
