import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { Colors, Icon, Text } from 'react-native-ui-lib';

interface Option {
  label: string;
  value: string;
}

interface AppSelectProps {
  options: Option[];
  onSelect: (item: Option) => void;
  label: string;
  value?: string;
}

const dropdown = require('@/assets/icons/chevronDown.png');

const AppSelect: React.FC<AppSelectProps> = ({
  options,
  onSelect,
  label,
  value,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(
    value || null,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item: Option) => {
    setSelectedValue(item.value);
    setModalVisible(false);
    onSelect(item);
  };

  return (
    <View>
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
        onPress={() => setModalVisible(true)}
      >
        <Text
          bodyMediumSemibold
          style={{
            color: selectedValue ? Colors.black : Colors.gray300,
          }}
        >
          {selectedValue ? selectedValue : label}
        </Text>
        <Icon source={dropdown} />
      </TouchableOpacity>

      <ReactNativeModal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <ScrollView>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.option}
                onPress={() => handleSelect(option)}
              >
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ReactNativeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: '80%',
    maxHeight: '50%',
    padding: 20,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey40,
  },
  optionText: {
    fontSize: 16,
    color: Colors.black,
  },
});

export default AppSelect;
