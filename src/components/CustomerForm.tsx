import React from 'react';
import { CustomerDetails, BookingDetails } from '../types/invoice';
import { User, Mail, Phone, MapPin, Calendar, Users } from 'lucide-react';
import { apartmentTypes } from '../data/apartments';

interface CustomerFormProps {
  customer: CustomerDetails;
  booking: BookingDetails;
  currencySymbol: string;
  onCustomerChange: (customer: CustomerDetails) => void;
  onBookingChange: (booking: BookingDetails) => void;
}

export default function CustomerForm({ 
  customer, 
  booking, 
  currencySymbol,
  onCustomerChange, 
  onBookingChange 
}: CustomerFormProps) {
  const handleCustomerChange = (field: keyof CustomerDetails, value: string) => {
    onCustomerChange({ ...customer, [field]: value });
  };

  const handleBookingChange = (field: keyof BookingDetails, value: string | number) => {
    onBookingChange({ ...booking, [field]: value });
  };

  const selectedApartment = apartmentTypes.find(apt => apt.id === booking.apartmentType);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <User className="text-blue-600" size={28} />
        Customer Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={customer.name}
                onChange={(e) => handleCustomerChange('name', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter customer name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                value={customer.email}
                onChange={(e) => handleCustomerChange('email', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="customer@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="tel"
                value={customer.phone}
                onChange={(e) => handleCustomerChange('phone', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
              <textarea
                value={customer.address}
                onChange={(e) => handleCustomerChange('address', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                rows={3}
                placeholder="Enter full address"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Check-in Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  value={booking.checkIn}
                  onChange={(e) => handleBookingChange('checkIn', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Check-out Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  value={booking.checkOut}
                  onChange={(e) => handleBookingChange('checkOut', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Apartment Type *
          </label>
          <select
            value={booking.apartmentType}
            onChange={(e) => handleBookingChange('apartmentType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="">Select apartment type</option>
            {apartmentTypes.map((apt) => (
              <option key={apt.id} value={apt.id}>
                {apt.name} - {currencySymbol}{apt.pricePerNight}/night (Max {apt.maxGuests} guests)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Guests *
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="number"
              min="1"
              max={selectedApartment?.maxGuests || 8}
              value={booking.guests}
              onChange={(e) => handleBookingChange('guests', parseInt(e.target.value) || 1)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          {selectedApartment && booking.guests > selectedApartment.maxGuests && (
            <p className="text-red-500 text-sm mt-1">
              Maximum {selectedApartment.maxGuests} guests for this apartment type
            </p>
          )}
        </div>
      </div>
    </div>
  );
}