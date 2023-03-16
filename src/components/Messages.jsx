import { Avatar, Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';
const Messages = memo(function MemoMessages({
  messages,
  tabs,
  tabIndex,
  user,
}) {
  return (
    <>
      {messages &&
        messages.map((message, index) => {
          if (message.chat == tabs[tabIndex]) {
            return (
              <Flex
                alignSelf={message.user == user.displayName ? 'end' : 'start'}
                alignItems='center'
                key={message.id}
              >
                {message.user == user.displayName ? (
                  <>
                    <Text
                      size='md'
                      margin='5px'
                      padding='5px 10px'
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
                    >
                      {message.text}
                    </Text>
                    <Avatar
                      size='sm'
                      m='0 20px'
                      name={message.user[0]}
                      background={
                        message.user == user.displayName
                          ? 'blue.100'
                          : 'green.100'
                      }
                      margin='0 3px'
                      color='black'
                    />
                  </>
                ) : (
                  <>
                    <Avatar
                      size='sm'
                      m='0 20px'
                      name={message.user[0]}
                      background={
                        message.user == user.displayName
                          ? 'blue.100'
                          : 'green.100'
                      }
                      margin='0 3px'
                      color='black'
                    />
                    <Text
                      size='md'
                      margin='5px'
                      padding='5px 10px'
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
                    >
                      {message.text}
                    </Text>
                  </>
                )}
              </Flex>
            );
          }
        })}
    </>
  );
});

export default Messages;
