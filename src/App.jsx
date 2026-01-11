import {useState} from 'react';

const API_KEY = 'b2451d2cb1d5daff39021ed08ffb8639'; // <- вставь сюда свой ключ

function App() {
  // Состояния
  const [city, setCity] = useState(''); // то, что ввёл пользователь
  const [weather, setWeather] = useState(null); // данные погоды
  const [error, setError] = useState(''); // ошибка при запросе

  // Функция для запроса к OpenWeather
  const fetchWeather = async () => {
    if (!city) return; // если город пустой, ничего не делаем
    setError(''); // сбрасываем прошлую ошибку

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === '404') {
        setWeather(null);
        setError('Город не найден');
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError('Ошибка сети');
      setWeather(null);
    }
  };

  return (
    <div
      style={{fontFamily: 'sans-serif', textAlign: 'center', padding: '2rem'}}
    >
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter the city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{padding: '0.5rem', width: '200px'}}
      />

      <button
        onClick={fetchWeather}
        style={{marginLeft: '1rem', padding: '0.5rem 1rem'}}
      >
        Получить погоду
      </button>

      {error && <p style={{color: 'red'}}>{error}</p>}

      {weather && weather.sys && weather.weather && (
        <div style={{marginTop: '2rem'}}>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>Температура: {weather.main.temp}°C</p>
          <p>Погода: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
