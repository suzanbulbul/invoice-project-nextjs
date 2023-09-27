import React from 'react';
import Header from '../header';

const Layout = ({ children }) => {

  return (
    <div className='layout'>
      <Header />
      <div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
