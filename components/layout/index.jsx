import React from 'react';
import Header from '../header';

const Layout = ({ children }) => {

  return (
    <div className='layout'>
      <Header />
      <div className="h-100">
        {children}
      </div>
    </div>
  );
};

export default Layout;
