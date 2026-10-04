import React from 'react';
import { TimeOfDayPeriod } from '../utils/hebrewCalendar';
import { Sunrise, Sun, Sunset, Moon, Sparkles } from 'lucide-react';

interface TimeOfDaysTabsProps {
  currentPeriod: TimeOfDayPeriod;
  selectedPeriod: TimeOfDayPeriod | 'all' | 'special';
  onSelectPeriod: (period: TimeOfDayPeriod | 'all' | 'special') => void;
  hasSpecialHolidays: boolean;
  specialTitle?: string;
}

export const TimeOfDaysTabs: React.FC<TimeOfDaysTabsProps> = ({
  currentPeriod,
  selectedPeriod,
  onSelectPeriod,
  hasSpecialHolidays,
  specialTitle,
}) => {
  const tabs: { id: TimeOfDayPeriod | 'all' | 'special'; label: string; icon: React.ReactNode; sub: string }[] = [
    {
      id: 'all',
      label: 'כל סדר היום',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      sub: 'סדר לימוד יומי מלא',
    },
    {
      id: 'morning',
      label: 'בוקר ושחרית',
      icon: <Sunrise className="w-3.5 h-3.5" />,
      sub: 'השכמה, ציצית, תפילין, ק"ש',
    },
    {
      id: 'midday',
      label: 'חצות וסעודה',
      icon: <Sun className="w-3.5 h-3.5" />,
      sub: 'המוציא, ברכת המזון, כשרות',
    },
    {
      id: 'afternoon',
      label: 'מנחה ובין השמשות',
      icon: <Sunset className="w-3.5 h-3.5" />,
      sub: 'תפילת מנחה והכנות',
    },
    {
      id: 'evening',
      label: 'ערבית ולילה',
      icon: <Moon className="w-3.5 h-3.5" />,
      sub: 'מעריב, ק"ש שעל המיטה',
    },
  ];

  if (hasSpecialHolidays) {
    tabs.splice(1, 0, {
      id: 'special',
      label: specialTitle || 'הלכות המועד / שבת',
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-700" />,
      sub: 'הלכות מיוחדות להיום',
    });
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-stone-900 font-sans">
          סנן הלכות לפי שעת היום וסדר הלימוד:
        </h3>
        <span className="text-xs text-stone-500 hidden sm:inline">
          השעה הנוכחית מתאימה ל: <strong className="text-amber-900">{currentPeriod}</strong>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {tabs.map((tab) => {
          const isActive = selectedPeriod === tab.id;
          const isCurrentLive = tab.id === currentPeriod;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectPeriod(tab.id)}
              className={`text-right p-3 rounded-xl border transition-all text-xs focus:outline-none flex flex-col justify-between ${
                isActive
                  ? 'bg-amber-100/70 border-amber-800/40 text-amber-950 shadow-xs'
                  : 'bg-white border-stone-200 text-stone-700 hover:border-amber-700/30 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="p-1 rounded-md bg-stone-100 text-stone-700">
                  {tab.icon}
                </span>
                {isCurrentLive && (
                  <span className="text-[10px] text-amber-800 font-bold px-1.5 py-0.2 bg-amber-200/60 rounded">
                    השעה כעת
                  </span>
                )}
              </div>
              <span className="font-bold text-sm block mt-1">{tab.label}</span>
              <span className="text-[11px] text-stone-500 mt-0.5 truncate block">
                {tab.sub}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
