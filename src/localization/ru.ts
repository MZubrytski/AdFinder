import { Category } from '@/enums/category';

export const ru = {
  tabs: {
    home: 'Главная',
    favorites: 'Избранное',
    create: 'Создать',
    messages: 'Сообщения',
    profile: 'Профиль',
  },
  text: {
    selectImageSource: 'Выбрать источник фотографии',
    addImages: 'Добавьте фотографии',
    createAdvert: 'Создать объявление',
    description: 'Описание',
    seller: 'Продавец',
    of: 'из',
    title: 'Название',
    category: 'Категория',
    currency: 'Валюта',
    forgotPassword: 'Забыли пароль?',
    hide: 'Скрыть',
    show: 'Показать',
    signUp: 'Регистрация',
    signIn: 'Войти',
    login: 'Войти',
    logIn: 'Авторизация',
    imagesLimit: '{{imagesCount}} из {{imagesLimit}}',
    showMyLocation: 'Показать мое местоположение',
    noteAboutLocation: 'Покупатель увидит карту с этим маркером',
    sellerLocation: 'Местонахождение продавца',
    categories: {
      [Category.Electronics]: 'Электроника',
      [Category.Appartment]: 'Квартира',
      [Category.Furniture]: 'Мебель',
      [Category.Vehicles]: 'Транспорт',
      [Category.Clothing]: 'Одежда',
      [Category.Books]: 'Книги',
      [Category.SportsAndOutdoors]: 'Спорт и отдых',
      [Category.HomeAppliances]: 'Бытовая техника',
      [Category.ToysAndGames]: 'Игрушки и игры',
      [Category.Pets]: 'Домашние животные',
      [Category.Services]: 'Услуги',
      [Category.Jobs]: 'Работа',
      [Category.BeautyAndHealth]: 'Красота и здоровье',
      [Category.GardenAndTools]: 'Сад и инструменты',
      [Category.RealEstate]: 'Недвижимость',
      [Category.ArtAndCollectibles]: 'Искусство и коллекционирование',
      [Category.MusicalInstruments]: 'Музыкальные инструменты',
      [Category.OfficeSupplies]: 'Канцелярские товары',
      [Category.BabyAndKids]: 'Товары для детей',
      [Category.AutomotivePartsAndAccessories]: 'Автозапчасти и аксессуары',
      [Category.FoodAndBeverages]: 'Еда и напитки',
      [Category.HobbiesAndCrafts]: 'Хобби и рукоделие',
    },
  },
  placeholders: {
    search: 'Поиск',
    nameOfProduct: 'Название товара/услуги',
    category: 'Категория',
    description: 'Описание',
    price: 'Стоимость',
    currency: 'Валюта',
    name: 'Имя',
    email: 'Электронная почта',
    password: 'Пароль',
  },
  buttons: {
    filter: 'Фильтр',
    addAdvert: 'Добавить объявление',
    chooseFromGallery: 'Выбрать из галереи',
    takePhoto: 'Сделать фото',
    write: 'Написать',
    mainPhoto: 'Главное фото',
    makePhotoMain: 'Сделать фото главным',
    login: 'Войти',
    signUp: 'Зарегистрироваться',
  },
  validation: {
    priceRequired: 'Цена является обязательной',
    priceMinValue: 'Цена должна быть больше чем 0',
    passwordRequired: 'Пароль является обязательным',
    passwordMinLength: 'Пароль должен быть не менее {{minLength}} символов',
    invalidEmail: 'Неверный адрес электронной почты',
    emailRequired: 'Электронная почта является обязательной',
    fieldRequired: 'Поле "{{fieldName}}" является обязательным',
    fieldMinLength: '{{fieldName}} должно быть не менее {{minLength}} символов',
  },
};
