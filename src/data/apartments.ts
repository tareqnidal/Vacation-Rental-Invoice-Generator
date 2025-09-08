import { ApartmentType } from '../types/invoice';

export const apartmentTypes: ApartmentType[] = [
  {
    id: 'studio',
    name: 'Studio Apartment',
    pricePerNight: 85,
    maxGuests: 2
  },
  {
    id: 'one-bedroom',
    name: 'One Bedroom Apartment',
    pricePerNight: 120,
    maxGuests: 4
  },
  {
    id: 'two-bedroom',
    name: 'Two Bedroom Apartment',
    pricePerNight: 180,
    maxGuests: 6
  },
  {
    id: 'penthouse',
    name: 'Penthouse Suite',
    pricePerNight: 350,
    maxGuests: 8
  }
];

export const defaultCompanyInfo = {
  name: '',
  address: '',
  phone: '',
  email: '',
  website: '',
  vatNumber: '',
  organizationNumber: '',
  bankgiro: '',
  plusgiro: ''
};

export const currencies = [
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone' }
];

export const defaultSettings = {
  currency: 'SEK',
  currencySymbol: 'kr',
  vatRate: 25,
  paymentTerms: 30
};