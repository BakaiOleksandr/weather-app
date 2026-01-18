import {useEffect, useState} from 'react';
import {fetchWeather} from '../utils/fetchWeather';
import {useLoading} from '../context/LoadingContext';
import Loading from './Loading';

export default function LocationWeather({cityLocation}) {
  const [localCity, setLocalCity] = useState(null);
  const {loading, setLoading} = useLoading();

  useEffect(() => {
    async function loadFunc() {
      if (!cityLocation) return;
      setLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await fetchWeather(
          cityLocation.cityName,
          cityLocation.cityCountry,
        );
        setLocalCity(data);
      } catch (err) {
        console.log('Error');
      } finally {
        setLoading(false);
      }
    }
    loadFunc();
  }, [cityLocation, setLoading]);

  if (loading) return <Loading />;
  if (!localCity) {
    return null; // ничего не показываем пока нет данных
  }

  return (
    <div>
      <p>
        {localCity?.name}, {localCity?.sys.country}
      </p>
      <p>Temperature: {localCity && localCity.main.temp.toFixed(1)} °C</p>
    </div>
  );
}
