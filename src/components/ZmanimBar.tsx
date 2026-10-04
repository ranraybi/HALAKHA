import React from 'react';
import { HalachicTimes } from '../utils/hebrewCalendar';
import { Sun, Sunset, Sunrise, Clock4, Compass } from 'lucide-react';

interface ZmanimBarProps {
  zmanim: HalachicTimes;
  onOpenFullZmanim: () => void;
}

export const ZmanimBar: React.FC<ZmanimBarProps> = ({ zmanim, onOpenFullZmanim }) => {
  const zmanList = [
    { label: 'עלות השחר', time: zmanim.alotHashachar, desc: 'תחילת חיוב תענית' },
    { label: 'נץ החמה', time: zmanim.netzHachama, desc: 'תפילת ותיקין' },
    { label: 'סוף זמן ק"ש (מג"א)', time: zmanim.sofZmanShmaMGA, desc: 'מג"א' },
    { label: 'סוף זמן ק"ש (גר"א)', time: zmanim.sofZmanShmaGra, desc: 'גר"א ורמב"ם' },
    { label: 'סוף זמן תפילה', time: zmanim.sofZmanTfillaGra, desc: 'תפילת שחרית' },
    { label: 'חצות היום', time: zmanim.chatzot, desc: 'חצי היום' },
    { label: 'מנחה גדולה', time: zmanim.minchaGedola, desc: 'תחילת זמן מנחה' },
    { label: 'פלג המנחה', time: zmanim.plagHamincha, desc: 'שעה ורבע קודם השקיעה' },
    { label: 'שקיעת החמה', time: zmanim.shekiya, desc: 'סוף זמן מנחה' },
    { label: 'צאת הכוכבים', time: zmanim.tzeitHakochavim, desc: 'תחילת זמן ערבית' },
  ];

  return (
    <section className="bg-stone-100/70 border-b border-stone-200/80 py-2.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Scrollable list of zmanim */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            <span className="text-stone-500 font-semibold shrink-0 flex items-center gap-1">
              <Clock4 className="w-3.5 h-3.5 text-amber-800" />
              <span>זמני היום:</span>
            </span>

            {zmanList.map((z, idx) => (
              <div key={idx} className="flex items-center gap-1.5 shrink-0">
                <span className="text-stone-600">{z.label}:</span>
                <span className="font-mono font-bold text-stone-900 tabular-nums">
                  {z.time}
                </span>
                {idx < zmanList.length - 1 && (
                  <span className="text-stone-300 mr-2" aria-hidden="true">·</span>
                )}
              </div>
            ))}
          </div>

          {/* Quick link to detailed zmanim */}
          <button
            onClick={onOpenFullZmanim}
            className="text-xs text-amber-900 hover:text-amber-700 font-medium shrink-0 underline decoration-dotted transition-colors"
          >
            לוח זמנים מורחב
          </button>
        </div>
      </div>
    </section>
  );
};
