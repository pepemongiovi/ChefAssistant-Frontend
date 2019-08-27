import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/RestaurantMenu';
import LockIcon from '@material-ui/icons/HowToReg';
import RecipesIcon from '@material-ui/icons/ListAlt';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { AppBar, Menu, MenuItem, IconButton, Typography, Toolbar, Button} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuToolbar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const logout = () => {
    handleClose()
    setAuth(!auth)
  }

  const login = () => {
    setAuth(!auth)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: 'rgb(0, 0, 255, 0.8)', boxShadow: 'none'}}>
        <Toolbar>
          <MenuIcon style={{ marginRight: 5 }}/>
          <Typography variant="h5" className={classes.title}>
            ChefAssistant
          </Typography>

          { !auth && (
            <Button style={{ color: 'white'}} onClick={login}>
              <LockIcon/> Login
            </Button>
          )}

          { auth && (
            <div>
              
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
                <span style={{ fontSize: 15, marginLeft: 5 }}>
                  Giuseppe
                </span>
              </IconButton>
              
              
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem style={{width: 200}} onClick={handleClose}>
                  <RecipesIcon style={{marginRight: 5}} />
                  My recipes
                </MenuItem>
                <MenuItem style={{width: 200}} onClick={logout}>
                  <LogoutIcon style={{marginRight: 5}} />
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}