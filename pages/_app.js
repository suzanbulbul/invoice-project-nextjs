import React, {useEffect} from 'react';
import Head from 'next/head';

//Components
import Layout from '../components/Layout';

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
    </Layout>
  );
}

export default MyApp;
