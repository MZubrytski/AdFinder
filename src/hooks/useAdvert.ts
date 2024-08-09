import { advertsService } from '@/api/adverts.service';
import { useQuery } from '@tanstack/react-query';

export const useAdvert = (id: string) => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['advert', id],
    queryFn: () => advertsService.getAdvert(id),
  });

  return {
    isFetching,
    isError,
    advert: data,
  };
};
