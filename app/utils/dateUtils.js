export function getWeekDayName(weekDay) {
    const days = ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه','پنجشنبه','جمعه', 'شنبه'];
    return days[weekDay];
}
  
export function getMonthName(weekDay) {
    const monthes = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    return monthes[weekDay-1];
}
  