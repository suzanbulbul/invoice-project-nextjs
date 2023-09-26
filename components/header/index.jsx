import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()

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
          <span></span>
        </div>
      </nav>
    </header>
  )
}

export default Header
