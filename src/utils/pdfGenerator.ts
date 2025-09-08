import jsPDF from 'jspdf';
import { InvoiceData } from '../types/invoice';
import { apartmentTypes } from '../data/apartments';

export function generateInvoicePDF(invoiceData: InvoiceData): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const { company, settings } = invoiceData;
  const { currencySymbol } = settings;
  
  // Colors
  const primaryColor = '#2563eb';
  const textColor = '#374151';
  const lightGray = '#9ca3af';
  const darkGray = '#1f2937';
  
  // Header - FAKTURA title
  doc.setFontSize(24);
  doc.setTextColor(primaryColor);
  doc.text('FAKTURA', 20, 25);
  
  // Invoice details (top right)
  doc.setFontSize(11);
  doc.setTextColor(textColor);
  doc.text(`Fakturanummer: ${invoiceData.invoiceNumber}`, pageWidth - 80, 25);
  doc.text(`Fakturadatum: ${invoiceData.invoiceDate}`, pageWidth - 80, 32);
  doc.text(`Förfallodatum: ${invoiceData.dueDate}`, pageWidth - 80, 39);
  doc.text(`OCR-nummer: ${invoiceData.ocrNumber}`, pageWidth - 80, 46);
  
  // Seller information (Säljare)
  doc.setFontSize(12);
  doc.setTextColor(primaryColor);
  doc.text('SÄLJARE', 20, 60);
  
  doc.setFontSize(10);
  doc.setTextColor(textColor);
  doc.text(company.name, 20, 70);
  
  const sellerAddressLines = doc.splitTextToSize(company.address, 80);
  let yPos = 77;
  sellerAddressLines.forEach((line: string) => {
    doc.text(line, 20, yPos);
    yPos += 7;
  });
  
  doc.text(`Telefon: ${company.phone}`, 20, yPos + 5);
  doc.text(`E-post: ${company.email}`, 20, yPos + 12);
  if (company.website) {
    doc.text(`Webbplats: ${company.website}`, 20, yPos + 19);
  }
  doc.text(`Org.nr: ${company.organizationNumber}`, 20, yPos + 26);
  doc.text(`Momsreg.nr: ${company.vatNumber}`, 20, yPos + 33);
  
  // Buyer information (Köpare)
  doc.setFontSize(14);
  doc.setTextColor(primaryColor);
  doc.text('KÖPARE', 20, 140);
  
  doc.setFontSize(10);
  doc.setTextColor(textColor);
  doc.text(invoiceData.customer.name, 20, 150);
  
  const buyerAddressLines = doc.splitTextToSize(invoiceData.customer.address, 80);
  let buyerYPos = 157;
  buyerAddressLines.forEach((line: string) => {
    doc.text(line, 20, buyerYPos);
    buyerYPos += 7;
  });
  
  doc.text(`E-post: ${invoiceData.customer.email}`, 20, buyerYPos + 5);
  doc.text(`Telefon: ${invoiceData.customer.phone}`, 20, buyerYPos + 12);
  
  // Booking details (right side)
  doc.setFontSize(12);
  doc.setTextColor(primaryColor);
  doc.text('BOKNINGSDETALJER', pageWidth - 80, 60);
  
  doc.setFontSize(10);
  doc.setTextColor(textColor);
  const apartment = apartmentTypes.find(apt => apt.id === invoiceData.booking.apartmentType);
  doc.text(`Boende: ${apartment?.name || 'N/A'}`, pageWidth - 80, 70);
  doc.text(`Incheckning: ${new Date(invoiceData.booking.checkIn).toLocaleDateString()}`, pageWidth - 80, 77);
  doc.text(`Utcheckning: ${new Date(invoiceData.booking.checkOut).toLocaleDateString()}`, pageWidth - 80, 84);
  doc.text(`Gäster: ${invoiceData.booking.guests}`, pageWidth - 80, 91);
  doc.text(`Nätter: ${invoiceData.nights}`, pageWidth - 80, 98);
  
  // Items table
  const tableStartY = 190;
  let currentY = tableStartY;
  
  // Table Header
  doc.setFillColor(245, 245, 245);
  doc.rect(20, currentY, pageWidth - 40, 15, 'F');
  
  doc.setFontSize(10);
  doc.setTextColor(darkGray);
  doc.setFont(undefined, 'bold');
  doc.text('Beskrivning', 25, currentY + 10);
  doc.text('Antal', pageWidth - 90, currentY + 10);
  doc.text('Pris', pageWidth - 65, currentY + 10);
  doc.text('Belopp', pageWidth - 35, currentY + 10);
  
  currentY += 18;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(9);
  
  // Accommodation
  const accommodationRate = apartment?.pricePerNight || 0;
  doc.text(`${apartment?.name || 'Boende'}`, 25, currentY + 5);
  doc.text(`${invoiceData.nights}`, pageWidth - 90, currentY + 5);
  doc.text(`${accommodationRate.toFixed(2)} ${currencySymbol}`, pageWidth - 65, currentY + 5);
  doc.text(`${invoiceData.subtotal.toFixed(2)} ${currencySymbol}`, pageWidth - 35, currentY + 5);
  currentY += 10;
  
  // Additional fees
  if (invoiceData.extras.cleaningFee > 0) {
    doc.text('Städavgift', 25, currentY + 5);
    doc.text('1', pageWidth - 90, currentY + 5);
    doc.text(`${invoiceData.extras.cleaningFee.toFixed(2)} ${currencySymbol}`, pageWidth - 65, currentY + 5);
    doc.text(`${invoiceData.extras.cleaningFee.toFixed(2)} ${currencySymbol}`, pageWidth - 35, currentY + 5);
    currentY += 10;
  }
  
  if (invoiceData.extras.cityTax > 0) {
    const cityTaxTotal = invoiceData.extras.cityTax * invoiceData.booking.guests * invoiceData.nights;
    doc.text(`Turistskatt (${invoiceData.booking.guests} gäster × ${invoiceData.nights} nätter)`, 25, currentY + 5);
    doc.text(`${invoiceData.booking.guests * invoiceData.nights}`, pageWidth - 90, currentY + 5);
    doc.text(`${invoiceData.extras.cityTax.toFixed(2)} ${currencySymbol}`, pageWidth - 65, currentY + 5);
    doc.text(`${cityTaxTotal.toFixed(2)} ${currencySymbol}`, pageWidth - 35, currentY + 5);
    currentY += 10;
  }
  
  if (invoiceData.extras.extraGuestFee > 0) {
    const extraGuestTotal = invoiceData.extras.extraGuestFee * invoiceData.booking.guests * invoiceData.nights;
    doc.text(`Extra gästavgift (${invoiceData.booking.guests} gäster × ${invoiceData.nights} nätter)`, 25, currentY + 5);
    doc.text(`${invoiceData.booking.guests * invoiceData.nights}`, pageWidth - 90, currentY + 5);
    doc.text(`${invoiceData.extras.extraGuestFee.toFixed(2)} ${currencySymbol}`, pageWidth - 65, currentY + 5);
    doc.text(`${extraGuestTotal.toFixed(2)} ${currencySymbol}`, pageWidth - 35, currentY + 5);
    currentY += 10;
  }
  
  if (invoiceData.extras.other > 0) {
    doc.text(invoiceData.extras.otherDescription || 'Other Fee', 25, currentY + 5);
    doc.text('1', pageWidth - 90, currentY + 5);
    doc.text(`${invoiceData.extras.other.toFixed(2)} ${currencySymbol}`, pageWidth - 65, currentY + 5);
    doc.text(`${invoiceData.extras.other.toFixed(2)} ${currencySymbol}`, pageWidth - 35, currentY + 5);
    currentY += 10;
  }
  
  // Summary section
  currentY += 15;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(pageWidth - 100, currentY, pageWidth - 20, currentY);
  
  currentY += 8;
  doc.setFontSize(10);
  doc.setTextColor(textColor);
  
  // Subtotal
  doc.text('Delsumma (exkl. moms):', pageWidth - 100, currentY);
  doc.text(`${invoiceData.total.toFixed(2)} ${currencySymbol}`, pageWidth - 35, currentY);
  currentY += 8;
  
  // VAT
  doc.text(`Moms (${settings.vatRate}%):`, pageWidth - 100, currentY);
  doc.text(`${invoiceData.vatAmount.toFixed(2)} ${currencySymbol}`, pageWidth - 35, currentY);
  currentY += 8;
  
  // Total line
  doc.setDrawColor(primaryColor);
  doc.setLineWidth(1);
  doc.line(pageWidth - 100, currentY, pageWidth - 20, currentY);
  
  currentY += 8;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(primaryColor);
  doc.text('ATT BETALA:', pageWidth - 100, currentY);
  doc.text(`${invoiceData.totalIncludingVat.toFixed(2)} ${currencySymbol}`, pageWidth - 35, currentY);
  
  // Payment information
  currentY += 30;
  doc.setFontSize(12);
  doc.setTextColor(primaryColor);
  doc.text('BETALNINGSINFORMATION', 20, currentY);
  
  currentY += 10;
  doc.setFontSize(10);
  doc.setTextColor(textColor);
  doc.setFont(undefined, 'normal');
  
  if (company.bankgiro) {
    doc.text(`Bankgiro: ${company.bankgiro}`, 20, currentY);
    currentY += 7;
  }
  
  if (company.plusgiro) {
    doc.text(`Plusgiro: ${company.plusgiro}`, 20, currentY);
    currentY += 7;
  }
  
  doc.text(`OCR-nummer: ${invoiceData.ocrNumber}`, 20, currentY);
  currentY += 7;
  doc.text(`Förfallodatum: ${invoiceData.dueDate}`, 20, currentY);
  currentY += 7;
  doc.text(`Betalningsvillkor: ${settings.paymentTerms} dagar`, 20, currentY);
  
  // Footer
  const footerY = pageHeight - 40;
  doc.setFontSize(7);
  doc.setTextColor(lightGray);
  doc.text('Tack för att du valde vårt semesterboende!', 20, footerY);
  doc.text('Vid frågor om denna faktura, kontakta oss på ovanstående kontaktuppgifter.', 20, footerY + 7);
  
  // Add page border
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);
  
  // Save the PDF
  const fileName = `Faktura_${invoiceData.invoiceNumber}_${invoiceData.customer.name.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
}