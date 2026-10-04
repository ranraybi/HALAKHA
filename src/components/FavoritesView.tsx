import React from 'react';
import { HalachaItem, HALACHOT_DATABASE } from '../data/shulchanAruchData';
import { HalachaCard } from './HalachaCard';
import { Bookmark, Printer } from 'lucide-react';

interface FavoritesViewProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  fontSize: number;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  onToggleFavorite,
  fontSize,
}) => {
  const favoriteItems = HALACHOT_DATABASE.filter((h) => favorites.includes(h.id));

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-amber-950 font-torah">
            הלכות שמורות ומועדפים
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            הלכות שסימנת לשמירה, עיון חוזר והדפסה לשולחן שבת
          </p>
        </div>

        {favoriteItems.length > 0 && (
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>הדפס מועדפים</span>
          </button>
        )}
      </div>

      {favoriteItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-stone-200 p-8">
          <Bookmark className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-stone-800">
            עדיין לא שמרת הלכות במועדפים
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            לחץ על סמל הסימניה בכל כרטיס הלכה כדי לשמור אותה כאן לעיון נוסף.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {favoriteItems.map((halacha) => (
            <HalachaCard
              key={halacha.id}
              halacha={halacha}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              fontSize={fontSize}
            />
          ))}
        </div>
      )}
    </div>
  );
};
