import React, { useContext } from 'react'
import AppContextBase from '../../Base/appContext';
import ButtonComponent from '../globalComponents';
import { Breadcrumbs, Container, Link, Typography } from '@material-ui/core';
import { PageHeader } from '../globalComponents/commonComponents';

const Homepage = () => {
  const { setUserData, userData, logOutUser } = useContext(AppContextBase);

  return (
    <>
      <PageHeader>
        Dashboard
      </PageHeader>
    </>
  )
}

export default Homepage;