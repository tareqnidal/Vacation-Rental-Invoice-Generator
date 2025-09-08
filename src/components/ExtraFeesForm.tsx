import React from 'react';
import { ExtraFees } from '../types/invoice';
import { DollarSign, Plus } from 'lucide-react';

interface ExtraFeesFormProps {
  extras: ExtraFees;
  currencySymbol: string;
  onExtrasChange: (extras: ExtraFees) => void;
}

export default function ExtraFeesForm({ extras, currencySymbol, onExtrasChange }: ExtraFeesFormProps) {
  const handleChange = (field: keyof ExtraFees, value: number | string) => {
    onExtrasChange({ ...extras, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <Plus className="text-green-600" size={28} />
        Additional Fees
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cleaning Fee
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="number"
              min="0"
              step="0.01"
              value={extras.cleaningFee}
              onChange={(e) => handleChange('cleaningFee', parseFloat(e.target.value) || 0)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder={`0.00 ${currencySymbol}`}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            City Tax (per person/night)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="number"
              min="0"
              step="0.01"
              value={extras.cityTax}
              onChange={(e) => handleChange('cityTax', parseFloat(e.target.value) || 0)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder={`0.00 ${currencySymbol}`}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Extra Guest Fee (per person/night)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="number"
              min="0"
              step="0.01"
              value={extras.extraGuestFee}
              onChange={(e) => handleChange('extraGuestFee', parseFloat(e.target.value) || 0)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder={`0.00 ${currencySymbol}`}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Other Fee Amount
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="number"
              min="0"
              step="0.01"
              value={extras.other}
              onChange={(e) => handleChange('other', parseFloat(e.target.value) || 0)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder={`0.00 ${currencySymbol}`}
            />
          </div>
        </div>
      </div>

      {extras.other > 0 && (
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Other Fee Description
          </label>
          <input
            type="text"
            value={extras.otherDescription}
            onChange={(e) => handleChange('otherDescription', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            placeholder="Describe the additional fee"
          />
        </div>
      )}
    </div>
  );
}