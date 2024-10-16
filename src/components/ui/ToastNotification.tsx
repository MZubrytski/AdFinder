import { NOTIFICATION_WIDTH } from '@/constants/notification';
import { Animated } from 'react-native';
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast';
import { Text, View } from 'react-native-ui-lib';

export const ToastNotification = ({ toast }: { toast: ToastProps }) => {
  return (
    <View
      padding-8
      marginT-8
      style={{
        width: NOTIFICATION_WIDTH,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: toast.data.backgroundColor,
      }}
    >
      <Text center bodyMedium>
        {toast.message} {toast.id}
      </Text>
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            height: 2,
            backgroundColor: toast.data.barColor,
          },
          { width: toast.data.barWidth },
        ]}
      ></Animated.View>
    </View>
  );
};
