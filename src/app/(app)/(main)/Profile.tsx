import { ScrollView } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import React from 'react';
import { Collapsible } from '@/components/ui/Collapsible';
import { GeneralInfoForm } from '@/components/GeneralInfoForm';
import { useAuthContext } from '@/context/auth/AuthContext';
import { PrivateInfoForm } from '@/components/PrivateInfoForm';

export default function ProfileScreen() {
  const { dbUser } = useAuthContext();

  return (
    <ScrollView
      style={{ paddingHorizontal: 16, backgroundColor: Colors.white, flex: 1 }}
    >
      <Collapsible title="General information">
        <GeneralInfoForm user={dbUser}></GeneralInfoForm>
      </Collapsible>

      <Collapsible title="Personal information">
        <PrivateInfoForm user={dbUser}></PrivateInfoForm>
      </Collapsible>
    </ScrollView>
  );
}
