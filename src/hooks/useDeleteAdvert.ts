import { advertsService } from '@/api/adverts.service';
import { SQLiteDB } from '@/db';

import { useMutation } from '@tanstack/react-query';

export const useDeleteAdvert = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['delete advert'],
    mutationFn: async (advertId: string) => {
      await advertsService.deleteAdvert(advertId);
      await SQLiteDB.deleteAdvert(advertId);
    },
  });

  return {
    deleteAdvert: mutateAsync,
    isPending,
  };
};
