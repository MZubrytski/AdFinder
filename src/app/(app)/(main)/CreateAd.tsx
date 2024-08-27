import { useState } from 'react';
import {
  Colors,
  Text,
  View,
  Image,
  Button,
  Picker,
  Icon,
} from 'react-native-ui-lib';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { AppTextField } from '@/components/ui/AppTextField';
import { CATEGORIES, CURRENCY } from '@/constants/pickerData';
import { AppButton } from '@/components/ui/AppButton';
import { Advert } from '@/types/advert';
import { Timestamp } from 'firebase/firestore';
import { useAddAdvert } from '@/hooks/useAddAdvert';
import { router } from 'expo-router';
import { useAdverts } from '@/hooks/useAdverts';
import { Ionicons } from '@expo/vector-icons';

const dropdown = require('../../../../assets/icons/chevronDown.png');

export default function CreateAdvertScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [currency, setCurrency] = useState('');
  const [price, setPrice] = useState(0);
  const [imagesUri, setImages] = useState([] as string[]);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const { addAdvert, isPending } = useAddAdvert();
  const { refetchAdverts } = useAdverts();

  if (status === null) {
    requestPermission();
  }

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImages([...imagesUri, result.assets[0].uri]);
    }
  };

  const removeImage = (uri: string) => {
    setImages((prevImages) =>
      prevImages.filter((imageUri) => imageUri !== uri),
    );
  };

  const createAdvert = async () => {
    await addAdvert({
      advert: {
        title,
        description,
        category,
        price,
        currency,
        created: Timestamp.now(),
      } as Advert,
      imagesPath: imagesUri,
    });

    setTitle('');
    setDescription('');
    setCategory('');
    setCurrency('');
    setPrice(0);
    setImages([]);

    router.push('/');

    refetchAdverts();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <Text bodyMedium marginB-8>
          Add Images
        </Text>
        <ScrollView
          horizontal
          style={styles.imageContainer}
          showsHorizontalScrollIndicator={false}
        >
          <View marginR-12>
            <Button
              style={styles.addImageBtn}
              iconSource={() => (
                <View style={styles.addImageIconContainer}>
                  <Ionicons name="add-outline" color={Colors.white} size={24} />
                </View>
              )}
              color={Colors.primaryColor}
              onPress={selectImage}
            />
          </View>

          {imagesUri.map((imageUri, index) => (
            <View marginR-12 key={index}>
              <Image source={{ uri: imageUri }} style={styles.image} />
              <View style={styles.imageIconContainer}>
                <Ionicons
                  name="close-outline"
                  color={Colors.white}
                  size={24}
                  onPress={() => removeImage(imageUri)}
                />
              </View>
            </View>
          ))}
        </ScrollView>

        <AppTextField
          placeholder="Name of the product/service"
          onChangeText={setTitle}
        ></AppTextField>

        <Picker
          placeholder="Category"
          marginV-16
          value={category}
          onChange={(item) => setCategory(item as string)}
          topBarProps={{ title: 'Category' }}
          placeholderTextColor={Colors.gray300}
          trailingAccessory={<Icon source={dropdown} />}
          items={CATEGORIES}
        />

        <AppTextField
          modifiers={{
            multiline: true,
            'marginB-16': true,
            showCharCounter: true,
            maxLength: 500,
          }}
          onChangeText={(text: string) => setDescription(text)}
          placeholder="Description"
        ></AppTextField>

        <View row marginB-16>
          <View flexG-2>
            <AppTextField
              placeholder="Price"
              modifiers={{
                keyboardType: 'numeric',
              }}
              onChangeText={(text: string) => setPrice(Number(text))}
            ></AppTextField>
          </View>

          <View flexG-1 marginL-16>
            <Picker
              placeholder="Currency"
              value={currency}
              onChange={(item) => setCurrency(item as string)}
              topBarProps={{ title: 'Currency' }}
              placeholderTextColor={Colors.gray300}
              trailingAccessory={<Icon source={dropdown} />}
              items={CURRENCY}
            />
          </View>
        </View>

        <View flex bottom>
          <AppButton
            modifiers={{ primary: true }}
            onPress={createAdvert}
            disabled={isPending}
          >
            Add Advert
          </AppButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageIcon: {
    position: 'absolute',
  },
  addImageBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Colors.primaryColor,
    color: Colors.secondaryColor,
    backgroundColor: Colors.gray200,
  },
  addImageIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: Colors.gray300,
    borderRadius: 100,
  },
  imageContainer: {
    flexGrow: 0,
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  imageIconContainer: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: Colors.gray300,
  },
});
