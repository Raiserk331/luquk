'use client';
import React, { ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider, Box, Portal, useDisclosure } from '@chakra-ui/react';
import theme from '@/theme/theme';
import routes from '@/routes';
import Sidebar from '@/components/sidebar/Sidebar';
import Footer from '@/components/footer/FooterAdmin';
import Navbar from '@/components/navbar/NavbarAdmin';
import { getActiveRoute, getActiveNavbar } from '@/utils/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import '@/styles/App.css';
import '@/styles/Contact.css';
import '@/styles/Plugins.css';
import '@/styles/MiniCalendar.css';
import AppWrappers from './AppWrappers';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [apiKey, setApiKey] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const initialKey = localStorage.getItem('apiKey');
    console.log(initialKey);
    if (initialKey?.includes('sk-') && apiKey !== initialKey) {
      setApiKey(initialKey);
    }
  }, [apiKey]);

  return (
    <html lang="ru">
      <body id={'root'}>
        <AppWrappers>
          {/* <ChakraProvider theme={theme}> */}
          {pathname?.includes('register') || pathname?.includes('sign-in') ? (
            children
          ) : (
            <Box>
              <Sidebar setApiKey={setApiKey} routes={routes} />
              <Box
                pt={{ base: '60px', md: '100px' }}
                float="right"
                minHeight="100vh"
                height="100%"
                overflow="auto"
                position="relative"
                maxHeight="100%"
                w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
                maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
                transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
                transitionDuration=".2s, .2s, .35s"
                transitionProperty="top, bottom, width"
                transitionTimingFunction="linear, linear, ease"
              >
                <Portal>
                  <Box>
                    <Navbar
                      setApiKey={setApiKey}
                      onOpen={onOpen}
                      logoText={'Luquk — GPT‑ассистент'}
                      brandText={getActiveRoute(routes, pathname)}
                      secondary={getActiveNavbar(routes, pathname)}
                    />
                  </Box>
                </Portal>
                <Box
                  mx="auto"
                  p={{ base: '20px', md: '30px' }}
                  pe="20px"
                  minH="100vh"
                  pt="50px"
                >
                  {children}
                  {/* <Component apiKeyApp={apiKey} {...pageProps} /> */}
                </Box>
                <Box>
                  <Footer />
                </Box>
              </Box>
            </Box>
          )}
          {/* </ChakraProvider> */}
        </AppWrappers>
      </body>
    </html>
  );
}
