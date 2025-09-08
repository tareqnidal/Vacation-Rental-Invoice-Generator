import React from 'react';
import { InvoiceData } from '../types/invoice';
import { Calculator, FileText } from 'lucide-react';

interface InvoiceSummaryProps {
  invoiceData: InvoiceData;
  onGeneratePDF: () => void;
}

export default function InvoiceSummary({ invoiceData, onGeneratePDF }: InvoiceSummaryProps) {
  const { booking, extras, subtotal, vatAmount, totalIncludingVat, nights, settings } = invoiceData;
  const { currencySymbol } = settings;

  const isComplete = invoiceData.customer.name && 
                    invoiceData.customer.email && 
                    invoiceData.company.name &&
                    invoiceData.company.email &&
                    invoiceData.company.vatNumber &&
                    invoiceData.company.organizationNumber &&
                    invoiceData.booking.apartmentType && 
                    invoiceData.booking.checkIn && 
                    invoiceData.booking.checkOut;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <Calculator className="text-purple-600" size={28} />
        Invoice Summary
      </h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <span className="text-gray-700">Boende ({nights} nätter)</span>
          <span className="font-semibold">{currencySymbol}{subtotal.toFixed(2)}</span>
        </div>
        
        {extras.cleaningFee > 0 && (
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-gray-700">Städavgift</span>
            <span className="font-semibold">{currencySymbol}{extras.cleaningFee.toFixed(2)}</span>
          </div>
        )}
        
        {extras.cityTax > 0 && (
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-gray-700">Turistskatt ({booking.guests} gäster × {nights} nätter)</span>
            <span className="font-semibold">{currencySymbol}{(extras.cityTax * booking.guests * nights).toFixed(2)}</span>
          </div>
        )}
        
        {extras.extraGuestFee > 0 && (
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-gray-700">Extra gästavgift ({booking.guests} gäster × {nights} nätter)</span>
            <span className="font-semibold">{currencySymbol}{(extras.extraGuestFee * booking.guests * nights).toFixed(2)}</span>
          </div>
        )}
        
        {extras.other > 0 && (
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-gray-700">{extras.otherDescription || 'Other Fee'}</span>
            <span className="font-semibold">{currencySymbol}{extras.other.toFixed(2)}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-700">Delsumma (exkl. moms)</span>
          <span className="font-semibold">{currencySymbol}{invoiceData.total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-700">Moms ({settings.vatRate}%)</span>
          <span className="font-semibold">{currencySymbol}{vatAmount.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">Totalt att betala (inkl. moms)</span>
          <span className="text-2xl font-bold text-blue-600">{currencySymbol}{totalIncludingVat.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Fakturadetaljer:</p>
        <p className="text-sm text-gray-500">Fakturanummer: {invoiceData.invoiceNumber}</p>
        <p className="text-sm text-gray-500">Fakturadatum: {invoiceData.invoiceDate}</p>
        <p className="text-sm text-gray-500">Förfallodatum: {invoiceData.dueDate}</p>
        <p className="text-sm text-gray-500">OCR-nummer: {invoiceData.ocrNumber}</p>
      </div>
      
      <button
        onClick={onGeneratePDF}
        disabled={!isComplete}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-3 ${
          isComplete 
            ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5' 
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        <FileText size={20} />
        Generera PDF-faktura
      </button>
      
      {!isComplete && (
        <p className="text-red-500 text-sm mt-2 text-center">
          Vänligen fyll i alla obligatoriska fält för att generera faktura
        </p>
      )}
    </div>
  );
}