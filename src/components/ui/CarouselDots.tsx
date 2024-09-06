import { StyleSheet } from 'react-native';
import { Colors, View } from 'react-native-ui-lib';

export const CarouselDots = ({
  containerStyles,
  currentImageNumber,
  totalImages,
}: {
  containerStyles: Record<string, any>;
  currentImageNumber: number;
  totalImages: number;
}) => {
  const isActiveDot = (dotNumber: number) => {
    if (dotNumber === 1 && currentImageNumber === 1) {
      return styles.activeDot;
    } else if (
      dotNumber === 2 &&
      currentImageNumber !== 1 &&
      currentImageNumber !== totalImages
    ) {
      return styles.activeDot;
    } else if (dotNumber === 3 && currentImageNumber === totalImages) {
      return styles.activeDot;
    } else {
      return styles.notActiveDot;
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        ...containerStyles,
      }}
    >
      {Array(1, 2, 3).map((dotNumber, index) => (
        <View key={index} style={isActiveDot(dotNumber)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.gray300,
    marginLeft: 4,
    backgroundColor: Colors.black,
  },
  notActiveDot: {
    width: 4,
    height: 4,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.black,
    marginLeft: 4,
    backgroundColor: Colors.white,
  },
});
