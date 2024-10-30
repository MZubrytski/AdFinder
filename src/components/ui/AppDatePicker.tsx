import { Colors, Text, TouchableOpacity } from 'react-native-ui-lib';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';
import { convertDateToString } from '@/utils/functions';

export const AppDatePicker = ({
  value,
  errorMessage,
  onChange,
}: {
  value: Date | null;
  errorMessage?: string;
  onChange: (date: Date) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={{
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: Colors.gray200,
          borderWidth: 1,
          backgroundColor: Colors.gray100,
          borderRadius: 8,
        }}
        onPress={() => setOpen(true)}
      >
        <Text
          bodyMediumSemibold
          style={{
            color: value ? Colors.black : Colors.gray300,
          }}
        >
          {value ? convertDateToString(value) : 'Select date'}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={value || new Date()}
        onConfirm={(date) => {
          setOpen(false);
          onChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      {errorMessage && (
        <Text style={{ color: Colors.$textDanger }}>{errorMessage}</Text>
      )}
    </>
  );
};
