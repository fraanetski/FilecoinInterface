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

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const {activateBrowserWallet} = useEthers()

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


            <Button sx={{
              color: 'text.primary',
              marginLeft: 0,
              marginRight: 3,

            }}
            onClick={() => activateBrowserWallet()}
            >
            <AccountBalanceWalletIcon />
            </Button>
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
            <a target="_blank" rel="noreferrer" href="https://twitter.com/addressinsight" style={{all: "unset"}}>
                <TwitterIcon />
                &nbsp;
            </a>
            <a target="_blank" rel="noreferrer" href="https://github.com/fraanetski/addressinsight" style={{all: "unset"}}>
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
            main: '#aa3eff',
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

