import React from 'react';
import {ImSun} from 'react-icons/im';
import {FaMoon} from 'react-icons/fa';

export default function ThemeButton({theme, setTheme}) {
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? '' : 'dark';
    setTheme(newTheme);

    document.body.className = newTheme;
  };

  return (
    <div className="change-theme">
      <button onClick={toggleTheme} className="change-theme-btn">
        {theme === 'dark' ? <ImSun /> : <FaMoon />}
      </button>
    </div>
  );
}
