// next
import { useRouter } from 'next/router';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Avatar, Popover, Typography } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// components
import Logo from '../../components/Logo';
import Label from '../../components/Label';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
import { getAuth, removeAuth } from 'services/identity.service';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetails } from 'src/redux/slices/userInfo';

// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const theme = useTheme();
  const { pathname, push } = useRouter();

  const isDesktop = useResponsive('up', 'md');

  const isHome = pathname === '/';
  const auth = getAuth();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleLogout = () => {
    removeAuth();
    push('/auth/login');
    dispatch(setUserDetails({}));
  };

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo />

          {/* <Label color="info" sx={{ ml: 1 }}>
            v3.3.0
          </Label> */}
          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}
          {auth && auth.token ? (
            ''
          ) : (
            <Button variant="outlined" target="_self" rel="noopener" href="/auth/login" style={{ marginRight: '10px' }}>
              Sign in
            </Button>
          )}

          {auth && auth.token ? (
            ''
          ) : (
            <Button variant="contained" target="_self" rel="noopener" href="/auth/register/">
              Sign up
            </Button>
          )}

          {auth && auth.token ? (
            <Avatar
              alt="Remy Sharp"
              src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_1.jpg"
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            ''
          )}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Typography sx={{ p: 2 }} style={{ minWidth: '200px', cursor: 'pointer' }}>
              Profile
            </Typography>
            <Typography
              sx={{ p: 2 }}
              style={{ minWidth: '200px', cursor: 'pointer' }}
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </Typography>
          </Popover>
          {/* <Button
            variant="contained"
            target="_blank"
            rel="noopener"
            href="https://material-ui.com/store/items/minimal-dashboard/"
          >
            Purchase Now
          </Button> */}

          {!isDesktop && <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
