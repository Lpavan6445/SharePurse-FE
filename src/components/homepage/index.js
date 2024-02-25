import React, { useContext } from 'react'
import AppContextBase from '../../Base/appContext';
import ButtonComponent from '../globalComponents';
import PrimarySearchAppBar from '../Appbar/appbar';
import { Breadcrumbs, Container, Link, Typography } from '@material-ui/core';

const Homepage = () => {
  const { setUserData, userData, logOutUser } = useContext(AppContextBase);

  return (
    <>
        Homepage
    </>
  )
}

export default Homepage;