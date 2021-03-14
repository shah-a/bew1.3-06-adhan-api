const { PrayerTimes, Coordinates, CalculationMethod } = require('adhan');

const coords = new Coordinates(43.205040, -79.899990);
const date = new Date();
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

console.log({
  date: `${date.toLocaleDateString()}`,
  prayerTimes
});

// Location.find({ name: blah }).lean()
//   .then((loc) => {
//     new Coordinates(loc.lat, loc.long)
//   })
//   .catch((err) => {
//     res.json({ error: err.message });
//   });
