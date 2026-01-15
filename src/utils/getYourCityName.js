const API_KEY = import.meta.env.VITE_API_KEY;

export async function getYourCityName(lat, lon) {
  const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  console.log(data[0]?.name);
  return data[0]?.name;
}
