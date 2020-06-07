import { differenceInDays, format, addMinutes } from 'date-fns'

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