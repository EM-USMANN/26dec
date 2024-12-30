import React from 'react';
import './App.scss';
import { ConfigProvider } from 'antd';
import 'bootstrap/dist/js/bootstrap.bundle'
import Routes from './pages/Routes'
import { useAuthContext } from 'contexts/Auth';
import ScreenLoader from 'components/ScreenLoader';



function App() {

  const { isAppLoading } = useAuthContext()
  return (
    <>

      <ConfigProvider theme={{ token: { colorPrimary: '#1d3557' } }}>
        {isAppLoading
          ? <ScreenLoader />
          : <Routes />}

      </ConfigProvider>

    </>
  );
}

export default App;
