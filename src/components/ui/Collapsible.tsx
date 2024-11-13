import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { Colors, Text, View } from 'react-native-ui-lib';

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          backgroundColor: Colors.gray200,
          padding: 16,
          borderRadius: 8,
          marginBottom: 16,
        }}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={Colors.dark}
        />
        <Text bodyMediumSemibold>{title}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View marginT-4 paddingH-4>
          {children}
        </View>
      )}
    </View>
  );
}
