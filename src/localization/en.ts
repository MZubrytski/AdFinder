import { Category } from '@/enums/category';

export const en = {
  tabs: {
    home: 'Home',
    favorites: 'Favorites',
    create: 'Create',
    messages: 'Messages',
    profile: 'Profile',
  },
  text: {
    selectImageSource: 'Select Image Source',
    description: 'Description',
    seller: 'Seller',
    addImages: 'Add Images',
    createAdvert: 'Create Advert',
    of: 'of',
    title: 'Title',
    category: 'Category',
    currency: 'Currency',
    forgotPassword: 'Forgot you password?',
    hide: 'Hide',
    show: 'Show',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    login: 'Login',
    logIn: 'Log In',
    imagesLimit: '{{imagesCount}} of {{imagesLimit}}',
    showMyLocation: 'Show my location',
    pageNotAvailableOffline: 'This page is not available offline',
    noteAboutLocation: 'The buyer will see a map with this marker',
    sellerLocation: "Seller's location",
    errorLocationMessage: 'Permission to access location was denied',
    offlineMode: 'The application works offline',
    advertWasAdded: 'The advert was successfully added',
    categories: {
      [Category.Electronics]: 'Electronics',
      [Category.Appartment]: 'Appartment',
      [Category.Furniture]: 'Furniture',
      [Category.Vehicles]: 'Vehicles',
      [Category.Clothing]: 'Clothing',
      [Category.Books]: 'Books',
      [Category.SportsAndOutdoors]: 'Sports & Outdoors',
      [Category.HomeAppliances]: 'Home Appliances',
      [Category.ToysAndGames]: 'Toys & Games',
      [Category.Pets]: 'Pets',
      [Category.Services]: 'Services',
      [Category.Jobs]: 'Jobs',
      [Category.BeautyAndHealth]: 'Beauty & Health',
      [Category.GardenAndTools]: 'Garden & Tools',
      [Category.RealEstate]: 'Real Estate',
      [Category.ArtAndCollectibles]: 'Art & Collectibles',
      [Category.MusicalInstruments]: 'Musical Instruments',
      [Category.OfficeSupplies]: 'Office Supplies',
      [Category.BabyAndKids]: 'Baby & Kids',
      [Category.AutomotivePartsAndAccessories]:
        'Automotive Parts & Accessories',
      [Category.FoodAndBeverages]: 'Food & Beverages',
      [Category.HobbiesAndCrafts]: 'Hobbies & Crafts',
    },
  },
  placeholders: {
    search: 'Search',
    nameOfProduct: 'Name of the product/service',
    category: 'Category',
    description: 'Description',
    price: 'Price',
    currency: 'Currency',
    name: 'Name',
    email: 'Email',
    password: 'Password',
  },
  buttons: {
    filter: 'Filter',
    addAdvert: 'Add Advert',
    chooseFromGallery: 'Choose from Gallery',
    takePhoto: 'Take Photo',
    write: 'Write',
    mainPhoto: 'Main photo',
    makePhotoMain: 'Make a photo the main one',
    login: 'Login',
    signUp: 'Sign Up',
    goToMainPage: 'Go to main page',
  },
  validation: {
    priceRequired: 'Price is required',
    priceMinValue: 'Price must be greater than 0',
    passwordRequired: 'Password is required',
    passwordMinLength:
      'Password must be at least {{minLength}} characters long',
    invalidEmail: 'Invalid email address',
    emailRequired: 'Email is required',
    fieldRequired: '{{fieldName}} is required',
    fieldMinLength:
      '{{fieldName}} must be at least {{minLength}} characters long',
  },
};
