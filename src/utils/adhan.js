const { PrayerTimes, Coordinates, CalculationMethod } = require('adhan');

/*
 * Below, a ternary operator is being used for `const date`
 * to check for a year, month, and day in the context variable.
 * If all three were provided, it uses them to instantiate a `Date`
 * object. Otherwise, the current date is used.
 * The `month` section is being parsed as an integer so that `1` can
 * correctly be subtracted from it to undo the constructor's 0-index
 * for month fields.
 */

const adhanTimes = (context) => {
  const { prayerTime } = context;
  const { lat, long } = context;
  const { year, month, day } = context;

  const coords = new Coordinates(lat, long);
  const date = (year && month && day) ? new Date(year, parseInt(month, 10) - 1, day) : new Date();
  const params = CalculationMethod.NorthAmerica();

  const adhan = new PrayerTimes(coords, date, params);

  const prayerTimes = {
    fajr: adhan.fajr.toLocaleTimeString(),
    sunrise: adhan.sunrise.toLocaleTimeString(),
    dhuhr: adhan.dhuhr.toLocaleTimeString(),
    asr: adhan.asr.toLocaleTimeString(),
    maghrib: adhan.maghrib.toLocaleTimeString(),
    isha: adhan.isha.toLocaleTimeString()
  };

  return adhan;
};

module.exports = adhanTimes;
