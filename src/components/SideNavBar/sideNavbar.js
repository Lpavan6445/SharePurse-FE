import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import AppUrls from '../../Base/route/appUrls';

function SideNavBar({
  openSidebar = false,
  toggleSidebar = () => void 0,
}) {

  const SIDEBAR_ENUM = [
    {
      name: 'Home',
      to: AppUrls.HOME_PAGE,
    },
  ]
  const list = () => (
    <div onClick={() => toggleSidebar(false)}>
      <List>
        {SIDEBAR_ENUM.map((dta, index) => (
          <ListItem button key={dta.name} component={Link} to={dta.to}>
            <ListItemText primary={dta.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer anchor="left" open={openSidebar} onClose={() => toggleSidebar(false)}>
        {list()}
      </Drawer>
    </div>
  );
}

export default SideNavBar;
