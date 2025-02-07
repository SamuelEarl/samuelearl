/**
 * This functions accepts a date object and returns an ISO date string of the form "YYYY-MM-DD".
 */
export function getISODateFromDateObj(dateObj: Date) {
  // Get the current date in US format, which also pads the dates with leading zeros when necessary.
  // See https://stackoverflow.com/a/47160545/9453009
  const localeDateString = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return `${localeDateString.slice(6)}-${localeDateString.slice(0, 2)}-${localeDateString.slice(3, 5)}`;
}

/**
 * This function accepts an ISO date string of the form "YYYY-MM-DD" and returns a date object.
 * 
 * NOTE: If I simply pass the ISO string to the `new Date()` constructor, then the date could be off by a day depending on the timezone. However, if I create a new Date object and then parse out the year, month, and day with the `getUTC*` functions (aka `getISO*` functions), then the date appears to be accurate. I think the reason for that is because the string that is being passed to this function is an ISO string and when you parse that string into a Date object using the `getUTC*` functions, then you will get the correct date. I think this is because both the input (ISO string) and output (Date object) are using the same format (i.e. ISO format), so there are no conversion errors due to the difference in timezones.
 */  
export function getDateObjFromISODate(isoDateString: string) {
  const d = new Date(isoDateString);
  const utcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return utcDate;
}

/**
 * This `isValidDate()` function is borrowed from this post:
 * https://stackoverflow.com/a/35413963/9453009
 */
export function isValidDate(dateString: string) {
  // Leaving the date field empty is valid. So if the input is an empty string, then return true.
  if (!dateString) return true;
  // Otherwise, run the validation against the string input.
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false;  // Return `false` if `dateString` is an invalid format.
  const d = new Date(dateString);
  const dateInMS = d.getTime();
  if (!dateInMS && dateInMS !== 0) return false; // Return `false` if `dateInMS` is a NaN value or an invalid date.
  return d.toISOString().slice(0,10) === dateString;
}
