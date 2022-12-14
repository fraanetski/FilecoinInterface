import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import Logo from './addrlogo.png';
import Main  from './Main';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import LightModeIcon from '@mui/icons-material/LightMode';
import Container from '@mui/material/Container';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {useEthers} from "@usedapp/core";
import UAuth from '@uauth/js';
import PersonIcon from '@mui/icons-material/Person';
import { Typography } from '@mui/material';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const uauth = new UAuth(
  {
    clientID: "9f11b584-eeb9-4af1-985c-da66ff6055db",
    redirectUri: "https://filecoininterface.netlify.app/",
    scope: "openid wallet"
  })

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  var unse = window.localStorage.username
  if (unse) {
    var user = JSON.parse(unse)
    var uns = user.value
  }

  const doLogin = async () => {
    try {
        const authorization = await uauth.loginWithPopup();

        console.log(authorization);
        window.location.reload()
    } catch (error) {
        console.error(error);
    }
  }

  function logout() {
    window.localStorage.removeItem('username')
    window.location.reload()

  }


  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 0,
      }}
    >
      <Container maxWidth='md'>
        <Box sx={{
            display: 'flex',
        }}>
          <IconButton sx={{ 
            marginLeft: 5,
            marginRight: 'auto',
            }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <LightModeIcon /> : <NightlightRoundIcon />}
          </IconButton>


          <Container sx={{
            alignItems: 'center',
            // marginRight: '37%',
            marginRight: 'auto',
            marginLeft: 2,
            pt: 1.75,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',

          }}>
            <br/>
            <a href="/" style={{all: 'unset'}}>
            <img src={Logo} alt="logo" height='50'/>
            </a>
          </Container>



              {uns 
              ?
              <Button sx={{
                color: 'text.primary',
                marginLeft: 0,
                marginRight: 3,
  
              }}
              onClick={() => logout()}
              >
                {uns}
                </Button>
              :
                            <Button sx={{
                              color: 'text.primary',
                              marginLeft: 0,
                              marginRight: 3,
                
                            }}
                            onClick={() => doLogin()}
                            >
              <PersonIcon/>
            </Button>
}

          </Box>


        <Box sx={{
                  display: 'flex',
                  position: 'relative',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 0,
                  padding: 0,
                  pb: 1,
        }}>



        <Main/>
        
        <Box sx={{
            position: 'absolute',
            bottom: 0,
          }}>
            <a target="_blank" rel="noreferrer" href="https://github.com/fraanetski/ipfsinterface" style={{all: "unset"}}>
                <GitHubIcon />
            </a>
            <br/>
        </Box>
          <br/>

      </Box>
      </Container>
    </Box>
  );
}

export default function ToggleColorMode() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState(prefersDarkMode ? 'dark' : 'light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#3275a8',
          },
          secondary: {
            main: '#ff2f00',
          },
          mode,
        },
        typography: {
          fontFamily: ['Ubuntu']
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

