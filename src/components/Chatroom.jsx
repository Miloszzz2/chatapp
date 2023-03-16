import { auth, db } from '../FirebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  useToast,
  Button,
  Heading,
  Center,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Flex,
  Spacer,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Avatar,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import Chats from './Chats';
import Chat from './Chat';
function Chatroom() {
  const [user] = useAuthState(auth);

  const [tabs, setTabs] = useState([]);
  const [newChatItem, setNewChatItem] = useState();
  const [tabIndex, setTabIndex] = useState(0);
  const [availableUsers, setAvailableUser] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth);
    toast({
      title: 'Logged out sucessful',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    navigate('/', { replace: true });
  };
  const addChat = async () => {
    await setDoc(doc(db, 'Chats', newChatItem), {
      createdBy: user.displayName,
      isVisibleTo: availableUsers.split(', '),
      name: newChatItem,
    });
    setTabs((tabs) => [...tabs, newChatItem]);
    onClose();
    toast({
      title: 'Chat successfully added',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    setTabIndex(tabs.length);
  };
  return (
    <Center h='100vh'>
      {user ? (
        <Box
          border='2px'
          borderColor='gray.600'
          borderRadius='lg'
          h='75vh'
          overflow='hidden'
        >
          <Center height='12vh' padding='0 0 0 20px'>
            <Flex w='300px' alignItems='center' padding='10px'>
              <Heading size='lg'>Chats</Heading>
              <Spacer />
              <Avatar
                size='sm'
                m='0 20px'
                name={user.displayName}
                background='blue.100'
              />
              <AddIcon onClick={onOpen} />
              <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Create new chat</DrawerHeader>

                  <DrawerBody>
                    <Input
                      placeholder='Enter chat name'
                      onChange={(e) => {
                        setNewChatItem(e.target.value);
                      }}
                    />
                    <Input
                      placeholder='Chat users(Janek, Adam etc.)'
                      marginTop='20px'
                      onChange={(e) => {
                        setAvailableUser(e.target.value);
                      }}
                    />
                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme='blue' onClick={addChat}>
                      Add
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </Flex>
            <Divider orientation='vertical' h='12vh' />
            <Box w='700px' paddingLeft='20px'>
              <Heading size='lg'>{tabs[tabIndex]}</Heading>
            </Box>
          </Center>
          <Divider />
          <Box h='65vh' overflow='hidden'>
            <Tabs
              orientation='vertical'
              variant='soft-rounded'
              colorScheme='blue'
              index={tabIndex}
              onChange={(index) => {
                setTabIndex(index);
              }}
            >
              <Box>
                <Chats tabs={tabs} setTabs={setTabs} />
              </Box>
              <Divider orientation='vertical' h='65vh' />
              <Chat tabs={tabs} tabIndex={tabIndex} />
            </Tabs>
          </Box>
          <Button
            colorScheme='blue'
            position='absolute'
            onClick={logout}
            top='20px'
            right='20px'
          >
            <Link to='/'>Logout</Link>
          </Button>
        </Box>
      ) : (
        <Navigate to='/' repalace></Navigate>
      )}
    </Center>
  );
}

export default Chatroom;
