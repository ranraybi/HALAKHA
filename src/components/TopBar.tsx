import React from 'react';
import { Search, Bookmark } from 'lucide-react';

export type ActiveTab = 'daily' | 'schedule' | 'browse' | 'zmanim' | 'favorites';

interface TopBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  favoritesCount: number;
  onOpenSearch: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onTabChange,
  favoritesCount,
  onOpenSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b transition-colors backdrop-blur-md bg-stone-50/90 border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onTabChange('daily')}
              className="text-right group focus:outline-none cursor-pointer"
            >
              <span className="block text-xl sm:text-2xl font-bold tracking-tight text-amber-950 font-torah group-hover:text-amber-800 transition-colors">
                שולחן ערוך המקוצר
              </span>
              <span className="block text-[11px] text-stone-500 font-sans -mt-1 hidden sm:block">
                ועיני יצחק · למרן הגאון רבי יצחק רצאבי שליט״א
              </span>
            </button>
          </div>

          {/* Zone 2: 4-5 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onTabChange('daily')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'daily'
                  ? 'text-amber-900 bg-amber-100/60 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              הלכה יומית
            </button>
            <button
              onClick={() => onTabChange('schedule')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'schedule'
                  ? 'text-amber-900 bg-amber-100/60 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              סדר היום
            </button>
            <button
              onClick={() => onTabChange('zmanim')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'zmanim'
                  ? 'text-amber-900 bg-amber-100/60 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              זמני היום
            </button>
            <button
              onClick={() => onTabChange('browse')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'browse'
                  ? 'text-amber-900 bg-amber-100/60 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              כל הכרכים
            </button>
            <button
              onClick={() => onTabChange('favorites')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'favorites'
                  ? 'text-amber-900 bg-amber-100/60 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <span>מועדפים</span>
              {favoritesCount > 0 && (
                <span className="text-xs bg-amber-200/80 text-amber-900 px-1.5 py-0.2 rounded-full font-mono">
                  {favoritesCount}
                </span>
              )}
            </button>
          </nav>

          {/* Zone 3: Primary actions */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              title="חיפוש בהלכות"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-amber-950 bg-stone-100 hover:bg-stone-200/80 border border-stone-200 rounded-lg transition-colors cursor-pointer"
              aria-label="חיפוש בהלכות"
            >
              <Search className="w-3.5 h-3.5 text-amber-800" />
              <span className="hidden sm:inline">חיפוש בהלכות</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary tab strip */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-stone-200/70 text-xs">
          <button
            onClick={() => onTabChange('daily')}
            className={`py-1 px-2 cursor-pointer ${activeTab === 'daily' ? 'text-amber-900 font-bold border-b-2 border-amber-900' : 'text-stone-600'}`}
          >
            הלכה יומית
          </button>
          <button
            onClick={() => onTabChange('schedule')}
            className={`py-1 px-2 cursor-pointer ${activeTab === 'schedule' ? 'text-amber-900 font-bold border-b-2 border-amber-900' : 'text-stone-600'}`}
          >
            סדר היום
          </button>
          <button
            onClick={() => onTabChange('zmanim')}
            className={`py-1 px-2 cursor-pointer ${activeTab === 'zmanim' ? 'text-amber-900 font-bold border-b-2 border-amber-900' : 'text-stone-600'}`}
          >
            זמני היום
          </button>
          <button
            onClick={() => onTabChange('browse')}
            className={`py-1 px-2 cursor-pointer ${activeTab === 'browse' ? 'text-amber-900 font-bold border-b-2 border-amber-900' : 'text-stone-600'}`}
          >
            כרכים
          </button>
          <button
            onClick={() => onTabChange('favorites')}
            className={`py-1 px-2 cursor-pointer ${activeTab === 'favorites' ? 'text-amber-900 font-bold border-b-2 border-amber-900' : 'text-stone-600'}`}
          >
            מועדפים ({favoritesCount})
          </button>
        </div>
      </div>
    </header>
  );
};
