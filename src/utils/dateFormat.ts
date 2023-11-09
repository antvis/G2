function fillZero(digit: number) {
  if (Math.abs(digit) > 10) return String(digit);
  return digit.toString().padStart(2, '0');
}

export function dynamicFormatDateTime(date: Date) {
  const year = date.getFullYear();
  const month = fillZero(date.getMonth() + 1);
  const day = fillZero(date.getDate());

  const yyyyMMDD = `${year}-${month}-${day}`;

  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  if (hour || minutes || seconds)
    return `${yyyyMMDD} ${fillZero(hour)}:${fillZero(minutes)}:${fillZero(
      seconds,
    )}`;
  return yyyyMMDD;
}
