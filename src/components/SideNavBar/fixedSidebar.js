import React, { useContext, useState } from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import { Avatar, Box, MenuItem } from '@material-ui/core';
import AppUrls from '../../Base/route/appUrls';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import { ImgInlineStyle, InlineStyleFlexbox, InlineStylecDiv } from '../globalComponents/InlineStyledCommonComponents';
import moneyIcon from 'assets/moneyIcon.png';
import dashboardIcon from 'assets/dashboardIcon.svg';
import groupsIcon from 'assets/groupsIcon.svg';
import logout from 'assets/logoutIcon.svg';
import sharePurseIcon1 from 'assets/sharePurseIcon1.jpeg';
import personalExpense from 'assets/personalExpense.svg';
import AppContextBase from 'Base/appContext';
import { getBeImgaeFullUrl } from 'global/utils';
import CenteredModal from '../globalComponents/Modal';

const drawerWidth = 280;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'white',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0, 2, 1.5),
    [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(0, 3, 3)
    }
  },
  toolbar: theme.mixins.toolbar,
  brandLogo: {
    width: '50px',
    height: '50px',
    marginRight: '10px',
  },
  brandName: {
    flexGrow: 1,
    color: 'rgb(27, 37, 75)',
    fontWeight: 700,
    fontSize: '1.5rem',
  },
  list: {
    display: 'flex',
    gap: '0.3rem',
    flexDirection: 'column'
  },
  sidebarLogo: {
    borderRadius: '60px',
    width: '40px',
    height: '40px',
    overflow: "hidden",
    objectFit: "cover",
    textAlign: "center",
    textOndent: "10000px"
  },
  menuIconStyles: {
    position: 'fixed',
    zIndex: 10,
    top: '0',
    right: '1px',
    '& .MuiSvgIcon-root': {
        fontSize: '2.5rem',
    }
  },
  sidebarLogoWrapper: {
    display: "flex",
    gap: '0.3rem',
    padding: '2rem 1rem',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  activeMenu: {
    color: theme.moduleColurs.globalcolor,
    filter: "unset !important",
    '& .MuiTypography-root': {
        filter: "unset !important",
    }
  },
}));

export const MenuItemCustom = withStyles((theme) => ({
    root: {
       display: 'flex',
       gap: '1.2rem',
       justifyContent: 'flex-start',
       alignItems: 'center',
       filter: "grayscale(100%)",

       '& img': {
            width: 32,
            height: 32
       },
       '& .MuiTypography-root': {
            fontWeight: '700',
            filter: "grayscale(100%)",
            color: theme.moduleColurs.globalcolor,
            fontSize: '1.5rem',
       },
       '&:hover': {
          filter: "unset !important",
          '& .MuiTypography-root': {
            filter: "unset !important",
          }
       }
    } 
 }))(Box);

const FixedSidebar = ({ history, children }) => {
  const { setUserData, userData, logOutUser } = useContext(AppContextBase);
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSettingPage, setSettingPage] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const MENU_BAR_ENUM = [
    {
        title: 'Dashboard',
        icon: dashboardIcon,
        altIconTxt: 'dashboard',
        path: AppUrls.HOME_PAGE,
    },
    {
        title: 'Groups',
        icon: groupsIcon,
        altIconTxt: 'groupsIcon',
        path: AppUrls.GROUPS_LIST,
    },
    {
        title: 'My Expense',
        icon: personalExpense,
        altIconTxt: 'groupsIcon',
        path: AppUrls.PERSONAL_EXPENSE,
    }
  ]

  const drawer = (
    <>
      <Box className={classes.sidebarLogoWrapper}>
        <div className={classes.sidebarLogo}>
            <img width="40" height="40" src={sharePurseIcon1} alt="coins"/>
        </div>
        <Typography className={classes.brandName}>
          Share Purse
        </Typography>
      </Box>
      <InlineStyleFlexbox alignItems="unset" justifyContent="space-between" flexDirection="column" height="100%">
        <List className={classes.list}>
          {
              MENU_BAR_ENUM.map((menu, idx) => {
                  return (
                      <ListItem 
                          key={`${menu.title}_${idx}`}
                          button 
                          onClick={() => {
                              history.push(menu.path)
                              // handleDrawerToggle();
                          }}
                      >
                          <MenuItemCustom className={history.location.pathname.includes(menu.path.split('/')[1]) ? classes.activeMenu : ''}>
                              <img src={menu.icon} alt={menu.altIconTxt} />
                              <Typography>
                                  {menu.title || ''}
                              </Typography>
                          </MenuItemCustom>
                      </ListItem>
                  )
              })
          }
        </List>
        <List className={classes.list}>
          <ListItem button onClick={() => setSettingPage(true)}>
            <MenuItemCustom>
              <Avatar
                alt={""}
                src={getBeImgaeFullUrl(userData?.image)}
                imgProps={{
                  width: "40%",
                  height: "40%",
                }}
              />
              <Typography>
                Settings
              </Typography>
            </MenuItemCustom>
          </ListItem>
          <ListItem button onClick={logOutUser}>
            <MenuItemCustom >
              <ImgInlineStyle src={logout} altIcon='logutIcon' />
              <Typography>
                Logout
              </Typography>
            </MenuItemCustom>
          </ListItem>
        </List>
      </InlineStyleFlexbox>
    </>
  );

  return (
    <div className={classes.root}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <main className={classes.content}>
          {children}
      </main>
      <Hidden smUp implementation="css">
        <IconButton
            color="inherit"
            // aria-label="open drawer"
            onClick={handleDrawerToggle}
            className={classes.menuIconStyles}
        >
            <MenuIcon />
        </IconButton>
      </Hidden>
      <CenteredModal
        isOpen={openSettingPage}
        title="Create Group"
        onClose={() => setSettingPage(false)}
        width="fit-content"
        maxWidth="92%"
        height="fit-content"
        minHeight={240}
      > 
        Settings
      </CenteredModal>
    </div>
  );
};

export default FixedSidebar;
