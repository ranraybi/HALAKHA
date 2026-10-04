import React, { useState, useMemo } from 'react';
import { X, Calendar as CalendarIcon, Search, Sparkles, Check, ArrowRight } from 'lucide-react';
import { HDate } from '@hebcal/core';
import { HEBREW_DAYS_OF_WEEK } from '../utils/hebrewCalendar';

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDate: Date;
  onSelectDate: (d: Date) => void;
}

const HEBREW_MONTHS_LIST = [
  { key: 'Tishrei', name: 'תשרי' },
  { key: 'Cheshvan', name: 'חשוון (מרחשוון)' },
  { key: 'Kislev', name: 'כסלו' },
  { key: 'Tevet', name: 'טבת' },
  { key: 'Sh\'vat', name: 'שבט' },
  { key: 'Adar', name: 'אדר (אדר ב׳ במעוברת)' },
  { key: 'Adar I', name: 'אדר א׳' },
  { key: 'Nisan', name: 'ניסן' },
  { key: 'Iyyar', name: 'אייר' },
  { key: 'Sivan', name: 'סיוון' },
  { key: 'Tamuz', name: 'תמוז' },
  { key: 'Av', name: 'אב (מנחם אב)' },
  { key: 'Elul', name: 'אלול' },
];

const HEBREW_DAYS_GEMATRIYA: { num: number; label: string }[] = [
  { num: 1, label: 'א׳' },
  { num: 2, label: 'ב׳' },
  { num: 3, label: 'ג׳' },
  { num: 4, label: 'ד׳' },
  { num: 5, label: 'ה׳' },
  { num: 6, label: 'ו׳' },
  { num: 7, label: 'ז׳' },
  { num: 8, label: 'ח׳' },
  { num: 9, label: 'ט׳' },
  { num: 10, label: 'י׳' },
  { num: 11, label: 'י״א' },
  { num: 12, label: 'י״ב' },
  { num: 13, label: 'י״ג' },
  { num: 14, label: 'י״ד' },
  { num: 15, label: 'ט״ו' },
  { num: 16, label: 'ט״ז' },
  { num: 17, label: 'י״ז' },
  { num: 18, label: 'י״ח' },
  { num: 19, label: 'י״ט' },
  { num: 20, label: 'כ׳' },
  { num: 21, label: 'כ״א' },
  { num: 22, label: 'כ״ב' },
  { num: 23, label: 'כ״ג' },
  { num: 24, label: 'כ״ד' },
  { num: 25, label: 'כ״ה' },
  { num: 26, label: 'כ״ו' },
  { num: 27, label: 'כ״ז' },
  { num: 28, label: 'כ״ח' },
  { num: 29, label: 'כ״ט' },
  { num: 30, label: 'ל׳' },
];

