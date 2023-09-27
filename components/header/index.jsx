import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

//Icons
import { BsFillMoonFill, BsSun } from 'react-icons/bs';
import { CiMenuFries } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai';

const Header = () => {
  const { t, i18n } = useTranslation();

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en'); 
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleMobileMenuItemClick = () => {
    setShowMobileMenu(false);
  };

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
    setLanguage(e.target.value);
    handleMobileMenuItemClick(); 
  };

  return (
    <header>
      <nav className={`navbar navbar-expand-lg ${darkMode ? "bg-dark" : ""}`}>
        <div className="container container-fluid p-2">
          <div className="d-flex align-items-center">
            <Link className="navbar-brand subtitle m-0 me-3" href="/">
              INVOICE PROJECT
            </Link>
          </div>
          <button
            className={`btn d-md-none ${showMobileMenu ? "open" : ""}`}
            type="button"
            onClick={handleMobileMenuToggle}
          >
            <span className="burger-icon">
              {showMobileMenu ? <AiOutlineClose /> : <CiMenuFries />}
            </span>
          </button>

          <div
            className={`collapse navbar-collapse ${
              showMobileMenu ? "show" : ""
            }`}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item text-center">
                <Link
                  className="nav-link link"
                  aria-current="page"
                  href="invoiceList"
                  onClick={handleMobileMenuItemClick}
                >
                   {t('invoiceList')}
                </Link>
              </li>
            </ul>
            <div className="d-flex justify-content-between  align-items-center item-area">
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
                onChange={handleLanguageChange} 
              >
                <option value="en">En</option>
                <option value="tr">Tr</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
