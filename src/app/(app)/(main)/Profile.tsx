import { ScrollView } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import React from 'react';
import { Collapsible } from '@/components/ui/Collapsible';
import { GeneralInfoForm } from '@/components/GeneralInfoForm';
import { PrivateInfoForm } from '@/components/PrivateInfoForm';

export default function ProfileScreen() {
  return (
    <ScrollView
      style={{ paddingHorizontal: 16, backgroundColor: Colors.white, flex: 1 }}
    >
      <Collapsible title="General information">
        <GeneralInfoForm />
      </Collapsible>

      <Collapsible title="Personal information">
        <PrivateInfoForm />
      </Collapsible>
    </ScrollView>
  );
}
