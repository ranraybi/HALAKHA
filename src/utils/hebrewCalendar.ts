import { HDate, HebrewCalendar, Location, Zmanim, Sedra } from '@hebcal/core';

export interface HalachicTimes {
  alotHashachar: string;
  misheyakir: string;
  netzHachama: string;
  sofZmanShmaGra: string;
  sofZmanShmaMGA: string;
  sofZmanTfillaGra: string;
  chatzot: string;
  minchaGedola: string;
  minchaKetana: string;
  plagHamincha: string;
  shekiya: string;
  tzeitHakochavim: string;
  candleLighting?: string;
  havdalah?: string;
}

export type TimeOfDayPeriod = 'morning' | 'midday' | 'afternoon' | 'evening' | 'night';

export interface LocationPreset {
  id: string;
  name: string;
  hebrewName: string;
  lat: number;
  long: number;
  tzid: string;
  elevation: number;
}

export const ISRAEL_CITIES: LocationPreset[] = [
  { id: 'jerusalem', name: 'Jerusalem', hebrewName: 'ירושלים', lat: 31.7683, long: 35.2137, tzid: 'Asia/Jerusalem', elevation: 754 },
  { id: 'bnei_brak', name: 'Bnei Brak', hebrewName: 'בני ברק', lat: 32.0833, long: 34.8333, tzid: 'Asia/Jerusalem', elevation: 30 },
  { id: 'tel_aviv', name: 'Tel Aviv', hebrewName: 'תל אביב - יפו', lat: 32.0853, long: 34.7818, tzid: 'Asia/Jerusalem', elevation: 15 },
  { id: 'haifa', name: 'Haifa', hebrewName: 'חיפה', lat: 32.7940, long: 34.9896, tzid: 'Asia/Jerusalem', elevation: 50 },
  { id: 'beer_sheva', name: 'Beer Sheva', hebrewName: 'באר שבע', lat: 31.2529, long: 34.7915, tzid: 'Asia/Jerusalem', elevation: 260 },
  { id: 'tzfat', name: 'Tzfat', hebrewName: 'צפת', lat: 32.9646, long: 35.4960, tzid: 'Asia/Jerusalem', elevation: 900 },
  { id: 'petah_tikva', name: 'Petah Tikva', hebrewName: 'פתח תקווה', lat: 32.0840, long: 34.8878, tzid: 'Asia/Jerusalem', elevation: 40 },
  { id: 'netanya', name: 'Netanya', hebrewName: 'נתניה', lat: 32.3215, long: 34.8532, tzid: 'Asia/Jerusalem', elevation: 30 },
  { id: 'rosh_haayin', name: 'Rosh HaAyin', hebrewName: 'ראש העין', lat: 32.0956, long: 34.9566, tzid: 'Asia/Jerusalem', elevation: 75 },
  { id: 'new_york', name: 'New York', hebrewName: 'ניו יורק', lat: 40.7128, long: -74.0060, tzid: 'America/New_York', elevation: 10 },
  { id: 'london', name: 'London', hebrewName: 'לונדון', lat: 51.5074, long: -0.1278, tzid: 'Europe/London', elevation: 25 },
];

export const HEBREW_MONTHS_NAMES: Record<string, string> = {
  'Nisan': 'ניסן',
  'Iyyar': 'אייר',
  'Sivan': 'סיוון',
  'Tamuz': 'תמוז',
  'Av': 'אב',
  'Elul': 'אלול',
  'Tishrei': 'תשרי',
  'Cheshvan': 'חשוון',
  'Kislev': 'כסלו',
  'Tevet': 'טבת',
  'Sh\'vat': 'שבט',
  'Adar': 'אדר',
  'Adar I': 'אדר א׳',
  'Adar II': 'אדר ב׳',
};

