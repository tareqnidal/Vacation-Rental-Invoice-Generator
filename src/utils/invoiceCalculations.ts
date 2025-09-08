import { CustomerDetails, BookingDetails, ExtraFees, InvoiceData, CompanyInfo, InvoiceSettings } from '../types/invoice';
import { apartmentTypes } from '../data/apartments';

export function calculateInvoice(
  customer: CustomerDetails,
  booking: BookingDetails,
  extras: ExtraFees,
  company: CompanyInfo,
  settings: InvoiceSettings
): InvoiceData {
  const apartment = apartmentTypes.find(apt => apt.id === booking.apartmentType);
  const basePrice = apartment?.pricePerNight || 0;
  
  // Calculate nights
  const checkIn = new Date(booking.checkIn);
  const checkOut = new Date(booking.checkOut);
  const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
  
  // Calculate subtotal (accommodation only)
  const subtotal = basePrice * nights;
  
  // Calculate additional fees
  const cityTaxTotal = extras.cityTax * booking.guests * nights;
  const extraGuestFeeTotal = extras.extraGuestFee * booking.guests * nights;
  
  // Calculate total before VAT
  const total = subtotal + extras.cleaningFee + cityTaxTotal + extraGuestFeeTotal + extras.other;
  
  // Calculate VAT
  const vatAmount = (total * settings.vatRate) / 100;
  const totalIncludingVat = total + vatAmount;
  
  // Generate invoice number and date
  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
  const invoiceDate = new Date().toLocaleDateString();
  
  // Calculate due date
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + settings.paymentTerms);
  
  // Generate OCR number (simplified version - in production, use proper OCR algorithm)
  const ocrNumber = `${invoiceNumber.replace('INV-', '')}${Math.floor(Math.random() * 10)}`;
  
  return {
    customer,
    booking,
    extras,
    company,
    settings,
    subtotal,
    total,
    vatAmount,
    totalIncludingVat,
    nights,
    invoiceNumber,
    invoiceDate,
    dueDate: dueDate.toLocaleDateString(),
    ocrNumber
  };
}