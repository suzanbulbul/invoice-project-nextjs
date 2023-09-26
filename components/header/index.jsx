import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

//Icons
import { BsFillMoonFill, BsSun } from 'react-icons/bs'

const Header = () => {
  const router = useRouter()
  const [darkModu, setDarkModu] = useState(false)

    // Dark modu değiştiğinde body elementine sınıf ekleyin/çıkarın
    useEffect(() => {
      const bodyElement = document.body;
      if (darkModu) {
        bodyElement.classList.add('dark-mode');
      } else {
        bodyElement.classList.remove('dark-mode');
      }
    }, [darkModu]);

    const handleDarkModeToggle = () => {
      setDarkModu(!darkModu);
    };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container container-fluid">
          <Link className="navbar-brand" href="/">
            INVOICE PROJECT
          </Link>
          <div className="">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="invoiceList">
                  InvoiceList
                </Link>
              </li>
            </ul>
          </div>
          <button onClick={() => setDarkModu(!darkModu)}>{darkModu ? <BsFillMoonFill />: <BsSun />}</button>
        </div>
      </nav>
    </header>
  )
}

export default Header
