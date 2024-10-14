import { advertsService } from '@/api/adverts.service';
import { SQLiteDB } from '@/db';
import { Advert } from '@/types/advert';
import { useNetInfo } from '@react-native-community/netinfo';
import { useMutation } from '@tanstack/react-query';

import { useId } from 'react';

export const useAddAdvert = () => {
  const { isConnected } = useNetInfo();
  const newAdvertId = useId();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['add advert'],
    mutationFn: async (advertData: {
      advert: Advert;
      imagesPath: string[];
    }) => {
      if (isConnected === null) {
        return;
      }

      const { advert, imagesPath } = advertData;

      if (isConnected) {
        await advertsService.createAdvert(advert, imagesPath);
      } else {
        await SQLiteDB.createAdvert({ ...advert, id: newAdvertId }, imagesPath);
      }
    },
  });

  return {
    addAdvert: mutateAsync,
    isPending,
  };
};
