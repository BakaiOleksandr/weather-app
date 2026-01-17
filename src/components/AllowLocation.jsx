import getCurrentLocation from '../utils/getCurrentLocation';
import {getYourCityName} from '../utils/getYourCityName';
import LocationWeather from './LocationWeather';
import {useLoading} from '../context/LoadingContext';

export default function AllowLocation({
  cityLocation,
  errorLocation,
  setErrorLocation,
  setCityLocation,
}) {
  const {setLoading} = useLoading();

  async function handleLocation() {
    setLoading(true);
    try {
      const position = await getCurrentLocation();

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const cityName = await getYourCityName(lat, lon);
      setCityLocation(cityName);
      // setLoading(true);
    } catch (err) {
      setErrorLocation(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {cityLocation ? (
        <LocationWeather cityLocation={cityLocation} setLoading={setLoading} />
      ) : (
        <>
          {errorLocation && <p>{errorLocation}</p>}
          {!errorLocation && <button onClick={handleLocation}>Allow</button>}
        </>
      )}
    </div>
  );
}
