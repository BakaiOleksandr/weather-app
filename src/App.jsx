import {useState} from 'react';
import './index.css';
import FindCity from './components/FindCity';
import ThemeButton from './components/ThemeButton';
import AllowLocation from './components/AllowLocation';

function App() {
  // Состояния

  // const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('');
  //Allow Location
  const [cityLocation, setCityLocation] = useState(null);
  const [errorLocation, setErrorLocation] = useState(null);

  //RETURN
  return (
    <div className="main-container">
      <div className="header">
        <div className="weather-app-name">Weather App</div>
        <ThemeButton theme={theme} setTheme={setTheme} />
      </div>
      <AllowLocation
        cityLocation={cityLocation}
        errorLocation={errorLocation}
        setCityLocation={setCityLocation}
        setErrorLocation={setErrorLocation}
      />
      <FindCity />
    </div>
  );
}

export default App;
