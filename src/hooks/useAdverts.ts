import { advertsService } from '@/api/adverts.service';
import { SQLiteDB } from '@/db';
import { Advert } from '@/types/advert';
import { useNetInfo } from '@react-native-community/netinfo';
import { useQuery } from '@tanstack/react-query';

export const useAdverts = () => {
  const { isConnected } = useNetInfo();

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ['adverts', isConnected],
    queryFn: isConnected
      ? async () => {
          const newAdverts = await SQLiteDB.getNewAdverts();

          if (newAdverts.length) {
            await SQLiteDB.createAdvertFromOfflineMode(newAdverts);
          }
          const adverts = await advertsService.getAdverts();

          await SQLiteDB.saveExistingAdverts(adverts);

          return adverts;
        }
      : async () => {
          if (isConnected === null) {
            return [] as Advert[];
          }
          const savedAdverts = await SQLiteDB.getAdverts();
          const newAdverts = await SQLiteDB.getNewAdverts();
          return [...newAdverts, ...savedAdverts];
        },
  });

  return {
    isFetching,
    isError,
    adverts: data,
    refetchAdverts: refetch,
  };
};
