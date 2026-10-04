import { HalachaItem, HALACHOT_DATABASE } from '../data/shulchanAruchData';
import { HebrewDayInfo } from './hebrewCalendar';

export interface DailyHalachotResult {
  primaryHalacha: HalachaItem;
  timeOfDayHalachot: HalachaItem[];
  calendarSpecialHalachot: HalachaItem[];
  allDailyHalachot: HalachaItem[];
  topicTitle: string;
  timeContextDescription: string;
}

export function getDailyHalachot(dayInfo: HebrewDayInfo): DailyHalachotResult {
  const currentMonthEng = dayInfo.hdate.getMonthName();
  const dayOfMonth = dayInfo.hdate.getDate();
  const period = dayInfo.currentPeriod;
  const isShabbat = dayInfo.isShabbat;
  const isErevShabbat = dayInfo.isErevShabbat;
  const isRoshChodesh = dayInfo.isRoshChodesh;

  // 1. Filter calendar/holiday specific halachot
  const calendarSpecialHalachot = HALACHOT_DATABASE.filter(item => {
    if (!item.applicableCondition) return false;

    const cond = item.applicableCondition;
    if (cond.isShabbat && isShabbat) return true;
    if (cond.isErevShabbat && isErevShabbat) return true;
    if (cond.isRoshChodesh && isRoshChodesh) return true;

    if (cond.months && cond.months.includes(currentMonthEng)) {
      if (cond.dayRange) {
        const [min, max] = cond.dayRange;
        return dayOfMonth >= min && dayOfMonth <= max;
      }
      return true;
    }
    return false;
  });

  // 2. Filter halachot by current time of day
  const timeOfDayHalachot = HALACHOT_DATABASE.filter(item => {
    return item.timeOfDayTags.includes(period);
  });

  // 3. Determine the primary featured Halacha
  let primaryHalacha: HalachaItem;
  let topicTitle = '';
  let timeContextDescription = '';

  if (isShabbat) {
    const shabbatHalacha = calendarSpecialHalachot.find(h => h.applicableCondition?.isShabbat) ||
      HALACHOT_DATABASE.find(h => h.topic === 'שבת קודש');
    primaryHalacha = shabbatHalacha || HALACHOT_DATABASE[0];
    topicTitle = 'הלכות שבת קודש - שולחן ערוך המקוצר חלק ג׳';
    timeContextDescription = 'שבת מנוחה וקדושה - דיני קידוש, סעודות, מלאכות שבת ומוקצה';
  } else if (isErevShabbat && (period === 'afternoon' || period === 'midday')) {
    const erevHalacha = calendarSpecialHalachot.find(h => h.applicableCondition?.isErevShabbat) ||
      HALACHOT_DATABASE.find(h => h.topic === 'ערב שבת' || h.topic === 'שבת קודש');
    primaryHalacha = erevHalacha || HALACHOT_DATABASE[0];
    topicTitle = 'הלכות ערב שבת והדלקת נרות';
    timeContextDescription = 'הכנות לשבת קודש וזמן הדלקת נרות לפני השקיעה';
  } else if (calendarSpecialHalachot.length > 0) {
    primaryHalacha = calendarSpecialHalachot[0];
    topicTitle = `הלכות ${dayInfo.holidayName || dayInfo.specialEventTitle || 'המועד'} - שולחן ערוך המקוצר`;
    timeContextDescription = `הלכות מיוחדות לתאריך העברי של היום: ${dayInfo.hebrewDateStr}`;
  } else {
    // Pick the most relevant for current time of day
    const match = timeOfDayHalachot[0];
    primaryHalacha = match || HALACHOT_DATABASE[0];

    if (period === 'morning') {
      topicTitle = 'הלכות השכמת הבוקר ושחרית - שו"ע המקוצר חלק א׳';
      timeContextDescription = 'דיני נטילת ידיים, ציצית, תפילין וקריאת שמע בזמנה';
    } else if (period === 'midday') {
      topicTitle = 'הלכות סעודה וברכות הנהנין - שו"ע המקוצר חלק ב׳';
      timeContextDescription = 'ברכת המוציא, ברכת המזון ודיני כשרות';
    } else if (period === 'afternoon') {
      topicTitle = 'הלכות תפילת מנחה - שו"ע המקוצר חלק ב׳';
      timeContextDescription = 'זמן תפילת המנחה, כוונה וזהירות שלא תעבור השקיעה';
    } else if (period === 'evening') {
      topicTitle = 'הלכות ערבית וקריאת שמע - שו"ע המקוצר חלק ב׳';
      timeContextDescription = 'קריאת שמע בזמנה בצאת הכוכבים ותפילת ערבית';
    } else {
      topicTitle = 'הלכות קריאת שמע שעל המיטה ולימוד הלילה';
      timeContextDescription = 'ברכת המפיל, מחילה לכל אדם וסדר שינה כהלכה';
    }
  }

  // Combine unique halachot for all-day list
  const seenIds = new Set<string>();
  const allDailyHalachot: HalachaItem[] = [];

  const addToAll = (items: HalachaItem[]) => {
    for (const it of items) {
      if (!seenIds.has(it.id)) {
        seenIds.add(it.id);
        allDailyHalachot.push(it);
      }
    }
  };

  addToAll([primaryHalacha]);
  addToAll(calendarSpecialHalachot);
  addToAll(timeOfDayHalachot);
  addToAll(HALACHOT_DATABASE.slice(0, 6)); // ensure rich list

  return {
    primaryHalacha,
    timeOfDayHalachot,
    calendarSpecialHalachot,
    allDailyHalachot,
    topicTitle,
    timeContextDescription,
  };
}
