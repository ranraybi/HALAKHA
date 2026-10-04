import React, { useState, useEffect, useMemo } from 'react';
import {
  getHebrewDayInfo,
  ISRAEL_CITIES,
  LocationPreset,
  HebrewDayInfo,
  TimeOfDayPeriod,
} from './utils/hebrewCalendar';
import { getDailyHalachot } from './utils/dailyHalachaEngine';
import { HalachaItem, HALACHOT_DATABASE } from './data/shulchanAruchData';
import { TopBar, ActiveTab } from './components/TopBar';
import { HebrewDateHeader } from './components/HebrewDateHeader';
import { ZmanimBar } from './components/ZmanimBar';
import { HalachaCard } from './components/HalachaCard';
import { TimeOfDaysTabs } from './components/TimeOfDaysTabs';
import { VolumesBrowser } from './components/VolumesBrowser';
import { ZmanimDetailView } from './components/ZmanimDetailView';
import { FavoritesView } from './components/FavoritesView';
import { LocationPickerModal } from './components/LocationPickerModal';
import { DatePickerModal } from './components/DatePickerModal';
import { SearchModal } from './components/SearchModal';
import {
  BookOpen,
  Sparkles,
  ExternalLink,
  ChevronLeft,
} from 'lucide-react';

export default function App() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState<ActiveTab>('daily');

  // Location & Date
  const [selectedLocation, setSelectedLocation] = useState<LocationPreset>(() => {
    const saved = localStorage.getItem('sa_location_id');
    const match = ISRAEL_CITIES.find((c) => c.id === saved);
    return match || ISRAEL_CITIES[0]; // default Jerusalem
  });

  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const [isCustomDate, setIsCustomDate] = useState<boolean>(false);

  // Hebrew Day & Halacha Calculations
  const dayInfo: HebrewDayInfo = useMemo(() => {
    return getHebrewDayInfo(activeDate, selectedLocation);
  }, [activeDate, selectedLocation]);

  const dailyResult = useMemo(() => {
    return getDailyHalachot(dayInfo);
  }, [dayInfo]);

  // Reading Preferences
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('sa_font_size');
    return saved ? parseInt(saved, 10) : 21;
  });

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sa_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Time of Day filter for Schedule tab
  const [selectedPeriodFilter, setSelectedPeriodFilter] = useState<TimeOfDayPeriod | 'all' | 'special'>('all');

  // Sync clock automatically every minute if live date is used
  useEffect(() => {
    if (isCustomDate) return;
    const interval = setInterval(() => {
      setActiveDate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, [isCustomDate]);

  // Persist preferences
  useEffect(() => {
    localStorage.setItem('sa_font_size', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('sa_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('sa_location_id', selectedLocation.id);
  }, [selectedLocation]);

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Font size handlers
  const handleIncreaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 32));
  };

  const handleDecreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 16));
  };

  // Select custom date
  const handleSelectCustomDate = (date: Date) => {
    setActiveDate(date);
    setIsCustomDate(true);
  };

  const handleResetToToday = () => {
    setActiveDate(new Date());
    setIsCustomDate(false);
  };

  // Schedule Halachot list based on selected filter
  const scheduleHalachot = useMemo(() => {
    if (selectedPeriodFilter === 'all') {
      return dailyResult.allDailyHalachot;
    }
    if (selectedPeriodFilter === 'special') {
      return dailyResult.calendarSpecialHalachot.length > 0
        ? dailyResult.calendarSpecialHalachot
        : dailyResult.allDailyHalachot;
    }
    return HALACHOT_DATABASE.filter((h) => h.timeOfDayTags.includes(selectedPeriodFilter));
  }, [selectedPeriodFilter, dailyResult]);

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen selection:bg-amber-200 selection:text-amber-950" dir="rtl">
      {/* 1. Header Top Bar Contract */}
      <TopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        favoritesCount={favorites.length}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* 2. Hebrew Date & Zmanim Ribbon */}
      <HebrewDateHeader
        dayInfo={dayInfo}
        selectedLocation={selectedLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenDateModal={() => setIsDateModalOpen(true)}
        isCustomDate={isCustomDate}
        onResetToToday={handleResetToToday}
      />

      <ZmanimBar
        zmanim={dayInfo.zmanim}
        onOpenFullZmanim={() => setActiveTab('zmanim')}
      />

      {/* 3. Main Body Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: DAILY HALACHA */}
        {activeTab === 'daily' && (
          <div className="space-y-8">
            {/* Lead Section: Today's Featured Halacha */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 mb-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>הלכה יומית נבחרת לשעה זו</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-950 font-torah">
                    {dailyResult.topicTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans mt-0.5">
                    {dailyResult.timeContextDescription}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <a
                    href="https://www.shulchan-aruch.co.il/wiki/%D7%A2%D7%9E%D7%95%D7%93_%D7%A8%D7%90%D7%A9%D7%99"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-900 hover:text-amber-700 bg-amber-100/60 hover:bg-amber-100 px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    <span>לאתר ויקי שולחן ערוך המקוצר</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Primary Halacha Card */}
              <HalachaCard
                halacha={dailyResult.primaryHalacha}
                isFeatured={true}
                isFavorite={favorites.includes(dailyResult.primaryHalacha.id)}
                onToggleFavorite={handleToggleFavorite}
                fontSize={fontSize}
                onIncreaseFontSize={handleIncreaseFontSize}
                onDecreaseFontSize={handleDecreaseFontSize}
              />
            </div>

            {/* Daily Routine Summary Bar */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 font-torah">
                    סדר הלכות נוספות להיום
                  </h3>
                  <p className="text-xs text-stone-500">
                    הלכות מותאמות לשעות היום השונות וללוח השנה העברי
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className="text-xs text-amber-900 hover:underline font-semibold flex items-center gap-1 self-start"
                >
                  <span>צפה בסדר היום המלא לפי שעות</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Additional Halachot Grid */}
              <div className="space-y-4">
                {dailyResult.allDailyHalachot
                  .filter((h) => h.id !== dailyResult.primaryHalacha.id)
                  .slice(0, 4)
                  .map((halacha) => (
                    <HalachaCard
                      key={halacha.id}
                      halacha={halacha}
                      isFavorite={favorites.includes(halacha.id)}
                      onToggleFavorite={handleToggleFavorite}
                      fontSize={fontSize}
                    />
                  ))}
              </div>
            </div>

            {/* Educational Attribution Footer Card */}
            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-900/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-700">
              <div className="space-y-1 text-center md:text-right">
                <h4 className="font-bold text-sm text-amber-950 font-torah">
                  אודות ספרי "שולחן ערוך המקוצר" ו"עיני יצחק"
                </h4>
                <p className="leading-relaxed">
                  חיבורו המונומנטלי של מרן הגאון רבי יצחק רצאבי שליט״א, פוסק עדת תימן, המקיף את כל חלקי שולחן ערוך
                  לפי מנהגי תימן הקדמונים (בלדי ושאמי) בשילוב פסיקות מרן השו"ע, הרמב"ם והפוסקים.
                </p>
              </div>
              <a
                href="https://www.shulchan-aruch.co.il/wiki/%D7%A2%D7%9E%D7%95%D7%93_%D7%A8%D7%90%D7%A9%D7%99"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-4 py-2 bg-amber-900 hover:bg-amber-800 text-white rounded-lg font-medium transition-colors flex items-center gap-1.5"
              >
                <span>אתר שולחן ערוך המקוצר - יד מהרי״ץ</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* TAB 2: SCHEDULE (BY TIME OF DAY) */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-amber-950 font-torah">
                סדר הלכות היום לפי שעות
              </h2>
              <p className="text-sm text-stone-600 mt-1">
                עיין בהלכות המחולקות לפי סדר היום: השכמת הבוקר, תפילה, סעודות, מנחה, ערבית והלילה
              </p>
            </div>

            {/* Filter Tabs */}
            <TimeOfDaysTabs
              currentPeriod={dayInfo.currentPeriod}
              selectedPeriod={selectedPeriodFilter}
              onSelectPeriod={setSelectedPeriodFilter}
              hasSpecialHolidays={dailyResult.calendarSpecialHalachot.length > 0}
              specialTitle={dayInfo.holidayName || dayInfo.specialEventTitle || (dayInfo.isShabbat ? 'הלכות שבת' : 'הלכות מיוחדות')}
            />

            {/* List */}
            <div className="space-y-4">
              {scheduleHalachot.map((halacha) => (
                <HalachaCard
                  key={halacha.id}
                  halacha={halacha}
                  isFavorite={favorites.includes(halacha.id)}
                  onToggleFavorite={handleToggleFavorite}
                  fontSize={fontSize}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ZMANIM DETAIL VIEW */}
        {activeTab === 'zmanim' && (
          <ZmanimDetailView
            dayInfo={dayInfo}
            selectedLocation={selectedLocation}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
          />
        )}

        {/* TAB 4: BROWSE VOLUMES */}
        {activeTab === 'browse' && (
          <VolumesBrowser
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            fontSize={fontSize}
          />
        )}

        {/* TAB 5: FAVORITES */}
        {activeTab === 'favorites' && (
          <FavoritesView
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            fontSize={fontSize}
          />
        )}
      </main>

      {/* 4. Footer */}
      <footer className="mt-16 border-t border-stone-200/80 bg-white/70 py-8 text-center text-xs text-stone-500 font-sans">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-stone-800">
            שולחן ערוך המקוצר · הלכה יומית וזמני היום
          </p>
          <p>
            התוכן מבוסס על ספרי "שולחן ערוך המקוצר" ו"עיני יצחק" למרן הגאון רבי יצחק רצאבי שליט״א
          </p>
          <div className="flex items-center justify-center gap-4 pt-1">
            <a
              href="https://www.shulchan-aruch.co.il/wiki/%D7%A2%D7%9E%D7%95%D7%93_%D7%A8%D7%90%D7%A9%D7%99"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-900 hover:underline flex items-center gap-1 font-medium"
            >
              <span>ויקי שולחן ערוך המקוצר</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span aria-hidden="true">·</span>
            <span>מוקדש להפצת התורה וההלכה</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LocationPickerModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        selectedLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
      />

      <DatePickerModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        currentDate={activeDate}
        onSelectDate={handleSelectCustomDate}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectHalacha={(selected) => {
          setActiveTab('browse');
        }}
      />
    </div>
  );
}
