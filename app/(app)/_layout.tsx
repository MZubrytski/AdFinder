import { publicPath } from '@/constants/navigation';
import { Redirect, Slot, usePathname } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const pathName = usePathname();

  const isAuth = false;

  if (!isAuth && !publicPath.includes(pathName)) {
    return <Redirect href="/sign-in" />;
  }

  return <Slot />;
}
