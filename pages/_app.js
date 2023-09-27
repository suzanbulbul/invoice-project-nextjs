import React, {useEffect} from 'react';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import '../i18n'
import { useTranslation } from 'react-i18next';


//Components
import Layout from '../components/layout';

//Styles
import '../styles/scss/style.scss'

function MyApp({ Component, pageProps }) {
  const { t } = useTranslation();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    import("@popperjs/core");
  }, []);
  useEffect(() => {
  }, [t]);
  
  
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
