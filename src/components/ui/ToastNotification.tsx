import { NOTIFICATION_WIDTH } from '@/constants/notification';
import { Animated, StyleSheet } from 'react-native';
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast';
import { Text, View } from 'react-native-ui-lib';

export const ToastNotification = ({ toast }: { toast: ToastProps }) => {
  return (
    <View
      padding-8
      marginT-8
      style={[
        styles.container,
        { backgroundColor: toast.data.backgroundColor },
      ]}
    >
      <Text center bodyMedium>
        {toast.message}
      </Text>
      <Animated.View
        style={[
          styles.progressBar,
          { backgroundColor: toast.data.barColor, width: toast.data.barWidth },
        ]}
      ></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: NOTIFICATION_WIDTH,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    height: 2,
  },
});
