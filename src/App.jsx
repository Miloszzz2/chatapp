import { useState } from 'react';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './FirebaseConfig';
import 'firebase/firestore';
import Chatroom from './components/Chatroom';
import { useNavigate } from 'react-router-dom';
import { useColorMode, Button, Center, HStack } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
function App() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Center h='100vh'>
      {user ? (
        <Chatroom />
      ) : (
        <HStack>
          <Button
            onClick={() => {
              navigate('/login');
            }}
          >
            Sign In
          </Button>
          <Button
            onClick={() => {
              navigate('/register');
            }}
          >
            Sign Up
          </Button>
          <Button
            position='absolute'
            top='5'
            right='5'
            h='50'
            w='50'
            className='toogle_theme'
            onClick={toggleColorMode}
            bg={colorMode === 'light' ? 'lightgrey' : 'gray.600'}
          >
            {colorMode === 'light' ? (
              <MoonIcon boxSize={5} />
            ) : (
              <SunIcon boxSize={5} />
            )}
          </Button>
        </HStack>
      )}
    </Center>
  );
}

export default App;