const HEBREW_YEARS_LIST = [
  { year: 5784, label: 'ה׳תשפ״ד (2023-2024)' },
  { year: 5785, label: 'ה׳תשפ״ה (2024-2025)' },
  { year: 5786, label: 'ה׳תשפ״ו (2025-2026)' },
  { year: 5787, label: 'ה׳תשפ״ז (2026-2027)' },
  { year: 5788, label: 'ה׳תשפ״ח (2027-2028)' },
  { year: 5789, label: 'ה׳תשפ״ט (2028-2029)' },
  { year: 5790, label: 'ה׳תש״ץ (2029-2030)' },
];

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isOpen,
  onClose,
  currentDate,
  onSelectDate,
}) => {
  const currentHDate = useMemo(() => new HDate(currentDate), [currentDate]);

  // Tab: 'hebrew' | 'gregorian' | 'holidays'
  const [activeTab, setActiveTab] = useState<'hebrew' | 'gregorian' | 'holidays'>('hebrew');

  // Hebrew Picker State
  const [selectedHebDay, setSelectedHebDay] = useState<number>(() => currentHDate.getDate());
  const [selectedHebMonth, setSelectedHebMonth] = useState<string>(() => currentHDate.getMonthName());
  const [selectedHebYear, setSelectedHebYear] = useState<number>(() => currentHDate.getFullYear());

  // Free Hebrew Search Input
  const [hebrewSearchQuery, setHebrewSearchQuery] = useState<string>('');

  // Gregorian Input State
  const [gregorianInputValue, setGregorianInputValue] = useState<string>(
    () => currentDate.toISOString().split('T')[0]
  );

  // Compute preview for selected Hebrew Date
  const hebrewPreview = useMemo(() => {
    try {
      const h = new HDate(selectedHebDay, selectedHebMonth, selectedHebYear);
      const gDate = h.greg();
      const dayOfWeek = HEBREW_DAYS_OF_WEEK[gDate.getDay()];
      const hebrewStr = h.renderGematriya(true);
      const gregStr = gDate.toLocaleDateString('he-IL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      return { gDate, dayOfWeek, hebrewStr, gregStr, isValid: true };
    } catch {
      return { gDate: currentDate, dayOfWeek: '', hebrewStr: '', gregStr: '', isValid: false };
    }
  }, [selectedHebDay, selectedHebMonth, selectedHebYear, currentDate]);

  if (!isOpen) return null;

  // Apply Hebrew Date selection
  const handleApplyHebrewDate = () => {
    if (hebrewPreview.isValid) {
      onSelectDate(hebrewPreview.gDate);
      onClose();
    }
  };

  // Apply Gregorian Date form
  const handleApplyGregorianDate = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = gregorianInputValue.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const newD = new Date(currentDate);
      newD.setFullYear(year, month, day);
      onSelectDate(newD);
      onClose();
    }
  };

  // Quick holiday presets
  const presets = [
    { label: 'היום הנוכחי (זמן אמת)', action: () => onSelectDate(new Date()) },
    {
      label: 'ערב שבת (הכנות והדלקת נרות)',
      action: () => {
        const d = new Date();
        const diff = (5 - d.getDay() + 7) % 7;
        d.setDate(d.getDate() + (diff === 0 ? 7 : diff));
        d.setHours(15, 0, 0);
        onSelectDate(d);
      },
    },
    {
      label: 'שבת קודש (קידוש, סעודות, מלאכות)',
      action: () => {
        const d = new Date();
        const diff = (6 - d.getDay() + 7) % 7;
        d.setDate(d.getDate() + (diff === 0 ? 7 : diff));
        d.setHours(10, 0, 0);
        onSelectDate(d);
      },
    },
    {
      label: 'ראש חודש',
      action: () => {
        const h = new HDate(currentDate);
        const nextRoshChodesh = new HDate(1, h.getMonth() === 12 ? 1 : h.getMonth() + 1, h.getFullYear());
        onSelectDate(nextRoshChodesh.greg());
      },
    },
    {
      label: 'ראש השנה (א׳-ב׳ תשרי)',
      action: () => {
        const h = new HDate(1, 'Tishrei', selectedHebYear);
        onSelectDate(h.greg());
      },
    },
    {
      label: 'יום הכיפורים (י׳ תשרי)',
      action: () => {
        const h = new HDate(10, 'Tishrei', selectedHebYear);
        onSelectDate(h.greg());
      },
    },
    {
      label: 'חג הסוכות (ט״ו תשרי)',
      action: () => {
        const h = new HDate(15, 'Tishrei', selectedHebYear);
        onSelectDate(h.greg());
      },
    },
    {
      label: 'חנוכה (כ״ה כסלו)',
      action: () => {
        const h = new HDate(25, 'Kislev', selectedHebYear);
        onSelectDate(h.greg());
      },
    },
    {
      label: 'ט״ו בשבט',
      action: () => {
        const h = new HDate(15, 'Sh\'vat', selectedHebYear);
        onSelectDate(h.greg());
      },
    },
    {
      label: 'פורים (י״ד אדר)',
      action: () => {
        const h = new HDate(14, 'Adar', selectedHebYear);
        onSelectDate(h.greg());
      },
    },
    {
      label: 'חג הפסח וליל הסדר (ט״ו ניסן)',
      action: () => {
        const h = new HDate(15, 'Nisan', selectedHebYear);
        onSelectDate(h.greg());
      },
    },
    {
      label: 'ספירת העומר (ט״ז ניסן עד ה׳ סיוון)',
      action: () => {
        const h = new HDate(18, 'Nisan', selectedHebYear);
        onSelectDate(h.greg());
      },
    },
    {
      label: 'חג השבועות (ו׳ סיוון)',
      action: () => {
        const h = new HDate(6, 'Sivan', selectedHebYear);
        onSelectDate(h.greg());
      },
    },
    {
      label: 'צום תשעה באב (ט׳ באב)',
      action: () => {
        const h = new HDate(9, 'Av', selectedHebYear);
        onSelectDate(h.greg());
      },
    },
    {
      label: 'חודש אלול וסליחות (א׳-כ״ט אלול)',
      action: () => {
        const h = new HDate(15, 'Elul', selectedHebYear);
        onSelectDate(h.greg());
      },
    },
  ];

  // Quick hebrew query recognition
  const handleHebrewSearch = (q: string) => {
    setHebrewSearchQuery(q);
    const cleaned = q.trim();
    if (!cleaned) return;

    // Check for month names in query
    for (const m of HEBREW_MONTHS_LIST) {
      if (cleaned.includes(m.name.split(' ')[0]) || cleaned.includes(m.key)) {
        setSelectedHebMonth(m.key);
        break;
      }
    }

    // Check for days
    for (const d of HEBREW_DAYS_GEMATRIYA) {
      const bare = d.label.replace(/[״׳]/g, '');
      if (cleaned.includes(d.label) || cleaned.includes(bare)) {
        setSelectedHebDay(d.num);
        break;
      }
    }

    // Check holidays shortcuts
    if (cleaned.includes('פורים')) {
      setSelectedHebDay(14);
      setSelectedHebMonth('Adar');
    } else if (cleaned.includes('פסח') || cleaned.includes('סדר')) {
      setSelectedHebDay(15);
      setSelectedHebMonth('Nisan');
    } else if (cleaned.includes('סוכות')) {
      setSelectedHebDay(15);
      setSelectedHebMonth('Tishrei');
    } else if (cleaned.includes('כיפור')) {
      setSelectedHebDay(10);
      setSelectedHebMonth('Tishrei');
    } else if (cleaned.includes('חנוכה')) {
      setSelectedHebDay(25);
      setSelectedHebMonth('Kislev');
    } else if (cleaned.includes('טו בשבט') || cleaned.includes('ט״ו בשבט')) {
      setSelectedHebDay(15);
      setSelectedHebMonth('Sh\'vat');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100 bg-stone-50">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-amber-800" />
            <h3 className="text-lg font-bold text-amber-950 font-torah">
              בחירה וחיפוש תאריך להלכות יומיות
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-stone-200 bg-stone-100/70 p-1">
          <button
            onClick={() => setActiveTab('hebrew')}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'hebrew'
                ? 'bg-white text-amber-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            חיפוש ובחירה לפי תאריך עברי
          </button>
          <button
            onClick={() => setActiveTab('gregorian')}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'gregorian'
                ? 'bg-white text-amber-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            לוח לועזי
          </button>
          <button
            onClick={() => setActiveTab('holidays')}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'holidays'
                ? 'bg-white text-amber-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            מועדים וחגים
          </button>
        </div>

        <div className="p-5 max-h-[70vh] overflow-y-auto space-y-5">
          {/* TAB 1: HEBREW DATE SEARCH & PICKER */}
          {activeTab === 'hebrew' && (
            <div className="space-y-5">
              {/* Quick Text Search */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  חיפוש מהיר של תאריך או מועד עברי:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={hebrewSearchQuery}
                    onChange={(e) => handleHebrewSearch(e.target.value)}
                    placeholder="לדוגמה: טו בשבט, יד ניסן, פורים, ראש חודש כסלו, כה כסלו, א אלול..."
                    className="w-full pl-3 pr-9 py-2 border border-stone-300 rounded-lg text-sm outline-none focus:border-amber-700 font-sans"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute right-3 top-2.5" />
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-stone-500">
                  <span>דוגמאות נפוצות:</span>
                  <button
                    type="button"
                    onClick={() => handleHebrewSearch('טו בשבט')}
                    className="text-amber-800 hover:underline cursor-pointer"
                  >
                    ט״ו בשבט
                  </button>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => handleHebrewSearch('יד אדר')}
                    className="text-amber-800 hover:underline cursor-pointer"
                  >
                    י״ד באדר (פורים)
                  </button>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => handleHebrewSearch('טו ניסן')}
                    className="text-amber-800 hover:underline cursor-pointer"
                  >
                    ט״ו בניסן (פסח)
                  </button>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => handleHebrewSearch('א אלול')}
                    className="text-amber-800 hover:underline cursor-pointer"
                  >
                    א׳ באלול
                  </button>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => handleHebrewSearch('כה כסלו')}
                    className="text-amber-800 hover:underline cursor-pointer"
                  >
                    כ״ה בכסלו (חנוכה)
                  </button>
                </div>
              </div>

              {/* 3 Dropdowns: Day, Month, Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
                {/* Hebrew Day */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    יום בחודש העברי:
                  </label>
                  <select
                    value={selectedHebDay}
                    onChange={(e) => setSelectedHebDay(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm font-medium outline-none focus:border-amber-700 cursor-pointer"
                  >
                    {HEBREW_DAYS_GEMATRIYA.map((d) => (
                      <option key={d.num} value={d.num}>
                        {d.label} ({d.num})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Hebrew Month */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    חודש עברי:
                  </label>
                  <select
                    value={selectedHebMonth}
                    onChange={(e) => setSelectedHebMonth(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm font-medium outline-none focus:border-amber-700 cursor-pointer"
                  >
                    {HEBREW_MONTHS_LIST.map((m) => (
                      <option key={m.key} value={m.key}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Hebrew Year */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    שנה עברית:
                  </label>
                  <select
                    value={selectedHebYear}
                    onChange={(e) => setSelectedHebYear(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm font-medium outline-none focus:border-amber-700 cursor-pointer"
                  >
                    {HEBREW_YEARS_LIST.map((y) => (
                      <option key={y.year} value={y.year}>
                        {y.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Real-time Preview Banner */}
              {hebrewPreview.isValid && (
                <div className="p-4 bg-amber-50/80 border border-amber-800/30 rounded-xl space-y-1">
                  <span className="text-xs text-amber-900 font-bold block">
                    תאריך שנקבע להצגת הלכות:
                  </span>
                  <div className="text-base font-bold text-amber-950 font-torah">
                    {hebrewPreview.dayOfWeek}, {hebrewPreview.hebrewStr}
                  </div>
                  <div className="text-xs text-stone-600 font-sans">
                    תאריך לועזי תואם: {hebrewPreview.gregStr}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                type="button"
                onClick={handleApplyHebrewDate}
                className="w-full py-2.5 bg-amber-900 hover:bg-amber-800 text-white font-bold rounded-xl text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>הצג הלכות לפי תאריך עברי זה</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 2: GREGORIAN DATE PICKER */}
          {activeTab === 'gregorian' && (
            <form onSubmit={handleApplyGregorianDate} className="space-y-4">
              <label className="block text-xs font-bold text-stone-700">
                בחר תאריך לפי לוח השנה הכללי (המערכת תמיר אוטומטית לתאריך העברי ולשולחן ערוך המקוצר):
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={gregorianInputValue}
                  onChange={(e) => setGregorianInputValue(e.target.value)}
                  className="flex-1 px-3 py-2.5 border border-stone-300 rounded-lg text-sm outline-none focus:border-amber-700 font-sans"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-900 hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  הצג הלכות
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: HOLIDAYS & SPECIAL DAYS */}
          {activeTab === 'holidays' && (
            <div className="space-y-3">
              <span className="block text-xs font-bold text-stone-700">
                בחר מועד, חג או יום מיוחד כדי לצפות בהלכותיו בשולחן ערוך המקוצר:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      preset.action();
                      onClose();
                    }}
                    className="text-right p-3 rounded-xl border border-stone-200 hover:border-amber-800/40 hover:bg-amber-50/60 text-xs text-stone-800 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{preset.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
          <button
            onClick={() => {
              onSelectDate(new Date());
              onClose();
            }}
            className="text-xs text-amber-900 hover:underline font-semibold cursor-pointer"
          >
            חזרה להיום (זמן אמת)
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
};
