import { Category } from '@/enums/category';
import i18n from '@/localization/localization';

export const getCategories = () => [
  {
    label: i18n.t(`text.categories.${Category.Electronics}`),
    value: Category.Electronics,
  },
  {
    label: i18n.t(`text.categories.${Category.Appartment}`),
    value: Category.Appartment,
  },
  {
    label: i18n.t(`text.categories.${Category.Furniture}`),
    value: Category.Furniture,
  },
  {
    label: i18n.t(`text.categories.${Category.Vehicles}`),
    value: Category.Vehicles,
  },
  {
    label: i18n.t(`text.categories.${Category.Clothing}`),
    value: Category.Clothing,
  },
  {
    label: i18n.t(`text.categories.${Category.Books}`),
    value: Category.Books,
  },
  {
    label: i18n.t(`text.categories.${Category.SportsAndOutdoors}`),
    value: Category.SportsAndOutdoors,
  },
  {
    label: i18n.t(`text.categories.${Category.HomeAppliances}`),
    value: Category.HomeAppliances,
  },
  {
    label: i18n.t(`text.categories.${Category.ToysAndGames}`),
    value: Category.ToysAndGames,
  },
  {
    label: i18n.t(`text.categories.${Category.Pets}`),
    value: Category.Pets,
  },
  {
    label: i18n.t(`text.categories.${Category.Services}`),
    value: Category.Services,
  },
  {
    label: i18n.t(`text.categories.${Category.Jobs}`),
    value: Category.Jobs,
  },
  {
    label: i18n.t(`text.categories.${Category.BeautyAndHealth}`),
    value: Category.BeautyAndHealth,
  },
  {
    label: i18n.t(`text.categories.${Category.GardenAndTools}`),
    value: Category.GardenAndTools,
  },
  {
    label: i18n.t(`text.categories.${Category.RealEstate}`),
    value: Category.RealEstate,
  },
  {
    label: i18n.t(`text.categories.${Category.ArtAndCollectibles}`),
    value: Category.ArtAndCollectibles,
  },
  {
    label: i18n.t(`text.categories.${Category.MusicalInstruments}`),
    value: Category.MusicalInstruments,
  },
  {
    label: i18n.t(`text.categories.${Category.OfficeSupplies}`),
    value: Category.OfficeSupplies,
  },
  {
    label: i18n.t(`text.categories.${Category.BabyAndKids}`),
    value: Category.BabyAndKids,
  },
  {
    label: i18n.t(`text.categories.${Category.AutomotivePartsAndAccessories}`),
    value: Category.AutomotivePartsAndAccessories,
  },
  {
    label: i18n.t(`text.categories.${Category.FoodAndBeverages}`),
    value: Category.FoodAndBeverages,
  },
  {
    label: i18n.t(`text.categories.${Category.HobbiesAndCrafts}`),
    value: Category.HobbiesAndCrafts,
  },
];

export const CURRENCY = [
  { label: 'USD', value: 'USD' },
  { label: 'EURO', value: 'EURO' },
];
