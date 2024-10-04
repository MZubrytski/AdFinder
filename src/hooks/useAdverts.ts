import { advertsService } from '@/api/adverts.service';
import { SQLiteDB } from '@/db';
import { useNetInfo } from '@react-native-community/netinfo';
import { useQuery } from '@tanstack/react-query';

export const useAdverts = () => {
  const { isConnected } = useNetInfo();

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ['adverts', isConnected],
    queryFn: () =>
      isConnected ? advertsService.getAdverts() : SQLiteDB.getAdverts(),
  });

  return {
    isFetching,
    isError,
    adverts: data,
    refetchAdverts: refetch,
  };
};
