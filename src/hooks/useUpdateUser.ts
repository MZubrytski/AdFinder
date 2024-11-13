import { userService } from '@/api/user.service';
import { DBUser } from '@/types/user';
import { useMutation } from '@tanstack/react-query';

export const useUpdateUser = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['update user'],
    mutationFn: async (userData: Partial<DBUser>) => {
      await userService.updateUser(userData.id as string, userData);
    },
  });

  return {
    updateUser: mutateAsync,
    isPending,
  };
};
