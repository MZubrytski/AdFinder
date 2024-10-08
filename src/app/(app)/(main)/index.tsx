import { useAdverts } from '@/hooks/useAdverts';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdvertItem } from '@/components/AdvertItem';
import { Colors, Text, View } from 'react-native-ui-lib';
import { AppTextField } from '@/components/ui/AppTextField';
import { useNetInfo } from '@react-native-community/netinfo';
import { ConnectionIndicator } from '@/components/ConnectionIndicator';

export default function HomeScreen() {
  const { adverts, isFetching, refetchAdverts } = useAdverts();
  const { isConnected } = useNetInfo();

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
      paddingH-16
      flex
      style={{
        position: 'relative',
        backgroundColor: Colors.light100,
        paddingBottom: isConnected ? 0 : 20,
      }}
    >
      <FlatList
        ListHeaderComponent={
          <AppTextField
            placeholder="search"
            modifiers={{
              'marginT-32': true,
              'marginB-16': true,
              rounder: true,
            }}
          />
        }
        ListEmptyComponent={<Text>Unfortunately, nothing was found.</Text>}
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
        overScrollMode="never"
      />
      {isConnected ? null : (
        <ConnectionIndicator
          containerStyles={{
            position: 'absolute',
            left: 16,
            bottom: 4,
          }}
        />
      )}
    </View>
  );
}
