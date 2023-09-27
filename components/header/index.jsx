import React, { useState, useEffect } from 'react';
import Link from 'next/link';

//Icons
import { BsFillMoonFill, BsSun } from 'react-icons/bs';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en'); // Dil seçeneği

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    const bodyElement = document.body;
    if (darkMode) {
      bodyElement.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      bodyElement.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);


  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header >
      <nav className={`navbar navbar-expand-lg ${darkMode & "bg-dark"}`}>
        <div className="container container-fluid p-2">
          <div className="d-flex align-items-center">
            <Link className="navbar-brand subtitle m-0" href="/">
              INVOICE PROJECT
            </Link>
          </div>
          <div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link link"
                  aria-current="page"
                  href="invoiceList"
                >
                  Invoice List
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="dark-mode-toggle">
              <input
                type="checkbox"
                id="darkModeSwitch"
                checked={darkMode}
                onChange={handleDarkModeToggle}
              />
              <label htmlFor="darkModeSwitch">
                <div className="toggle-ball">
                  {darkMode ? <BsFillMoonFill /> : <BsSun />}
                </div>
              </label>
            </div>
            <select
              className="form-select multi-lang ms-2 p-auto"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">En</option>
              <option value="tr">Tr</option>
            </select>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
