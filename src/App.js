import React, { Suspense, useEffect } from 'react';
import './App.css';
import AppContextBase from './Base/appContext';
import RootRouter from './Base/route/rootRouter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import LoaderComponent from './components/globalComponents/LoaderComponent';
import Box from '@mui/material/Box';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init();
  },[])

  return ( 
    <Suspense fallback={<LoaderComponent />}>
     <AppContextBase.Wrapper>
        <Box>
          <RootRouter />
        </Box>
      </AppContextBase.Wrapper>
      <ToastContainer pauseOnHover/>
    </Suspense>
  );
}

export default App;