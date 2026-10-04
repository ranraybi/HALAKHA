import React, { useState, useMemo } from 'react';
import { SHULCHAN_ARUCH_PARTS, HALACHOT_DATABASE, HalachaItem } from '../data/shulchanAruchData';
import { HalachaCard } from './HalachaCard';
import { Search, BookMarked, Filter, Layers } from 'lucide-react';

interface VolumesBrowserProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  fontSize: number;
  initialSearchQuery?: string;
}

export const VolumesBrowser: React.FC<VolumesBrowserProps> = ({
  favorites,
  onToggleFavorite,
  fontSize,
  initialSearchQuery = '',
}) => {
  const [selectedPart, setSelectedPart] = useState<number | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  // Extract unique topics
  const allTopics = useMemo(() => {
    const set = new Set<string>();
    HALACHOT_DATABASE.forEach((h) => set.add(h.topic));
    return Array.from(set);
  }, []);

  // Filter halachot
  const filteredHalachot = useMemo(() => {
    return HALACHOT_DATABASE.filter((item) => {
      if (selectedPart !== 'all' && item.partNumber !== selectedPart) return false;
      if (selectedTopic !== 'all' && item.topic !== selectedTopic) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const textMatch =
          item.halachaText.toLowerCase().includes(query) ||
          item.simanTitle.toLowerCase().includes(query) ||
          item.enayYitzchak.toLowerCase().includes(query) ||
          item.topic.toLowerCase().includes(query) ||
          item.practicalNote.toLowerCase().includes(query) ||
          `סימן ${item.siman}`.includes(query) ||
          `חלק ${item.partNumber}`.includes(query);
        if (!textMatch) return false;
      }
      return true;
    });
  }, [selectedPart, selectedTopic, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-amber-950 font-torah">
            עיון בכרכי שולחן ערוך המקוצר
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            עיין בכל כרכי השו"ע המקוצר וביאור עיני יצחק למרן הגאון רבי יצחק רצאבי שליט״א
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="חפש לפי סימן, נושא, מילה בהלכה, או פירוש עיני יצחק..."
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-stone-300 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none text-sm font-sans"
          />
          <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3.5 top-2.5 text-xs text-stone-500 hover:text-stone-800 bg-stone-100 px-1.5 py-0.5 rounded"
            >
              נקה
            </button>
          )}
        </div>

        {/* Volumes Selector */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-2">
            בחר כרך:
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedPart('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedPart === 'all'
                  ? 'bg-amber-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              כל הכרכים
            </button>
            {SHULCHAN_ARUCH_PARTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPart(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedPart === p.id
                    ? 'bg-amber-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* Topics Selector */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-2">
            נושא הלכתי:
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedTopic('all')}
              className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                selectedTopic === 'all'
                  ? 'bg-amber-200 text-amber-950 font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              הכל
            </button>
            {allTopics.map((top) => (
              <button
                key={top}
                onClick={() => setSelectedTopic(top)}
                className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                  selectedTopic === top
                    ? 'bg-amber-200 text-amber-950 font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {top}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
          <span>נמצאו {filteredHalachot.length} הלכות</span>
          <span>שולחן ערוך המקוצר ועיני יצחק</span>
        </div>

        {filteredHalachot.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200 p-8">
            <BookMarked className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800">
              לא נמצאו הלכות התואמות לחיפוש
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              נסה לחפש במילים אחרות או לאפס את המסננים.
            </p>
            <button
              onClick={() => {
                setSelectedPart('all');
                setSelectedTopic('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-amber-900 text-white rounded-lg text-xs font-medium"
            >
              אפס מסננים
            </button>
          </div>
        ) : (
          filteredHalachot.map((halacha) => (
            <HalachaCard
              key={halacha.id}
              halacha={halacha}
              isFavorite={favorites.includes(halacha.id)}
              onToggleFavorite={onToggleFavorite}
              fontSize={fontSize}
            />
          ))
        )}
      </div>
    </div>
  );
};
