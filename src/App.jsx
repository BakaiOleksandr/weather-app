import {useState} from 'react';
import './index.css';
import './App.css';

const API_KEY = 'b2451d2cb1d5daff39021ed08ffb8639'; // <- вставь сюда свой ключ

function App() {
  // Состояния
  const [city, setCity] = useState(''); // то, что ввёл пользователь
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState(null); // данные погоды
  const [error, setError] = useState(''); // ошибка при запросе
  const [suggestions, setSuggestions] = useState([]);

  // Функция для запроса к OpenWeather
  const fetchWeather = async () => {
    if (!city) return; // если город пустой, ничего не делаем
    setError(''); // сбрасываем прошлую ошибку

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === '404') {
        setWeather(null);
        setError('City not found');
      } else {
        console.log(data);
        setWeather(data);
      }
    } catch (err) {
      setError('Network error');
      setWeather(null);
    }
    setCity('');
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') fetchWeather();
  };

  //fetch Cities
  const fetchCities = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );

      const data = await response.json();
      setSuggestions(data);
    } catch {
      setSuggestions([]);
    }
  };

  //RETURN
  return (
    <div className='main-container'
      style={{fontFamily: 'sans-serif', textAlign: 'center', padding: '2rem'}}
    >
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          fetchCities(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        style={{padding: '0.5rem', width: '200px'}}
      />

      {suggestions.length > 0 && (
        <ul className="list">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="listItem"
              onClick={() => {
                setCity(item.name);
                setCountry(item.country);
                setSuggestions([]);
              }}
            >
              {item.name}, {item.country}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={fetchWeather}
        style={{marginLeft: '1rem', padding: '0.5rem 1rem'}}
      >
        Find
      </button>

      {error && <p style={{color: 'red'}}>{error}</p>}

      {weather && weather.sys && weather.weather && (
        <div style={{marginTop: '2rem'}}>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>Temperature: {weather.main.temp.toFixed(1)}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
