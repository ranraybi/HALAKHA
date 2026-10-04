import React, { useState } from 'react';
import { HalachaItem } from '../data/shulchanAruchData';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Bookmark,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Share2,
  ZoomIn,
  ZoomOut,
  Sparkles,
} from 'lucide-react';

interface HalachaCardProps {
  halacha: HalachaItem;
  isFeatured?: boolean;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  fontSize: number; // in px, e.g. 18 to 28
  onIncreaseFontSize?: () => void;
  onDecreaseFontSize?: () => void;
}

export const HalachaCard: React.FC<HalachaCardProps> = ({
  halacha,
  isFeatured = false,
  isFavorite,
  onToggleFavorite,
  fontSize,
  onIncreaseFontSize,
  onDecreaseFontSize,
}) => {
  const [isEnayExpanded, setIsEnayExpanded] = useState<boolean>(isFeatured);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Copy to clipboard with full citation
  const handleCopy = () => {
    const textToCopy = `שולחן ערוך המקוצר - ${halacha.partTitle}
${halacha.simanTitle} (סימן ${halacha.siman}, סעיף ${halacha.seif})
נושא: ${halacha.topic}

${halacha.halachaText}

[עיני יצחק]:
${halacha.enayYitzchak}

הוראה למעשה:
${halacha.practicalNote}

(מתוך שולחן ערוך המקוצר ועיני יצחק למרן הגאון רבי יצחק רצאבי שליט"א - אתר שולחן ערוך: ${halacha.wikiUrl})`;

    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2200);
  };

  // Text to speech (Hebrew)
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('הדפדפן אינו תומך בהקראת טקסט קולית');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const fullSpeechText = `${halacha.simanTitle}. סעיף ${halacha.seif}. ${halacha.halachaText}. הוראה למעשה: ${halacha.practicalNote}`;
    const utterance = new SpeechSynthesisUtterance(fullSpeechText);
    utterance.lang = 'he-IL';
    utterance.rate = 0.92;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  return (
    <article
      className={`relative rounded-xl transition-all border ${
        isFeatured
          ? 'bg-amber-50/40 border-amber-900/20 shadow-md ring-1 ring-amber-900/10'
          : 'bg-white border-stone-200/90 hover:border-amber-700/40 shadow-xs'
      }`}
    >
      {/* Card Header Bar */}
      <div className="p-5 sm:p-6 pb-3 border-b border-stone-100">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Siman & Topic Details */}
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span className="font-semibold text-amber-900">{halacha.partTitle}</span>
              <span aria-hidden="true">·</span>
              <span>סימן {halacha.siman}</span>
              <span aria-hidden="true">·</span>
              <span>סעיף {halacha.seif}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-torah tracking-tight">
              {halacha.simanTitle}
            </h2>
            {halacha.subTopic && (
              <p className="text-xs text-stone-600 font-sans mt-0.5">
                {halacha.subTopic}
              </p>
            )}
          </div>

          {/* Quick Action Affordances */}
          <div className="flex items-center gap-1 sm:gap-1.5 self-start">
            {onIncreaseFontSize && onDecreaseFontSize && (
              <div className="hidden sm:flex items-center bg-stone-100 rounded-md p-0.5 text-xs text-stone-700 mr-2">
                <button
                  onClick={onDecreaseFontSize}
                  title="הקטן גופן"
                  className="p-1 hover:bg-stone-200 rounded transition-colors"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1 font-mono text-[11px]">{fontSize}</span>
                <button
                  onClick={onIncreaseFontSize}
                  title="הגדל גופן"
                  className="p-1 hover:bg-stone-200 rounded transition-colors"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Read aloud button */}
            <button
              onClick={handleToggleSpeech}
              title={isPlayingAudio ? 'הפסק הקראה' : 'הקרא הלכה בקול'}
              className={`p-2 rounded-md transition-colors ${
                isPlayingAudio
                  ? 'bg-amber-700 text-white animate-pulse'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {isPlayingAudio ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleFavorite(halacha.id)}
              title={isFavorite ? 'הסר ממועדפים' : 'שמור במועדפים'}
              className={`p-2 rounded-md transition-colors ${
                isFavorite
                  ? 'text-amber-700 bg-amber-100'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-700' : ''}`} />
            </button>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              title="העתק הלכה עם מקורות"
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
            >
              {isCopied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            {/* Wiki Link */}
            <a
              href={halacha.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="צפה בערך בוויקי שולחן ערוך המקוצר"
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Halacha Prose */}
      <div className="p-5 sm:p-6 py-4">
        <div
          className="font-torah leading-relaxed text-stone-900 font-medium select-text"
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
        >
          {halacha.halachaText}
        </div>

        {/* Practical summary note */}
        {halacha.practicalNote && (
          <div className="mt-4 p-3.5 bg-amber-100/50 border-r-3 border-amber-800 rounded-sm">
            <span className="text-xs font-bold text-amber-950 block mb-0.5 font-sans">
              הוראה למעשה:
            </span>
            <p className="text-sm text-stone-800 font-sans leading-relaxed">
              {halacha.practicalNote}
            </p>
          </div>
        )}
      </div>

      {/* Enay Yitzchak Commentary Section */}
      <div className="border-t border-stone-200/70 bg-stone-50/70 p-4 sm:p-5 rounded-b-xl">
        <button
          onClick={() => setIsEnayExpanded(!isEnayExpanded)}
          className="w-full flex items-center justify-between text-right text-xs sm:text-sm font-semibold text-stone-800 hover:text-amber-900 transition-colors focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <span className="font-torah text-base sm:text-lg text-amber-950 font-bold">
              עיני יצחק
            </span>
            <span className="text-[11px] text-stone-500 font-sans font-normal">
              (מקורות, מנהג שאמי ובלדי, טעמים וציונים)
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-stone-500">
            <span>{isEnayExpanded ? 'סגור ביאור' : 'פתח ביאור'}</span>
            {isEnayExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </button>

        {isEnayExpanded && (
          <div className="mt-3 pt-3 border-t border-stone-200 text-sm text-stone-800 font-sans leading-relaxed space-y-2 select-text">
            <p className="whitespace-pre-line">{halacha.enayYitzchak}</p>

            <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
              <span>מרן הגאון רבי יצחק רצאבי שליט״א</span>
              <a
                href={halacha.wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-900 hover:underline flex items-center gap-1 font-medium"
              >
                <span>הרחבה בוויקי שולחן ערוך המקוצר</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
