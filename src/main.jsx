import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import SignIn from './components/SignIn';
import Chatroom from './components/Chatroom';
import App from './App';
import Invalid from './components/Invalid';
import SignUp from './components/SignUp';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './theme';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<App />} />
      <Route path='login' element={<SignIn />} />
      <Route path='register' element={<SignUp />} />
      <Route path='chatroom' element={<Chatroom />} />
      <Route path='invalid' element={<Invalid />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
