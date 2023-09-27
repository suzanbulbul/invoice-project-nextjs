import React, {useEffect} from 'react';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

//Components
import Layout from '../components/layout';

//Styles
import '../styles/scss/style.scss'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    import("@popperjs/core");
  }, []);
  
  return (
    <Layout>
      <Head>
        <title>INVOICE PROJECT</title>
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  );
}

export default MyApp;
