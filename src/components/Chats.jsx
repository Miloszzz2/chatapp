import { TabList, Tab, Spinner, Box, Flex } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db, auth } from '../FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

function Chats({ tabs, setTabs }) {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getChats = async () => {
      const q = query(
        collection(db, 'Chats'),
        where('isVisibleTo', 'array-contains', user.displayName)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) =>
        setTabs((tabs) => [...tabs, doc.data().name])
      );
      setLoading(true);
    };
    return () => getChats();
  }, [user.displayName]);

  return (
    <TabList p='10px' h='65vh'>
      {loading ? (
        tabs.map((item) => {
          return (
            <Tab key={item} w='300px'>
              {item}
            </Tab>
          );
        })
      ) : (
        <Flex w='300px' h='100%' alignItems='center' justifyContent='center'>
          <Spinner size='xl' thickness='5px' />
        </Flex>
      )}
    </TabList>
  );
}

export default Chats;
