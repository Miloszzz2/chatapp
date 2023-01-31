import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import {
  useToast,
  Button,
  Input,
  Heading,
  Center,
  VStack,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
function SingUp() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const login = async (event) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      toast({
        title: 'Logged In',
        description: 'Logged succesful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/chatroom', { replace: true });
    } catch (e) {
      navigate('/invalid', { state: { er: e.message }, replace: true });
    }
  };
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        login();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [login]);
  return (
    <Center h='100vh'>
      <VStack spacing={6}>
        <Heading>Sign In</Heading>
        <Input
          borderColor='gray.300'
          type='text'
          size='md'
          name='email'
          placeholder='Email'
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
        />
        <InputGroup size='md'>
          <Input
            width='auto'
            type={show ? 'text' : 'password'}
            borderColor='gray.300'
            placeholder='Password'
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button onClick={login}>Login</Button>
      </VStack>
    </Center>
  );
}

export default SingUp;
