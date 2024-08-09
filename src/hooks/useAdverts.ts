import { advertsService } from '@/api/adverts.service';
import { useQuery } from '@tanstack/react-query';

export const useAdverts = () => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['adverts'],
    queryFn: () => advertsService.getAdverts(),
  });

  return {
    isFetching,
    isError,
    adverts: data,
  };
};
