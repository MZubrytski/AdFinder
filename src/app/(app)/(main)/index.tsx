import { useAdverts } from '@/hooks/useAdverts';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdvertItem } from '@/components/AdvertItem';
import { Colors, View } from 'react-native-ui-lib';
import { AppTextField } from '@/components/ui/AppTextField';

export default function HomeScreen() {
  const { adverts, isFetching, refetchAdverts } = useAdverts();

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
    <View
      style={{
        backgroundColor: Colors.light100,
        flex: 1,
        paddingHorizontal: 16,
      }}
    >
      <AppTextField placeholder="Search" modifiers={{ 'marginV-16': true }} />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetchAdverts}
          ></RefreshControl>
        }
        data={adverts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AdvertItem advert={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
