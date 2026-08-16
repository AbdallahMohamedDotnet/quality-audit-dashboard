export interface LiveClocks {
  time: string;
  gregorianDate: string;
  hijriDate: string;
  copticDate: string;
}

export function formatLiveClocks(date: Date, isAr: boolean): LiveClocks {
  const time = date.toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const gregorianDate = date.toLocaleDateString(isAr ? 'ar-EG' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  let hijriDate = '';
  let copticDate = '';

  try {
    hijriDate = new Intl.DateTimeFormat(
      isAr ? 'ar-SA-u-ca-islamic' : 'en-US-u-ca-islamic',
      { day: 'numeric', month: 'long', year: 'numeric' }
    ).format(date);
  } catch {
    hijriDate = isAr ? 'التاريخ الهجري' : 'Hijri Date';
  }

  try {
    copticDate = new Intl.DateTimeFormat(
      isAr ? 'ar-EG-u-ca-coptic' : 'en-US-u-ca-coptic',
      { day: 'numeric', month: 'long', year: 'numeric' }
    ).format(date);
  } catch {
    copticDate = isAr ? 'التاريخ القبطي' : 'Coptic Date';
  }

  return { time, gregorianDate, hijriDate, copticDate };
}
