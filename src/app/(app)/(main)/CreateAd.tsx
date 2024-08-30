import { useState } from 'react';
import {
  Colors,
  Text,
  View,
  Image,
  Button,
  Picker,
  Icon,
  TouchableOpacity,
} from 'react-native-ui-lib';
import * as ImagePicker from 'expo-image-picker';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { AppTextField } from '@/components/ui/AppTextField';
import { CATEGORIES, CURRENCY } from '@/constants/pickerData';
import { AppButton } from '@/components/ui/AppButton';
import { Advert } from '@/types/advert';
import { Timestamp } from 'firebase/firestore';
import { useAddAdvert } from '@/hooks/useAddAdvert';
import { router } from 'expo-router';
import { useAdverts } from '@/hooks/useAdverts';
import { Ionicons } from '@expo/vector-icons';
import { useAuthContext } from '@/context/auth/AuthContext';
import { Controller, useForm } from 'react-hook-form';

const dropdown = require('@/assets/icons/chevronDown.png');

interface CreateAdvertForm {
  title: string;
  description: string;
  category: string;
  price: string;
  currency: string;
}

export default function CreateAdvertScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateAdvertForm>({
    mode: 'onChange',
  });

  const [imagesUri, setImages] = useState([] as string[]);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const { addAdvert, isPending } = useAddAdvert();
  const { refetchAdverts } = useAdverts();
  const { dbUser } = useAuthContext();

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

  const createAdvert = async ({
    title,
    description,
    category,
    price,
    currency,
  }: CreateAdvertForm) => {
    const numericPrice = parseFloat(price);

    await addAdvert({
      advert: {
        title,
        description,
        category,
        price: numericPrice,
        currency,
        userId: dbUser?.id,
        userName: dbUser?.userName,
        created: Timestamp.now(),
      } as Advert,
      imagesPath: imagesUri,
    });
    router.push('/');
    refetchAdverts();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
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
              style={{
                width: 80,
                height: 80,
                borderWidth: 2,
                borderRadius: 8,
                backgroundColor: Colors.gray200,
                borderColor: Colors.primaryColor,
              }}
              iconSource={() => (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 30,
                    height: 30,
                    backgroundColor: Colors.gray300,
                    borderRadius: 100,
                  }}
                >
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

        <Controller
          control={control}
          name="title"
          rules={{
            required: 'Title is required',
            minLength: {
              value: 3,
              message: 'Title must be at least 3 characters long',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <AppTextField
              placeholder="Name of the product/service"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.title?.message as string}
            />
          )}
        />

        <Controller
          control={control}
          name="category"
          rules={{
            required: 'Category is required',
          }}
          render={({ field: { onChange, value } }) => (
            <View marginV-16 style={{ position: 'relative' }}>
              <Picker
                placeholder="Category"
                value={value}
                onChange={(item) => onChange(item)}
                topBarProps={{ title: 'Category' }}
                placeholderTextColor={Colors.gray300}
                items={CATEGORIES}
                trailingAccessory={
                  !!value ? undefined : <Icon source={dropdown} />
                }
              />
              {!!value ? (
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    right: 4,
                    width: 40,
                    height: 40,
                    backgroundColor: 'transparent',
                    zIndex: 5,
                    top: 12,
                  }}
                  onPress={() => onChange('')}
                >
                  <Ionicons
                    name="close-outline"
                    color={Colors.black}
                    size={24}
                  />
                </TouchableOpacity>
              ) : null}
              {!!errors.category?.message && (
                <Text marginT-4 marginL-8 bodySmall dangerText>
                  {errors.category.message as string}
                </Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="description"
          rules={{
            required: 'Description is required',
            minLength: {
              value: 10,
              message: 'Description must be at least 10 characters long',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <AppTextField
              margins={{ 'marginB-16': true }}
              modifiers={{
                multiline: true,
                showCharCounter: true,
                maxLength: 500,
              }}
              onChangeText={onChange}
              value={value}
              placeholder="Description"
              errorMessage={errors.description?.message as string}
            />
          )}
        />

        <View row marginB-16>
          <View flexG-2>
            <Controller
              control={control}
              name="price"
              rules={{
                required: 'Price is required',
                min: {
                  value: 0.01,
                  message: 'Price must be greater than 0',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <View flexG-2>
                  <AppTextField
                    placeholder="Price"
                    modifiers={{
                      keyboardType: 'numeric',
                    }}
                    onChangeText={(text) => onChange(text)}
                    value={value?.toString()}
                    errorMessage={errors.price?.message as string}
                  />
                </View>
              )}
            />
          </View>

          <View flexG-1 marginL-16>
            <Controller
              control={control}
              name="currency"
              rules={{
                required: 'Currency is required',
              }}
              render={({ field: { onChange, value } }) => (
                <View style={{ position: 'relative' }}>
                  <Picker
                    placeholder="Currency"
                    value={value}
                    onChange={(item) => onChange(item)}
                    topBarProps={{ title: 'Currency' }}
                    placeholderTextColor={Colors.gray300}
                    items={CURRENCY}
                    trailingAccessory={
                      !!value ? undefined : <Icon source={dropdown} />
                    }
                  />
                  {!!value ? (
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        right: 4,
                        width: 40,
                        height: 40,
                        backgroundColor: 'transparent',
                        zIndex: 5,
                        top: 12,
                      }}
                      onPress={() => onChange('')}
                    >
                      <Ionicons
                        name="close-outline"
                        color={Colors.black}
                        size={24}
                      />
                    </TouchableOpacity>
                  ) : null}
                  {!!errors.currency?.message && (
                    <Text marginT-4 marginL-8 bodySmall dangerText>
                      {errors.currency.message as string}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>
        </View>

        <View flex bottom>
          <AppButton
            modifiers={{ primary: true }}
            onPress={handleSubmit(createAdvert)}
            disabled={isPending || !isValid}
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
