import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/RestaurantMenu';
import LockIcon from '@material-ui/icons/HowToReg';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { AppBar, Menu, MenuItem, IconButton, Typography, Toolbar, Button} from '@material-ui/core';
import LoginDialog from '../Dialogs/loginDialog'
import RegistrationDialog from '../Dialogs/registrationDialog'
import FavoriteRecipesDialog from '../Dialogs/favoriteRecipesDialog'
import { toastr } from 'react-redux-toastr'

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
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenuOptions = Boolean(anchorEl);

  const [loginDialogOpened, setLoginDialogOpened] = React.useState(false);
  const [registrationDialogOpened, setRegistrationDialogOpened] = React.useState(false);
  const [favoriteRecipesDialogOpened, setFavoriteRecipesDialogOpened] = React.useState(false);

  const viewFavoriteRecipes = () => {
    setFavoriteRecipesDialogOpened(true)
    setAnchorEl(null);
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const logout = () => {
    handleClose()
    setUser(null)
    localStorage.removeItem('user');
    toastr.success("Successfully logged out!")
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: 'rgb(0, 0, 255, 0.8)', boxShadow: 'none'}}>
        <Toolbar>
          <MenuIcon style={{ marginRight: 5 }}/>
          <Typography variant="h5" className={classes.title}>
            ChefAssistant
          </Typography>

          { !user && (
            <Button style={{ color: 'white'}} onClick={() => setLoginDialogOpened(true)}>
              <LockIcon/> Login
            </Button>
          )}

          { user && (
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
                  { user.username }
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
                open={openMenuOptions}
                onClose={handleClose}
              >
                <MenuItem style={{width: 200}} onClick={viewFavoriteRecipes}>
                  <FavoriteIcon style={{marginRight: 5}} />
                  Favorite recipes
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

      <LoginDialog open={loginDialogOpened} handleClose={() => setLoginDialogOpened(false)}
        openRegisterDialog={() => setRegistrationDialogOpened(true)} setUser={(user) => setUser(user)}/>

      <RegistrationDialog open={registrationDialogOpened} handleClose={() => setRegistrationDialogOpened(false)}
        openLoginDialog={() => setLoginDialogOpened(true)} />
      
      <FavoriteRecipesDialog open={favoriteRecipesDialogOpened} handleClose={() => setFavoriteRecipesDialogOpened(false)} />
    </div>
  );
}