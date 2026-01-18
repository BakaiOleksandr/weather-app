import getCurrentLocation from '../utils/getCurrentLocation';
import {getYourCityName} from '../utils/getYourCityName';
import LocationWeather from './LocationWeather';
import {useLoading} from '../context/LoadingContext';
import {useEffect} from 'react';

export default function AllowLocation({
  cityLocation,
  errorLocation,
  setErrorLocation,
  setCityLocation,
}) {
  const {setLoading} = useLoading();
  useEffect(() => {
    handleLocation();
  }, []);
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
      setErrorLocation(
        'Access to geolocation is denied. Please allow geolocation in your browser.',
      );
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
          {errorLocation && <p style={{color: 'red'}}>{errorLocation}</p>}
          {/* <button onClick={handleLocation}>Allow geolocation</button> */}
          {errorLocation && (
            <button onClick={() => window.location.reload()}>
              Reload after permission change
            </button>
          )}
        </>
      )}
    </div>
  );
}
