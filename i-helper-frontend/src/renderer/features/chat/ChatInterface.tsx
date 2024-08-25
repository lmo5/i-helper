import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const MessageItem = styled.div<{ isUser: boolean }>`
  background-color: ${props => props.isUser ? '#dcf8c6' : '#f2f2f2'};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  max-width: 70%;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

const InputContainer = styled.div`
  display: flex;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

interface Message {
  text: string;
  isUser: boolean;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newMessage: Message = { text: inputValue, isUser: true };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputValue('');

    try {
      const response = await window.iHelper.sendMessage(inputValue);
      const botMessage: Message = { text: response, isUser: false };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <ChatContainer>
      <h2>Chat</h2>
      <MessageList ref={messageListRef}>
        {messages.map((message, index) => (
          <MessageItem key={index} isUser={message.isUser}>
            {message.text}
          </MessageItem>
        ))}
      </MessageList>
      <InputContainer>
        <Input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatInterface;