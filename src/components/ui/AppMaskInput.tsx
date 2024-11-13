import MaskInput, { Mask } from 'react-native-mask-input';
import { Colors, Text } from 'react-native-ui-lib';

export const AppMaskInput = ({
  mask,
  value,
  errorMessage,
  onChange,
}: {
  mask: Mask;
  value?: string;
  errorMessage?: string;
  onChange: () => void;
}) => {
  return (
    <>
      <MaskInput
        value={value}
        onChangeText={onChange}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderColor: Colors.gray200,
          borderWidth: 1,
          backgroundColor: Colors.gray100,
          borderRadius: 8,
          fontSize: 16,
          fontWeight: '600',
        }}
        placeholderTextColor={Colors.gray300}
        keyboardType="numeric"
        mask={mask}
      />
      {errorMessage && (
        <Text style={{ color: Colors.$textDanger }}>
          {errorMessage as string}
        </Text>
      )}
    </>
  );
};
