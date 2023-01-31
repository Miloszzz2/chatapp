import {
  TabPanels,
  TabPanel,
  Flex,
  Text,
  InputGroup,
  Input,
  Spinner,
  InputRightElement,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { auth, db } from '../FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { v4 as uuidv4 } from 'uuid';

function Messages({ tabs, tabIndex }) {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const getMessages = async () => {
    const querySnapshot = await getDocs(collection(db, 'Messages'));
    querySnapshot.forEach((doc) => {
      setMessages((messages) => [
        ...messages,
        {
          text: doc.data().text,
          chat: doc.data().chat,
          id: uuidv4(),
          user: doc.data().user,
        },
      ]);
    });
    setLoading(true);
  };
  useEffect(() => {
    if (messages.length === 0) return () => getMessages();
  }, [user]);

  return (
    <TabPanels>
      {loading ? (
        tabs &&
        tabs.map((item) => {
          return (
            <TabPanel h='100%' key={item}>
              <Flex
                direction='column'
                h='100%'
                paddingBottom='15px'
                justifyContent='end'
                alignItems='end'
              >
                {messages &&
                  messages.map((message) => {
                    if (message.chat == tabs[tabIndex]) {
                      return (
                        <Text
                          size='md'
                          margin='10px 0px'
                          padding='10px 20px'
                          bg={
                            message.user == user.displayName
                              ? 'blue.100'
                              : 'green.100'
                          }
                          color='black'
                          width='fit-content'
                          p='5px 10px'
                          borderRadius='md'
                          key={message.id}
                          alignSelf={
                            message.user == user.displayName ? 'end' : 'start'
                          }
                        >
                          {message.text}
                        </Text>
                      );
                    }
                  })}

                <InputGroup h='10%'>
                  <Input />
                  <InputRightElement>
                    <AddIcon />
                  </InputRightElement>
                </InputGroup>
              </Flex>
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

export default Messages;
