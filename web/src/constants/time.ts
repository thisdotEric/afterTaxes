function getTimeIn24HourFormat(): string {
  const date = new Date();

  const hour = date.getHours();
  const minutes = date.getMinutes();

  let minuteString = `${minutes}`;
  let hourString = `${hour}`;

  if (minutes < 10) minuteString = `0${minutes}`;
  if (hour < 10) hourString = `0${hour}`;

  return `${hour}:${minuteString}`;
}

export default getTimeIn24HourFormat;
