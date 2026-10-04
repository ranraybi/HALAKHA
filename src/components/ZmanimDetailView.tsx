import React from 'react';
import { HebrewDayInfo, LocationPreset } from '../utils/hebrewCalendar';
import { Clock, Sunrise, Sun, Sunset, Moon, Info, MapPin } from 'lucide-react';

interface ZmanimDetailViewProps {
  dayInfo: HebrewDayInfo;
  selectedLocation: LocationPreset;
  onOpenLocationModal: () => void;
}

export const ZmanimDetailView: React.FC<ZmanimDetailViewProps> = ({
  dayInfo,
  selectedLocation,
  onOpenLocationModal,
}) => {
  const z = dayInfo.zmanim;

  const items = [
    {
      title: 'עלות השחר',
      time: z.alotHashachar,
      desc: 'תחילת הארת המזרח (72 דקות זמניות לפני הנץ). תחילת חיוב תעניות ציבור, וסוף זמן אכילה בליל תענית.',
      icon: <Sunrise className="w-5 h-5 text-amber-700" />,
    },
    {
      title: 'משיכיר (ציצית ותפילין)',
      time: z.misheyakir,
      desc: 'שיכיר בין תכלת ללבן או את חברו ברחוק ד׳ אמות. מזמן זה מברכים על טלית ותפילין וקוראים ק"ש לכתחילה.',
      icon: <Sunrise className="w-5 h-5 text-amber-600" />,
    },
    {
      title: 'נץ החמה',
      time: z.netzHachama,
      desc: 'היראות גוף השמש באופק. תפילת ותיקין עומדים בשמונה עשרה בדיוק ברגע זה, לסמוך גאולה לתפילה.',
      icon: <Sun className="w-5 h-5 text-amber-500" />,
    },
    {
      title: 'סוף זמן קריאת שמע (מג״א)',
      time: z.sofZmanShmaMGA,
      desc: 'סוף שעה 3 זמנית לפי מגן אברהם (מעלות השחר עד צאת הכוכבים). ראוי לכל ירא שמים להקדים לקרוא קודם זמן זה.',
      icon: <Clock className="w-5 h-5 text-amber-800" />,
    },
    {
      title: 'סוף זמן קריאת שמע (גר״א ורמב״ם)',
      time: z.sofZmanShmaGra,
      desc: 'סוף שעה 3 זמנית מהנץ עד השקיעה כדעת הרמב"ם והגר"א. בדיעבד מי שקרא עד זמן זה יצא ידי חובת ק"ש בזמנה.',
      icon: <Clock className="w-5 h-5 text-amber-900" />,
    },
    {
      title: 'סוף זמן תפילה (שחרית)',
      time: z.sofZmanTfillaGra,
      desc: 'סוף שעה 4 זמנית של היום. עד זמן זה מתפללים שחרית ומקבלים שכר תפילה בזמנה. לאחר מכן מתפלל ואין לו שכר תפילה בזמנה.',
      icon: <Clock className="w-5 h-5 text-stone-700" />,
    },
    {
      title: 'חצות היום והלילה',
      time: z.chatzot,
      desc: 'נקודת אמצע היום שבה השמש מגיעה לרום השמים. בדיוק 12 שעות קודם/אחר חל חצות לילה לחובבי תורה ותיקון חצות.',
      icon: <Sun className="w-5 h-5 text-amber-600" />,
    },
    {
      title: 'מנחה גדולה',
      time: z.minchaGedola,
      desc: 'שש שעות ומחצה זמניות מהנץ (חצי שעה זמנית אחר חצות). מזמן זה מתחיל עיקר זמנה של תפילת המנחה.',
      icon: <Sunset className="w-5 h-5 text-orange-600" />,
    },
    {
      title: 'מנחה קטנה',
      time: z.minchaKetana,
      desc: 'תשע שעות ומחצה זמניות מהנץ. זמן מובחר ומכוון ביותר לתפילת מנחה, שהרי אליהו לא נענה אלא בתפילת המנחה.',
      icon: <Sunset className="w-5 h-5 text-orange-700" />,
    },
    {
      title: 'פלג המנחה',
      time: z.plagHamincha,
      desc: 'שעה ורבע זמנית קודם שקיעת החמה (שעה 10 ושלושת רבעי). המתפלל מנחה לפני פלג יכול לקבל שבת מוקדם ולהתפלל ערבית מפלג.',
      icon: <Sunset className="w-5 h-5 text-rose-700" />,
    },
    {
      title: 'שקיעת החמה',
      time: z.shekiya,
      desc: 'היעלמות גוף השמש מעבר לאופק המערבי. סוף זמן תפילת מנחה, ותחילת זמן "בין השמשות" שהוא ספק יום ספק לילה.',
      icon: <Sunset className="w-5 h-5 text-purple-700" />,
    },
    {
      title: 'צאת הכוכבים',
      time: z.tzeitHakochavim,
      desc: 'היראות 3 כוכבים בינוניים ברקיע (כ-20 עד 25 דקות אחר השקיעה). תחילת לילה ודאי, זמן קריאת שמע של ערבית והבדלה.',
      icon: <Moon className="w-5 h-5 text-indigo-700" />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-amber-950 font-torah">
              לוח זמני היום בהלכה
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              זמני היום המדויקים לפי עונות השנה ושעות זמניות, על פי פסיקת מרן הגאון רבי יצחק רצאבי שליט״א בשולחן ערוך המקוצר
            </p>
          </div>

          <button
            onClick={onOpenLocationModal}
            className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 px-3.5 py-2 rounded-lg text-xs font-semibold self-start transition-colors"
          >
            <MapPin className="w-4 h-4 text-amber-800" />
            <span>מיקום נוכחי: {selectedLocation.hebrewName} (שינוי)</span>
          </button>
        </div>
      </div>

      {/* Grid of Zmanim Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-xl border border-stone-200 hover:border-amber-700/40 shadow-xs transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-lg bg-stone-50 border border-stone-100">
                {item.icon}
              </span>
              <span className="font-mono text-xl font-bold text-amber-950 tabular-nums">
                {item.time}
              </span>
            </div>

            <h3 className="text-base font-bold text-stone-900 font-torah">
              {item.title}
            </h3>

            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Educational Note from Shulchan Aruch HaMekutzar */}
      <div className="p-5 bg-amber-50/70 border border-amber-900/20 rounded-xl space-y-2">
        <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
          <Info className="w-4 h-4 text-amber-800" />
          <span>כלל השעות הזמניות בשולחן ערוך המקוצר:</span>
        </div>
        <p className="text-xs text-stone-700 leading-relaxed font-sans">
          שעה זמנית מחושבת על ידי חלוקת שעות היום ל-12 חלקים שווים. בימות הקיץ כשהימים ארוכים השעה הזמנית ארוכה מ-60 דקות, ובימות החורף קצרה מ-60 דקות. לפי דעת הרמב"ם והגר"א מחשבים שעות היום מנץ החמה ועד שקיעתה, ולפי המגן אברהם מחשבים מעלות השחר ועד צאת הכוכבים.
        </p>
      </div>
    </div>
  );
};
