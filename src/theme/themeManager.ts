import { Colors, ThemeManager } from 'react-native-ui-lib';

ThemeManager.setComponentTheme(
  'Button',
  (props: { type: 'primary' | 'secondary' }) => {
    if (props.type === 'primary') {
      return {
        backgroundColor: Colors.primaryColor,
        color: Colors.light,
      };
    }

    if (props.type === 'secondary') {
      return {
        backgroundColor: Colors.gray100,
        color: Colors.secondaryColor,
      };
    }
  },
);
