import { differenceInDays, format, addMinutes, isBefore, add } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export function getServiceById(services, id) {
  return services.find(service => service.id === id);
}

export function getServiceByModalityType(service, type) {
  return service.modalities.find(modality => modality.type === type);
}

export function getFromDate(availableDates) {
  const keys = Object.keys(availableDates).sort();
  const first = keys[0];
  return new Date(first.slice(0,4), Number(first.slice(4,6))-1, first.slice(6));
}

export function getAmountOfDaysToEnd(availableDates) {
  const keys = Object.keys(availableDates).sort();
  const first = keys[0];
  const last = keys[keys.length-1];
  const startDate = new Date(first.slice(0,4), Number(first.slice(4,6))-1, first.slice(6));
  const lastDate = new Date(last.slice(0,4), Number(last.slice(4,6))-1, last.slice(6));
  const days = differenceInDays(lastDate, startDate);
  return Math.max(31, days);
}

export function isDateAvailable(date, availableDates) {
  return (format(date, 'yyyyMMdd') in availableDates);
}

export function adaptTimeZonesToArray(timezones, defaultTimeZone) {
  return [
    defaultTimeZone,
    ...Object.keys(timezones).map(timezone => {
      return { value: timezone, label: timezones[timezone] };
    })
  ];
}

export function getAvailableTimes(availableDates, date, defaultTime) {
  const availableTimes = [defaultTime];
  if (date && isDateAvailable(new Date(date), availableDates)) {
    const times = availableDates[format(new Date(date), 'yyyyMMdd')];
    let now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    times.split('').forEach(time => {
      const timeValue = format(now, 'HH:mm');
      now = addMinutes(now, 30);
      availableTimes.push({ value: timeValue, label: timeValue, available: Number(time) === 1 });
    });
    return availableTimes;
  } else {
    return availableTimes;
  }
}

export function splitTimeZoneName(timezones, timezone) {
  if (timezone in timezones) {
    /^(.+)(\[GMT.+)$/gmi.exec(timezones[timezone]);
    return {
      name: RegExp.$1,
      gmt: RegExp.$2
    }
  } else {
    return {name: '', gmt: ''};
  }
}

export function getFirstAvailableTime(availableDates, date) {
  if (date) {
    const times = availableDates[format(new Date(date), 'yyyyMMdd')];
    let now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    const splittedTimes = times.split('');
    for(let i=0; i<splittedTimes.length; i++) {
      if (Number(splittedTimes[i]) === 1) {
        break;
      }
      now = addMinutes(now, 30);
    }
    return format(now, 'HH:mm');
  } else {
    return '';
  }
}

export function isTimeAvailable(availableDates, date, time) {
  let available = false;
  if (date) {
    const times = availableDates[format(new Date(date), 'yyyyMMdd')];
    let now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    const splittedTimes = times.split('');
    for(let i=0; i<splittedTimes.length; i++) {
      if (time === format(now, 'HH:mm')) {
        available = Number(splittedTimes[i]) === 1;
        break;
      }
      now = addMinutes(now, 30);
    }
    return available;
  } else {
    return available;
  }
}

/**
 *
 * @param {Date} date Date of the booking
 * @param {String} time Time of the booking 'hh:MM'
 * @param {String} timezone Current user's timezone
 * @param {Number} cancelSession Number of seconds before limit time with free cancellation
 */
export function isWithinCancellationLimits(date, time, timezone, cancelSession) {
  // Calculate if user is booking within the time limit free cancellation
  const times = time.split(':');
  date.setHours(times[0]);
  date.setMinutes(times[1]);
  const bookingDate = utcToZonedTime(date, timezone);
  const now = utcToZonedTime(new Date(), timezone);
  const hoursDiff = (bookingDate - now) / 1000 / 60 / 60;
  if (hoursDiff < (cancelSession / 60 / 60)) {
    return true;
  } else {
    return false;
  }
}

export function getCountryByCode(countries, code) {
  return countries.find(country => country.code === code);
}

export function getCountryNameByCode(countries, code) {
  const country = getCountryByCode(countries, code);
  if (country) {
    return country.name;
  } else {
    return '';
  }
}

export function generateAvailableDates(bookingDate, days = 15) {
  const availableDates = {};
  if (bookingDate) {
    let from = new Date(Math.min(new Date().getTime(), bookingDate.getTime()));
    let to = add(new Date(Math.max(new Date().getTime(), bookingDate.getTime())), { days });
    while (isBefore(from, to)) {
      availableDates[format(from, 'yyyyMMdd')] = Array(48).join("1");
      from = add(from, {days: 1});
    }
  }
  return availableDates;
}