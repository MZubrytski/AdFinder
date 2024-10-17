import {
  NOTIFICATION_DURATION,
  NOTIFICATION_WIDTH,
} from '@/constants/notification';
import { Animated } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { Colors } from 'react-native-ui-lib';

export const useToastNotification = () => {
  const toast = useToast();

  const showSuccessNotification = (message: string) => {
    const barWidth = new Animated.Value(NOTIFICATION_WIDTH);

    Animated.timing(barWidth, {
      toValue: 0,
      duration: NOTIFICATION_DURATION,
      useNativeDriver: false,
    }).start();

    toast.show(message, {
      type: 'custom_success',
      data: {
        barWidth,
        backgroundColor: Colors.primaryColor,
        barColor: Colors.$textDanger,
      },
    });
  };

  const showErrorNotification = (message: string) => {
    const barWidth = new Animated.Value(NOTIFICATION_WIDTH);

    Animated.timing(barWidth, {
      toValue: 0,
      duration: NOTIFICATION_DURATION,
      useNativeDriver: false,
    }).start();

    toast.show(message, {
      type: 'custom_error',
      data: {
        barWidth,
        backgroundColor: Colors.$textDanger,
        barColor: Colors.primaryColor,
      },
    });
  };

  return {
    showSuccessNotification,
    showErrorNotification,
  };
};
