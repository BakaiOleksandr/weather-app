import first from '../images/Default.jpg';
import clouds from '../images/Clouds.jpg';
import clear from '../images/Clear.jpg';
import rain from '../images/Rain.jpg';
import thunder from '../images/Thunder.jpg';
import snow from '../images/Snow.jpg';

export function locationWeatherSwitch(weather, setBackground) {
  switch (weather) {
    case 'Clear':
      setBackground(clear);
      break;
    case 'Clouds':
      setBackground(clouds);
      break;
    case 'Rain':
    case 'Drizzle':
      setBackground(rain);
      break;
    case 'Thunderstorm':
      setBackground(thunder);
      break;
    case 'Snow':
      setBackground(snow);
      break;
    case 'Mist':
    case 'Fog':
    case 'Haze':
      setBackground('../images/Default.jpg');
      break;
    default:
      setBackground(first);
  }
}
