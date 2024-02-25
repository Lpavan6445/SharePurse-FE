import React, { Suspense, useEffect } from 'react';
import './App.css';
import AppContextBase from './Base/appContext';
import RootRouter from './Base/route/rootRouter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { initHttp } from './Base/api/axios';
import LoaderComponent from './components/globalComponents/LoaderComponent';

function App() {
  useEffect(() => {
    initHttp();
  },[])

  return ( 
    <Suspense fallback={<LoaderComponent />}>
      <AppContextBase.Wrapper>
        <RootRouter />
        <ToastContainer pauseOnHover/>
      </AppContextBase.Wrapper>
    </Suspense>
  );
}

export default App;
