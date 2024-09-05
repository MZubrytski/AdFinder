import { Colors, Text, View } from 'react-native-ui-lib';

export const AdvertInfo = ({
  containerStyles,
  infoTitle,
  infoData,
}: {
  containerStyles: Record<string, any>;
  infoTitle: string;
  infoData: string;
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

      <View padding-16>
        <Text>{infoData}</Text>
      </View>
    </View>
  );
};