export const PARSHA_HEBREW_NAMES: Record<string, string> = {
  'Bereshit': 'בראשית',
  'Noach': 'נח',
  'Lech-Lecha': 'לך לך',
  'Vayera': 'וירא',
  'Chayei Sara': 'חיי שרה',
  'Toldot': 'תולדות',
  'Vayetzei': 'ויצא',
  'Vayishlach': 'וישלח',
  'Vayeshev': 'וישב',
  'Miketz': 'מקץ',
  'Vayigash': 'ויגש',
  'Vayechi': 'ויחי',
  'Shemot': 'שמות',
  'Vaera': 'וארא',
  'Bo': 'בא',
  'Beshalach': 'בשלח',
  'Yitro': 'יתרו',
  'Mishpatim': 'משפטים',
  'Terumah': 'תרומה',
  'Tetzaveh': 'תצוה',
  'Ki Tisa': 'כי תשא',
  'Vayakhel': 'ויקהל',
  'Pekudei': 'פקודי',
  'Vayikra': 'ויקרא',
  'Tzav': 'צו',
  'Shmini': 'שמיני',
  'Tazria': 'תזריע',
  'Metzora': 'מצורע',
  'Achrei Mot': 'אחרי מות',
  'Kedoshim': 'קדושים',
  'Emor': 'אמור',
  'Behar': 'בהר',
  'Bechukotai': 'בחקתי',
  'Bamidbar': 'במדבר',
  'Nasso': 'נשא',
  'Beha\'alotcha': 'בהעלתך',
  'Sh\'lach': 'שלח',
  'Korach': 'קרח',
  'Chukat': 'חקת',
  'Balak': 'בלק',
  'Pinchas': 'פינחס',
  'Matot': 'מטות',
  'Masei': 'מסעי',
  'Devarim': 'דברים',
  'Vaetchanan': 'ואתחנן',
  'Eikev': 'עקב',
  'Re\'eh': 'ראה',
  'Shoftim': 'שופטים',
  'Ki Teitzei': 'כי תצא',
  'Ki Tavo': 'כי תבוא',
  'Nitzavim': 'נצבים',
  'Vayeilech': 'וילך',
  'Ha\'Azinu': 'האזינו',
  'Vezot Haberakhah': 'וזאת הברכה',
};

export const HEBREW_DAYS_OF_WEEK = [
  'יום ראשון',
  'יום שני',
  'יום שלישי',
  'יום רביעי',
  'יום חמישי',
  'יום שישי (ערב שבת)',
  'יום שבת קודש',
];

export interface HebrewDayInfo {
  date: Date;
  hdate: HDate;
  hebrewDateStr: string;
  hebrewDayOfMonthStr: string;
  hebrewMonthName: string;
  hebrewYearStr: string;
  dayOfWeekName: string;
  dayOfWeekIndex: number;
  parashatHashavua: string;
  isShabbat: boolean;
  isErevShabbat: boolean;
  isRoshChodesh: boolean;
  holidayName?: string;
  specialEventTitle?: string;
  omerDay?: number;
  currentPeriod: TimeOfDayPeriod;
  periodHebrewName: string;
  zmanim: HalachicTimes;
}

