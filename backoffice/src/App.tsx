import React, { FC } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Router from './pages/Router';
import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/400.css'
import SessionProvider from './utils/SessionProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StyleFunctionProps } from "@chakra-ui/theme-tools"

const theme = extendTheme({
  config: {
    initialColorMode: 'dark'
  },
  fonts: {
    heading: 'Open Sans',
    body: 'Raleway',
  },
  components: {
    Button: {
        defaultProps: {
            variant: 'white',
        },
        variants: {
            'white': {
                color: "#283c4d",
                bg:"#ECE6D6",
                _hover: {
                    bg: "#DBD5C5",
                    _disabled: {
                        bg: "#DBD5C5"
                    }
                },
            },
        }
    },
    Menu: {
        baseStyle: (props: StyleFunctionProps) => ({
            list: {
                _focus: {
                    bg: "#1E2F3D",
                },
                bg: "#1E2F3D",
            },
            item: {
                _focus: {
                    bg: "#1E2F3D",
                },
                _hover: {
                    bg: "#283c4d",
                },
                bg: "#1E2F3D",
                color: "#ECE6D6"
            }
        }),
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
const queryClient = new QueryClient()

const App: FC = () => {
  return (
    <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <Router />
            </SessionProvider>
        </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
