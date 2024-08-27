import { Colors, ThemeManager } from 'react-native-ui-lib';

ThemeManager.setComponentForcedTheme(
  'Button',
  (props: { primary: boolean; secondary: boolean; disabled: boolean }) => {
    if (props.disabled) {
      return {
        color: Colors.gray300,
      };
    }

    if (props.primary) {
      return {
        backgroundColor: Colors.primaryColor,
        color: Colors.light100,
      };
    }

    if (props.secondary) {
      return {
        backgroundColor: Colors.gray100,
        color: Colors.secondaryColor,
      };
    }
  },
);

ThemeManager.setComponentTheme('TextField', (props) => {
  return {
    containerStyle: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderColor: Colors.gray200,
      borderWidth: 1,
      backgroundColor: Colors.gray100,
      borderRadius: props.rounder ? 100 : 8,
    },
  };
});

ThemeManager.setComponentTheme('Picker', (props) => {
  return {
    containerStyle: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderColor: Colors.gray200,
      borderWidth: 1,
      backgroundColor: Colors.gray100,
      borderRadius: props.rounder ? 100 : 8,
    },
    fontSize: 16,
    fontWeight: '500',
  };
});
