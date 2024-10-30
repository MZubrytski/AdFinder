import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Colors, Icon, Text, View } from 'react-native-ui-lib';
import { AppButton } from './AppButton';
import ReactNativeModal from 'react-native-modal';

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  onSelectionChange: (selectedItems: string[]) => void;
}

const dropdown = require('@/assets/icons/chevronDown.png');

export const AppMultiSelect = ({
  options,
  onSelectionChange,
}: MultiSelectProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleItem = (value: string) => {
    const newSelectedItems = selectedItems.includes(value)
      ? selectedItems.filter((item) => item !== value)
      : [...selectedItems, value];

    setSelectedItems(newSelectedItems);
  };

  const handleConfirm = () => {
    onSelectionChange(selectedItems);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}
      >
        <Text
          bodyMediumSemibold
          style={{
            color: Colors.gray300,
          }}
        >
          {selectedItems.length > 0
            ? `${selectedItems.length} selected`
            : 'Select Options'}
        </Text>

        <Icon source={dropdown} />
      </TouchableOpacity>

      {selectedItems.length > 0 && (
        <View marginT-10 style={styles.selectedItemsContainer}>
          {selectedItems.map((item) => (
            <View padding-10 margin-2 key={item} style={styles.selectedItem}>
              <Text>
                {options.find((option) => option.value === item)?.label}
              </Text>
            </View>
          ))}
        </View>
      )}

      <ReactNativeModal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modalContainer}
      >
        <View padding-20 style={styles.modalContent}>
          <ScrollView>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.optionRow}
                onPress={() => toggleItem(option.value)}
              >
                <Checkbox
                  value={selectedItems.includes(option.value)}
                  onValueChange={() => toggleItem(option.value)}
                />
                <Text marginL-10>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <AppButton
            modifiers={{ primary: true, 'marginT-16': true }}
            onPress={handleConfirm}
            label="submit"
          ></AppButton>
        </View>
      </ReactNativeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Colors.gray200,
    borderWidth: 1,
    backgroundColor: Colors.gray100,
    borderRadius: 8,
  },
  selectedItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedItem: {
    backgroundColor: Colors.gray200,
    borderRadius: 15,
  },
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
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default AppMultiSelect;
