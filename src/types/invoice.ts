export interface CustomerDetails {
  name: string;
  address: string;
  email: string;
  phone: string;
}

export interface BookingDetails {
  checkIn: string;
  checkOut: string;
  guests: number;
  apartmentType: string;
}

export interface ApartmentType {
  id: string;
  name: string;
  pricePerNight: number;
  maxGuests: number;
}

export interface ExtraFees {
  cleaningFee: number;
  cityTax: number;
  extraGuestFee: number;
  other: number;
  otherDescription: string;
}

export interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  vatNumber: string;
  organizationNumber: string;
  bankgiro: string;
  plusgiro: string;
}

export interface InvoiceSettings {
  currency: string;
  currencySymbol: string;
  vatRate: number;
  paymentTerms: number;
}

export interface InvoiceData {
  customer: CustomerDetails;
  booking: BookingDetails;
  extras: ExtraFees;
  company: CompanyInfo;
  settings: InvoiceSettings;
  subtotal: number;
  total: number;
  vatAmount: number;
  totalIncludingVat: number;
  nights: number;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  ocrNumber: string;
}