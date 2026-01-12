import {useState, useRef, useEffect} from 'react';
import './index.css';
import {fetchWeather} from './utils/fetchWeather';
import {fetchCities} from './utils/fetchCities';
import Loading from './Loading';
import ThemeButton from './ThemeButton';

function App() {
  // Состояния
  const [city, setCity] = useState(''); // то, что ввёл пользователь
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState(null); // данные погоды
  const [error, setError] = useState(''); // ошибка при запросе
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const loadWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await fetchWeather(city, country);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setCity('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') loadWeather();
  };

  //RETURN
  return (
    <div
      className="main-container"
      style={{fontFamily: 'sans-serif', textAlign: 'center', padding: '2rem'}}
    >
      <ThemeButton theme={theme} setTheme={setTheme} />
      <h1>Weather App</h1>
      <div className="main-box">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            name="city-input"
            placeholder="City"
            value={city}
            onChange={async (e) => {
              setCity(e.target.value);

              const cities = await fetchCities(e.target.value);
              setSuggestions(cities);
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
        </div>

        <button onClick={loadWeather}>Find</button>
        {loading && <Loading />}
      </div>

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
