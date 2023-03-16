import {
  TabPanels,
  TabPanel,
  Flex,
  Text,
  InputGroup,
  Input,
  Spinner,
  InputRightElement,
  useToast,
  Box,
  Avatar,
  Center,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { auth, db } from '../FirebaseConfig';
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { v4 as uuidv4 } from 'uuid';
import ScrollToBottom from 'react-scroll-to-bottom';
import Messages from './Messages';
import '../App.css';
function Chat({ tabs, tabIndex }) {
  const messageInput = useRef();
  const [user] = useAuthState(auth);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const addNewMessage = async () => {
    if (newMessage !== '') {
      await addDoc(collection(db, 'Messages'), {
        chat: tabs[tabIndex],
        user: user.displayName,
        text: newMessage,
        createdAt: Timestamp.fromDate(new Date()),
        id: uuidv4(),
      });
      setNewMessage('');
    } else {
      toast({
        title: "Don't send empty message",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const getMessages = () => {
      const q = query(collection(db, 'Messages'), orderBy('createdAt', 'asc'));
      onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
        setLoading(true);
      });
    };

    return () => getMessages();
  }, [user]);

  return (
    <TabPanels h='65vh'>
      {loading ? (
        tabs &&
        tabs.map((item) => {
          return (
            <TabPanel key={item} paddingTop='0' paddingRight='0'>
              <ScrollToBottom
                className='scroller'
                followButtonClassName='scroller_button'
              >
                <Flex
                  padding=' 0 5px'
                  overflowY='auto'
                  overflowX='hidden'
                  direction='column'
                  alignItems='end'
                >
                  <Messages
                    messages={messages}
                    tabs={tabs}
                    tabIndex={tabIndex}
                    user={user}
                  />
                  <Box h='5px' w='1px'></Box>
                </Flex>
              </ScrollToBottom>
              <Center w='100%' paddingRight='15px'>
                <InputGroup h='10vh'>
                  <Input
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();

                        addNewMessage();
                      }
                    }}
                    ref={messageInput}
                    value={newMessage}
                  />
                  <InputRightElement>
                    <AddIcon onClick={addNewMessage} cursor='pointer' />
                  </InputRightElement>
                </InputGroup>
              </Center>
            </TabPanel>
          );
        })
      ) : (
        <Flex w='700px' h='100%' alignItems='center' justifyContent='center'>
          <Spinner size='xl' thickness='5px' />
        </Flex>
      )}
    </TabPanels>
  );
}

export default Chat;
