import React, { useContext } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import AppContextBase from "./Base/appContext";
import AppUrls from "./Base/route/appUrls";
import { makeStyles } from "@material-ui/core";
// import ToggleColorMode from './ToggleColorMode';

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

const styles = makeStyles((theme) => ({
  toolbarStyles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
    borderRadius: "999px",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(24px)",
    maxHeight: 40,
    border: "1px solid",
    borderColor: theme.palette.divider,
    boxShadow: "0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)",
  }
}))

function AppAppBar({ history }) {
  const classes = styles();
  const [open, setOpen] = React.useState(false);
  const { setUserData, userData, logOutUser, toggleColorMode, mode } =
    useContext(AppContextBase);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            className={classes.toolbarStyles}
          >
            {/* Share Purse */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              {/* <img
                src={
                  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                }
                style={logoStyle}
                alt="logo of sitemark"
              /> */}
              <Typography style={logoStyle} color="text.primary">
                Share Purse
              </Typography>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem
                  onClick={() => history.push(AppUrls.HOME_PAGE)}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Home
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => history.push(AppUrls.GROUPS_LIST)}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Groups
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => history.push(AppUrls.HOME_PAGE)}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Analytics
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <Button
                color="primary"
                variant="contained"
                size="small"
                component="a"
                target="_blank"
                onClick={logOutUser}
              >
                Log Out
              </Button>
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <MenuItem onClick={() => history.push(AppUrls.HOME_PAGE)}>
                    Home
                  </MenuItem>
                  <MenuItem onClick={() => history.push(AppUrls.GROUPS_LIST)}>
                    Groups
                  </MenuItem>
                  <MenuItem onClick={() => history.push(AppUrls.HOME_PAGE)}>
                    Analytics
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      target="_blank"
                      sx={{ width: "100%" }}
                      onClick={logOutUser}
                    >
                      Log Out
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
