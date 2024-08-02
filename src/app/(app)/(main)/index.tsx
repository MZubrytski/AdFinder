import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const adverts = [
    { id: '1', name: 'Ad 1' },
    { id: '2', name: 'Ad 2' },
  ];

  return (
    <ThemedView>
      <ThemedText>Home Screen</ThemedText>

      {adverts.map((ad) => (
        <Link
          key={ad.id}
          href={{
            pathname: '/advert/[id]',
            params: { id: `${ad.id}` },
          }}
        >
          {`Advert ${ad.id} ${ad.name}`}
        </Link>
      ))}
    </ThemedView>
  );
}
