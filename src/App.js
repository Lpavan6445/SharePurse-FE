import React, { Suspense, useEffect } from 'react';
import './App.css';
import AppContextBase from './Base/appContext';
import RootRouter from './Base/route/rootRouter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { initHttp } from './Base/api/axios';
import LoaderComponent from './components/globalComponents/LoaderComponent';
import Box from '@mui/material/Box';

function App() {
  useEffect(() => {
    initHttp();
  },[])

  return ( 
    <Suspense fallback={<LoaderComponent />}>
     <AppContextBase.Wrapper>
        <Box>
          <RootRouter />
          <ToastContainer pauseOnHover/>
        </Box>
      </AppContextBase.Wrapper>
    </Suspense>
  );
}

export default App;