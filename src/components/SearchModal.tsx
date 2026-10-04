import React, { useState } from 'react';
import { X, Search, BookOpen, ExternalLink } from 'lucide-react';
import { HALACHOT_DATABASE, HalachaItem } from '../data/shulchanAruchData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHalacha: (halacha: HalachaItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectHalacha,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? HALACHOT_DATABASE.filter((h) => {
        const q = query.trim().toLowerCase();
        return (
          h.halachaText.toLowerCase().includes(q) ||
          h.simanTitle.toLowerCase().includes(q) ||
          h.enayYitzchak.toLowerCase().includes(q) ||
          h.topic.toLowerCase().includes(q) ||
          h.practicalNote.toLowerCase().includes(q) ||
          `סימן ${h.siman}`.includes(q)
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3 bg-stone-50">
          <Search className="w-5 h-5 text-amber-800 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="חפש בהלכות (למשל: תפילין, נטילת ידים, ברכת המזון, שבת, קידוש, סוכה)..."
            className="w-full bg-transparent text-sm outline-none text-stone-900 font-sans placeholder:text-stone-400"
          />
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {query.trim() === '' ? (
            <div className="text-center py-10 text-stone-400 text-xs">
              הקלד מילה לחיפוש בכל כרכי שולחן ערוך המקוצר ועיני יצחק
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10 text-stone-500 text-xs">
              לא נמצאו תוצאות עבור "{query}"
            </div>
          ) : (
            results.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectHalacha(item);
                  onClose();
                }}
                className="w-full text-right p-3 rounded-xl border border-stone-200 hover:border-amber-700/50 hover:bg-amber-50/40 transition-colors block"
              >
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span className="font-semibold text-amber-900">{item.partTitle}</span>
                  <span>סימן {item.siman}, סעיף {item.seif}</span>
                </div>
                <h4 className="text-sm font-bold text-stone-900 font-torah">
                  {item.simanTitle}
                </h4>
                <p className="text-xs text-stone-600 line-clamp-2 mt-1 font-sans">
                  {item.halachaText}
                </p>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 text-xs text-stone-500 flex justify-between items-center">
          <span>נמצאו {results.length} תוצאות</span>
          <span>לחץ על תוצאה לצפייה בהלכה המלאה</span>
        </div>
      </div>
    </div>
  );
};
