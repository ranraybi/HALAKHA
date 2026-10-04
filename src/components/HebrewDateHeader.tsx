import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, ChevronLeft, RotateCcw } from 'lucide-react';
import { HebrewDayInfo, LocationPreset } from '../utils/hebrewCalendar';

interface HebrewDateHeaderProps {
  dayInfo: HebrewDayInfo;
  selectedLocation: LocationPreset;
  onOpenLocationModal: () => void;
  onOpenDateModal: () => void;
  isCustomDate: boolean;
  onResetToToday: () => void;
}

export const HebrewDateHeader: React.FC<HebrewDateHeaderProps> = ({
  dayInfo,
  selectedLocation,
  onOpenLocationModal,
  onOpenDateModal,
  isCustomDate,
  onResetToToday,
}) => {
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      const s = now.getSeconds().toString().padStart(2, '0');
      setCurrentTimeStr(`${h}:${m}:${s}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-stone-50 to-stone-50 border-b border-stone-200/80 pt-6 pb-5">
      {/* Decorative subtle header background motif */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          
          {/* Main Date & Occasion Lockup */}
          <div className="space-y-1.5">
            {/* Top metadata line with typographic separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 font-medium">
              <span>{dayInfo.dayOfWeekName}</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <button
                onClick={onOpenLocationModal}
                className="inline-flex items-center gap-1 hover:text-amber-900 transition-colors cursor-pointer group"
                title="שינוי מיקום לחישוב זמני היום"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-800" />
                <span className="underline decoration-dotted group-hover:decoration-solid">
                  אופק {selectedLocation.hebrewName}
                </span>
              </button>
              <span aria-hidden="true" className="text-stone-300">·</span>
              {dayInfo.parashatHashavua && (
                <span>פרשת {dayInfo.parashatHashavua}</span>
              )}
              {dayInfo.holidayName && (
                <>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span className="text-amber-800 font-semibold">{dayInfo.holidayName}</span>
                </>
              )}
              {dayInfo.specialEventTitle && !dayInfo.holidayName && (
                <>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span className="text-amber-800">{dayInfo.specialEventTitle}</span>
                </>
              )}
              {dayInfo.omerDay && (
                <>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span className="text-amber-900">יום {dayInfo.omerDay} לעומר</span>
                </>
              )}
            </div>

            {/* Prominent Hebrew Date Title */}
            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-950 font-torah tracking-tight">
                {dayInfo.hebrewDateStr}
              </h1>

              {/* Gregorian Date Subdued */}
              <span className="text-sm sm:text-base text-stone-500 font-sans">
                ({dayInfo.date.toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })})
              </span>

              {isCustomDate && (
                <button
                  onClick={onResetToToday}
                  className="inline-flex items-center gap-1 text-xs text-amber-800 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>חזרה לתאריך של היום</span>
                </button>
              )}
            </div>

            {/* Current Halachic Phase Description */}
            <p className="text-sm text-stone-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              <span>עת עתה: <strong className="font-semibold text-stone-900">{dayInfo.periodHebrewName}</strong></span>
              <span className="text-stone-400">·</span>
              <span className="text-stone-500 text-xs">הלכות יומיות מותאמות לשעה זו לפי שו״ע המקוצר</span>
            </p>
          </div>

          {/* Right Action / Quick Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-start md:self-end">
            {/* Live Clock display */}
            <div className="flex items-center gap-2 bg-stone-100/90 border border-stone-200 px-3 py-1.5 rounded-lg text-stone-800 font-mono text-sm tabular-nums">
              <Clock className="w-4 h-4 text-amber-800" />
              <span>{currentTimeStr || '--:--:--'}</span>
            </div>

            {/* Choose Date button */}
            <button
              onClick={onOpenDateModal}
              className="inline-flex items-center gap-1.5 bg-white border border-stone-300 hover:border-amber-700 hover:text-amber-950 text-stone-700 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-xs"
            >
              <Calendar className="w-4 h-4 text-stone-500" />
              <span>בחירת תאריך אחר</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
