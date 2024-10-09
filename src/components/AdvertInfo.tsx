import { ReactNode } from 'react';
import { Colors, Text, View } from 'react-native-ui-lib';

export const AdvertInfo = ({
  children,
  containerStyles,
  infoTitle,
}: {
  children: ReactNode;
  containerStyles: Record<string, any>;
  infoTitle: string;
}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        ...containerStyles,
      }}
    >
      <View
        padding-16
        style={{
          backgroundColor: Colors.white,
          borderBottomWidth: 1,
          borderBottomColor: Colors.gray200,
        }}
      >
        <Text headerSmall>{infoTitle}</Text>
      </View>

      <View padding-16>{children}</View>
    </View>
  );
};
