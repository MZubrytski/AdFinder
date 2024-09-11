import { useRef, useState } from 'react';
import {
  Colors,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native-ui-lib';
import * as ImagePicker from 'expo-image-picker';
import {
  Dimensions,
  KeyboardAvoidingView,
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
import { AppPicker } from '@/components/ui/AppPicker';
import { minLengthFieldRule, requiredRule } from '@/constants/validationRules';
import ReactNativeModal from 'react-native-modal';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { AppButtonIcon } from '@/components/ui/AppButtonIcon';

interface CreateAdvertForm {
  title: string;
  description: string;
  category: string;
  price: string;
  currency: string;
}

const IMAGES_LIMIT = 9;

const { width, height } = Dimensions.get('window');

export default function CreateAdvertScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateAdvertForm>({
    mode: 'onChange',
  });

  const [imagesUri, setImages] = useState<string[]>([]);
  const [isFullScreenImageVisible, setFullScreenImageVisible] =
    useState<boolean>(false);
  const [isChoosePhotoModalVisible, setChoosePhotoModalModalVisible] =
    useState<boolean>(false);
  const [openedImageNumber, setImageNumber] = useState<number>(0);
  const carouselRef = useRef<ICarouselInstance | null>(null);

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const { addAdvert, isPending } = useAddAdvert();
  const { refetchAdverts } = useAdverts();
  const { dbUser } = useAuthContext();

  if (status === null) {
    requestPermission();
  }

  const selectImageFromLibrary = async () => {
    setChoosePhotoModalModalVisible(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImages([...imagesUri, result.assets[0].uri]);
    }
  };

  const takePhoto = async () => {
    setChoosePhotoModalModalVisible(false);
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImages([...imagesUri, result.assets[0].uri]);
    }
  };

  const deleteImage = (index: number) => {
    const imageUriToDelete = imagesUri[index];

    setImages((prevImages) =>
      prevImages.filter((imageUri) => imageUri !== imageUriToDelete),
    );

    if (carouselRef.current) {
      if (index !== 0) {
        setImageNumber(index);

        carouselRef.current?.prev();
      }

      if (index === 0 && imagesUri.length === 1) {
        setFullScreenImageVisible(false);
      }
    }
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

  const changeMainPhoto = () => {
    const newMainPhotoUri = imagesUri[openedImageNumber - 1];
    setImages((prevImages) => [
      newMainPhotoUri,
      ...prevImages.filter((imageUri) => imageUri !== newMainPhotoUri),
    ]);
    setImageNumber(1);
    carouselRef.current?.scrollTo({ index: 0 });
  };

  return (
    <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <View
          marginB-8
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text bodyMedium>Add Images</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View marginR-4>
              <Ionicons name="image-outline" color={Colors.black} size={24} />
            </View>

            <Text bodySmall>
              {imagesUri.length} of {IMAGES_LIMIT}
            </Text>
          </View>
        </View>

        <ScrollView
          horizontal
          style={styles.imageContainer}
          showsHorizontalScrollIndicator={false}
        >
          {imagesUri.length === IMAGES_LIMIT ? null : (
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
                    <Ionicons
                      name="add-outline"
                      color={Colors.white}
                      size={24}
                    />
                  </View>
                )}
                color={Colors.primaryColor}
                onPress={() => setChoosePhotoModalModalVisible(true)}
              />
            </View>
          )}

          {imagesUri.map((imageUri, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setFullScreenImageVisible(true);
                setImageNumber(index + 1);
                setTimeout(() => {
                  carouselRef.current?.scrollTo({ index });
                });
              }}
            >
              <View marginR-12>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <View style={styles.imageIconContainer}>
                  <Ionicons
                    name="close-outline"
                    color={Colors.white}
                    size={24}
                    onPress={() => deleteImage(index)}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Controller
          control={control}
          name="title"
          rules={minLengthFieldRule('Title', 3)}
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
          rules={requiredRule('Category')}
          render={({ field: { onChange, value } }) => (
            <AppPicker
              placeholderTitle="Category"
              items={CATEGORIES}
              value={value}
              onChange={(item) => onChange(item)}
              topBarProps={{ title: 'Category' }}
              margins={{ 'marginV-16': true }}
              errorMessage={errors.category?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          rules={minLengthFieldRule('Description', 10)}
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
              rules={requiredRule('Currency')}
              render={({ field: { onChange, value } }) => (
                <AppPicker
                  placeholderTitle="Currency"
                  items={CURRENCY}
                  value={value}
                  onChange={(item) => onChange(item)}
                  topBarProps={{ title: 'Currency' }}
                  errorMessage={errors.currency?.message}
                />
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

        <ReactNativeModal
          isVisible={isChoosePhotoModalVisible}
          onBackdropPress={() => setChoosePhotoModalModalVisible(false)}
        >
          <View
            padding-20
            style={{
              backgroundColor: Colors.light100,
              borderRadius: 12,
            }}
          >
            <Text headerMedium center marginB-16 marginT-8>
              Select Image Source
            </Text>

            <Ionicons
              style={{ position: 'absolute', right: 4, top: 4 }}
              name="close-outline"
              color={Colors.black}
              size={36}
              onPress={() => setChoosePhotoModalModalVisible(false)}
            />

            <AppButton
              modifiers={{ iconOnRight: true, primary: true }}
              onPress={selectImageFromLibrary}
              iconSource={() => <AppButtonIcon name="images-outline" />}
            >
              Choose from Gallery
            </AppButton>

            <AppButton
              onPress={takePhoto}
              modifiers={{
                'marginT-12': true,
                iconOnRight: true,
                primary: true,
              }}
              iconSource={() => <AppButtonIcon name="camera-outline" />}
            >
              Take a Photo
            </AppButton>
          </View>
        </ReactNativeModal>

        <ReactNativeModal
          animationIn={'bounceInRight'}
          style={{ backgroundColor: Colors.black, margin: 0 }}
          isVisible={isFullScreenImageVisible}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <View
              paddingH-8
              paddingV-4
              row
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name="trash-outline"
                color={Colors.white}
                size={28}
                onPress={() =>
                  deleteImage(carouselRef.current?.getCurrentIndex() as number)
                }
              />
              <Text bodyMedium white>
                {openedImageNumber}/{imagesUri.length}
              </Text>
              <Ionicons
                name="close-outline"
                color={Colors.white}
                size={36}
                onPress={() => setFullScreenImageVisible(false)}
              />
            </View>
            <View style={{ width: width, height: height * 0.65 }}>
              <Carousel
                ref={carouselRef}
                width={width}
                data={imagesUri}
                style={{ width: width, height: height * 0.65 }}
                scrollAnimationDuration={200}
                autoPlay={false}
                loop={false}
                onSnapToItem={(index) => setImageNumber(index + 1)}
                renderItem={({ index, item }) => (
                  <View key={index}>
                    <Image
                      style={{
                        width: width,
                        height: height * 0.65,
                      }}
                      source={{
                        uri: item,
                      }}
                    />
                  </View>
                )}
              />
            </View>
            <View padding-8 style={{ height: 100 }}>
              {openedImageNumber === 1 ? (
                <Text center bodyMediumSemibold white>
                  Main photo
                </Text>
              ) : (
                <AppButton
                  modifiers={{ primary: true }}
                  onPress={changeMainPhoto}
                >
                  Make a photo the main one
                </AppButton>
              )}
            </View>
          </View>
        </ReactNativeModal>
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
