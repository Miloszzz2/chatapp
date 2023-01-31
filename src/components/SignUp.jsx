import { auth } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useToast,
  Center,
  VStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';

function SignIn() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const [loginUsername, setLoginUsername] = useState();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      await updateProfile(auth.currentUser, {
        displayName: loginUsername,
      }).catch((err) => console.log(err));
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/chatroom', { replace: true });
    } catch (e) {
      console.log(e);
      navigate('/invalid', { replace: true, state: { er: e.message } });
    }
  };
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        register();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [register]);
  return (
    <Center h='100vh'>
      <VStack spacing={5}>
        <Heading>SignUp</Heading>
        <Input
          type='text'
          borderColor='gray.300'
          name='username'
          id='username'
          placeholder='Username'
          onChange={(e) => {
            setLoginUsername(e.target.value);
          }}
        />
        <Input
          type='text'
          borderColor='gray.300'
          name='email'
          id='email'
          placeholder='Email'
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
        />
        <InputGroup size='md'>
          <Input
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

        <Button onClick={register}>Register</Button>
      </VStack>
    </Center>
  );
}
export default SignIn;
