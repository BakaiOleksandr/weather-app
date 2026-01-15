import getCurrentLocation from '../utils/getCurrentLocation';
import {getYourCityName} from '../utils/getYourCityName';
import {useState} from 'react';
export default function AllowLocation() {
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);

  async function handleLocation() {
    try {
      const position = await getCurrentLocation();

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const cityName = await getYourCityName(lat, lon);
      setCity(cityName);
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div>
      <button onClick={handleLocation}>{city ? city : 'Allow location'}</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}
