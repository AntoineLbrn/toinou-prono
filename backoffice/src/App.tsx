import React, { FC } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Router from './pages/Router';
import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/400.css'

const theme = extendTheme({
  fonts: {
    heading: 'Open Sans',
    body: 'Raleway',
  },
  components: {
      Badge: {
          baseStyle: {
              textTransform: 'inherit',
              fontWeight: '400',
              borderRadius: '4px',
              height: '24px',
              lineHeight: '24px',
          },
          variants: {
              purple: {
                  bg: 'purple.50',
                  color: 'purple.700',
              },
              solid: {
                  bg: 'teal.800',
              },
              subtle: {
                  bg: 'green.50',
              },
          },
      },
  },
  styles: {
      global: {
          'html, body': {
              height: '100%',
              width: '100%',
              backgroundColor: '#283c4d',
              fontSize: '16px',
          },
          '#root': {
              height: '100%',
              width: '100%',
          },
      },
  },
});

const App: FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  );
}

export default App;
