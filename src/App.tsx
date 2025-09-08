import React, { useState } from 'react';
import { CustomerDetails, BookingDetails, ExtraFees, InvoiceData, CompanyInfo, InvoiceSettings } from './types/invoice';
import CustomerForm from './components/CustomerForm';
import CompanyInfoForm from './components/CompanyInfoForm';
import ExtraFeesForm from './components/ExtraFeesForm';
import InvoiceSummary from './components/InvoiceSummary';
import { calculateInvoice } from './utils/invoiceCalculations';
import { generateInvoicePDF } from './utils/pdfGenerator';
import { defaultCompanyInfo, defaultSettings } from './data/apartments';
import { FileText, Home } from 'lucide-react';

function App() {
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    address: '',
    email: '',
    phone: ''
  });

  const [booking, setBooking] = useState<BookingDetails>({
    checkIn: '',
    checkOut: '',
    guests: 1,
    apartmentType: ''
  });

  const [extras, setExtras] = useState<ExtraFees>({
    cleaningFee: 50,
    cityTax: 2.5,
    extraGuestFee: 0,
    other: 0,
    otherDescription: ''
  });

  const [company, setCompany] = useState<CompanyInfo>(defaultCompanyInfo);
  
  const [settings, setSettings] = useState<InvoiceSettings>(defaultSettings);

  const invoiceData: InvoiceData = calculateInvoice(customer, booking, extras, company, settings);

  const handleGeneratePDF = () => {
    generateInvoicePDF(invoiceData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Home className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Semesterboende Faktureringssystem</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Skapa professionella fakturor för dina semesterbokningar på sekunder. 
            Fyll bara i kunduppgifter och bokningsinformation för att generera en PDF-faktura som följer svenska fakturastandarder.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            <CompanyInfoForm
              company={company}
              settings={settings}
              onCompanyChange={setCompany}
              onSettingsChange={setSettings}
            />
            
            <CustomerForm
              customer={customer}
              booking={booking}
              currencySymbol={settings.currencySymbol}
              onCustomerChange={setCustomer}
              onBookingChange={setBooking}
            />
            
            <ExtraFeesForm
              extras={extras}
              currencySymbol={settings.currencySymbol}
              onExtrasChange={setExtras}
            />
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <InvoiceSummary
                invoiceData={invoiceData}
                onGeneratePDF={handleGeneratePDF}
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
            <FileText className="text-blue-600" size={28} />
            Systemfunktioner
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <FileText className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Svenska Fakturor</h3>
              <p className="text-sm text-gray-600">Professionella PDF-fakturor som följer svenska standarder</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Home className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Flera Boendetyper</h3>
              <p className="text-sm text-gray-600">Stöd för olika lägenhetstyper och prissättning</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <FileText className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Automatiska Beräkningar</h3>
              <p className="text-sm text-gray-600">Smart beräkning av nätter, moms och avgifter</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <FileText className="text-orange-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Responsiv Design</h3>
              <p className="text-sm text-gray-600">Fungerar perfekt på dator, surfplatta och mobil</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p>&copy; 2025 Semesterboende Faktureringssystem. Professionell fakturering gjord enkelt.</p>
        </div>
      </div>
    </div>
  );
}

export default App;