function formatTime(d?: Date | null): string {
  if (!d || isNaN(d.getTime())) return '--:--';
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function getHebrewDayInfo(
  currentDate: Date = new Date(),
  locationPreset: LocationPreset = ISRAEL_CITIES[0]
): HebrewDayInfo {
  const hdate = new HDate(currentDate);

  // Hebrew date strings
  const hebrewDateStr = hdate.renderGematriya(true); // e.g. "ד' תשרי תשפ"ו"
  const hebrewDayOfMonthStr = hdate.renderGematriya().split(' ')[0] || `${hdate.getDate()}`;
  const monthNameEng = hdate.getMonthName();
  const hebrewMonthName = HEBREW_MONTHS_NAMES[monthNameEng] || monthNameEng;
  const hebrewYearStr = hdate.renderGematriya().split(' ').slice(2).join(' ') || `${hdate.getFullYear()}`;

  const dayOfWeekIndex = currentDate.getDay(); // 0 is Sunday, 6 is Saturday
  const dayOfWeekName = HEBREW_DAYS_OF_WEEK[dayOfWeekIndex];
  const isShabbat = dayOfWeekIndex === 6;
  const isErevShabbat = dayOfWeekIndex === 5;

  // Parasha using Sedra lookup
  let parashatHashavua = '';
  try {
    const sedra = new Sedra(hdate.getFullYear(), true); // true = Israel
    const res = sedra.lookup(hdate);
    if (res && res.parsha && res.parsha.length > 0) {
      parashatHashavua = res.parsha
        .map((p) => PARSHA_HEBREW_NAMES[p] || p)
        .join(' - ');
    }
  } catch {
    parashatHashavua = '';
  }

  // Check Holiday / Events from HebrewCalendar
  let holidayName: string | undefined;
  let specialEventTitle: string | undefined;
  const isRoshChodesh = hdate.getDate() === 1 || hdate.getDate() === 30;

  try {
    const events = HebrewCalendar.getHolidaysOnDate(hdate, true);
    if (events && events.length > 0) {
      const mainEvent = events[0];
      holidayName = mainEvent.render('he');
    }
  } catch {
    // fallback
  }

  // Custom special day detection if not captured
  if (!holidayName) {
    if (isRoshChodesh) {
      holidayName = 'ראש חודש';
    } else if (monthNameEng === 'Elul') {
      specialEventTitle = 'חודש הרחמים והסליחות';
    } else if (hdate.getDate() >= 1 && hdate.getDate() <= 10 && monthNameEng === 'Tishrei') {
      specialEventTitle = 'עשרת ימי תשובה';
    }
  }

  // Location & Zmanim
  const loc = new Location(
    locationPreset.lat,
    locationPreset.long,
    true,
    locationPreset.tzid,
    locationPreset.name,
    'IL',
    locationPreset.elevation
  );
  const zmanimObj = new Zmanim(loc, currentDate, true);

  const alot = zmanimObj.alotHaShachar();
  const misheyakir = zmanimObj.misheyakir();
  const netz = zmanimObj.sunrise();
  const shmaGra = zmanimObj.sofZmanShma();
  const shmaMGA = zmanimObj.sofZmanShmaMGA();
  const tfillaGra = zmanimObj.sofZmanTfilla();
  const chatzot = zmanimObj.chatzot();
  const minchaGedola = zmanimObj.minchaGedola();
  const minchaKetana = zmanimObj.minchaKetana();
  const plag = zmanimObj.plagHaMincha();
  const shekiya = zmanimObj.sunset();
  const tzeit = zmanimObj.tzeit();

  const zmanim: HalachicTimes = {
    alotHashachar: formatTime(alot),
    misheyakir: formatTime(misheyakir),
    netzHachama: formatTime(netz),
    sofZmanShmaGra: formatTime(shmaGra),
    sofZmanShmaMGA: formatTime(shmaMGA),
    sofZmanTfillaGra: formatTime(tfillaGra),
    chatzot: formatTime(chatzot),
    minchaGedola: formatTime(minchaGedola),
    minchaKetana: formatTime(minchaKetana),
    plagHamincha: formatTime(plag),
    shekiya: formatTime(shekiya),
    tzeitHakochavim: formatTime(tzeit),
  };

  // Determine current period based on time of day
  const currentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();
  const netzMinutes = netz ? netz.getHours() * 60 + netz.getMinutes() : 6 * 60;
  const chatzotMinutes = chatzot ? chatzot.getHours() * 60 + chatzot.getMinutes() : 12 * 60 + 30;
  const minchaMinutes = minchaGedola ? minchaGedola.getHours() * 60 + minchaGedola.getMinutes() : 13 * 60;
  const shekiyaMinutes = shekiya ? shekiya.getHours() * 60 + shekiya.getMinutes() : 18 * 60;
  const tzeitMinutes = tzeit ? tzeit.getHours() * 60 + tzeit.getMinutes() : 18 * 60 + 40;

  let currentPeriod: TimeOfDayPeriod = 'morning';
  let periodHebrewName = 'השכמת הבוקר ושחרית';

  if (currentMinutes >= tzeitMinutes || currentMinutes < 4 * 60) {
    if (currentMinutes >= 23 * 60 || currentMinutes < 4 * 60) {
      currentPeriod = 'night';
      periodHebrewName = 'אשמורת הלילה ותיקון חצות';
    } else {
      currentPeriod = 'evening';
      periodHebrewName = 'ערבית וקריאת שמע שעל המיטה';
    }
  } else if (currentMinutes >= shekiyaMinutes) {
    currentPeriod = 'evening';
    periodHebrewName = 'בין השמשות ותפילת ערבית';
  } else if (currentMinutes >= minchaMinutes) {
    currentPeriod = 'afternoon';
    periodHebrewName = 'שעת המנחה והערב';
  } else if (currentMinutes >= chatzotMinutes - 60) {
    currentPeriod = 'midday';
    periodHebrewName = 'חצות היום, סעודה ומסחר';
  } else if (currentMinutes >= netzMinutes - 60) {
    currentPeriod = 'morning';
    periodHebrewName = 'שחרית וברכות השחר';
  } else {
    currentPeriod = 'night';
    periodHebrewName = 'השכמת הבוקר ועלות השחר';
  }

  // Omer day (16 Nisan to 5 Sivan)
  let omerDay: number | undefined;
  const day = hdate.getDate();
  if (monthNameEng === 'Nisan' && day >= 16) {
    omerDay = day - 15;
  } else if (monthNameEng === 'Iyyar') {
    omerDay = 15 + day;
  } else if (monthNameEng === 'Sivan' && day <= 5) {
    omerDay = 44 + day;
  }

  return {
    date: currentDate,
    hdate,
    hebrewDateStr,
    hebrewDayOfMonthStr,
    hebrewMonthName,
    hebrewYearStr,
    dayOfWeekName,
    dayOfWeekIndex,
    parashatHashavua,
    isShabbat,
    isErevShabbat,
    isRoshChodesh,
    holidayName,
    specialEventTitle,
    omerDay,
    currentPeriod,
    periodHebrewName,
    zmanim,
  };
}
