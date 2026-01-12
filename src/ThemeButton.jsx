import React from 'react';

export default function ThemeButton({theme, setTheme}) {
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? '' : 'dark';
    setTheme(newTheme);

    document.body.className = newTheme;
  };

  return (
    <div className="change-theme">
      <button onClick={toggleTheme} className="change-theme-btn">
        Switch theme to: {theme === 'dark' ? 'Light' : 'Dark'}
      </button>
    </div>
  );
}
