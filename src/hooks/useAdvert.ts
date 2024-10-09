import { advertsService } from '@/api/adverts.service';
import { SQLiteDB } from '@/db';
import { Advert } from '@/types/advert';
import { useNetInfo } from '@react-native-community/netinfo';
import { useQuery } from '@tanstack/react-query';

export const useAdvert = (id: string) => {
  const { isConnected } = useNetInfo();
  const { data, isFetching, isError } = useQuery({
    queryKey: ['advert', id, isConnected],
    queryFn: isConnected
      ? async () => {
          return await advertsService.getAdvert(id);
        }
      : async () => {
          if (isConnected === null) {
            return {} as Advert;
          }

          return await SQLiteDB.getAdvert(id);
        },
  });

  return {
    isFetching,
    isError,
    advert: data,
  };
};
