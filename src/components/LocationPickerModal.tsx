import React from 'react';
import { ISRAEL_CITIES, LocationPreset } from '../utils/hebrewCalendar';
import { X, MapPin, Check } from 'lucide-react';

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation: LocationPreset;
  onSelectLocation: (loc: LocationPreset) => void;
}

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isOpen,
  onClose,
  selectedLocation,
  onSelectLocation,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full border border-stone-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100 bg-stone-50">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-800" />
            <h3 className="text-lg font-bold text-amber-950 font-torah">
              בחירת עיר ואופק לזמני היום
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* City list */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-1">
          {ISRAEL_CITIES.map((city) => {
            const isSelected = city.id === selectedLocation.id;
            return (
              <button
                key={city.id}
                onClick={() => {
                  onSelectLocation(city);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-right transition-colors ${
                  isSelected
                    ? 'bg-amber-100/70 text-amber-950 font-bold border border-amber-800/20'
                    : 'hover:bg-stone-100 text-stone-700'
                }`}
              >
                <div>
                  <span className="block text-sm">{city.hebrewName}</span>
                  <span className="block text-[11px] text-stone-500 font-sans">
                    {city.name} · גובה {city.elevation} מ׳
                  </span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-amber-900" />}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-500 font-sans">
            זמני היום (נץ, שמע, מנחה, שקיעה) מחושבים אוטומטית לפי קו הרוחב והגובה של העיר הנבחרת
          </p>
        </div>
      </div>
    </div>
  );
};
