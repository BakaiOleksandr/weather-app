import {useEffect, useState} from 'react';
import {fetchWeather} from '../utils/fetchWeather';
import {useLoading} from '../context/LoadingContext';
import Loading from './Loading';
import {locationWeatherSwitch} from '../utils/locationWeatherSwitch';
import './LocationWeather.css';

export default function LocationWeather({cityLocation}) {
  const [localCity, setLocalCity] = useState(null);
  const {loading, setLoading} = useLoading();
  const [backGround, setBackground] = useState('../images/Default.jpg');

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
        locationWeatherSwitch(data.weather[0].main, setBackground);
        // console.log(data.weather[0].main)
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
    <div
      style={{backgroundImage: `url(${backGround})`}}
      className="location-weather-container"
    >
      <p>
        {localCity?.name}, {localCity?.sys.country}
      </p>
      <p>Temperature: {localCity && localCity.main.temp.toFixed(1)} °C</p>
    </div>
  );
}
