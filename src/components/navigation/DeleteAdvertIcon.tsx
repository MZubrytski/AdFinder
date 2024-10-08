import { router, useLocalSearchParams } from 'expo-router';
import { HeaderIcon } from './HeaderIcon';
import { useDeleteAdvert } from '@/hooks/useDeleteAdvert';
import { useAdvert } from '@/hooks/useAdvert';
import { useAuthContext } from '@/context/auth/AuthContext';
import { useState } from 'react';

export const DeleteAdvertIcon = ({ style = {} }) => {
  const { id } = useLocalSearchParams();
  const { advert } = useAdvert(id as string);
  const { deleteAdvert } = useDeleteAdvert();
  const { dbUser } = useAuthContext();
  const [isDeleteInProgress, setIsDeleteInProgress] = useState<boolean>(false);

  if (advert?.userId !== dbUser?.id) {
    return null;
  }

  return (
    <HeaderIcon
      name="trash-outline"
      style={style}
      onPress={async () => {
        if (isDeleteInProgress) {
          return;
        }
        setIsDeleteInProgress(true);
        await deleteAdvert(id as string);
        router.back();
        setIsDeleteInProgress(false);
      }}
    />
  );
};
