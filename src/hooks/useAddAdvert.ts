import { advertsService } from '@/api/adverts.service';
import { Advert } from '@/types/advert';
import { useMutation } from '@tanstack/react-query';

export const useAddAdvert = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['add advert'],
    mutationFn: async (advertData: {
      advert: Advert;
      imagesPath: string[];
    }) => {
      const { advert, imagesPath } = advertData;
      await advertsService.createAdvert(advert, imagesPath);
    },
  });

  return {
    addAdvert: mutateAsync,
    isPending,
  };
};
