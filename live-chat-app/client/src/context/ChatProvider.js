import React, { createContext, useContext, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect(process.env.REACT_APP_SERVER);
const ChatContext = createContext();

export const useChat = () => {
    return useContext(ChatContext);
}

export const ChatProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [currentRoom, setCurrentRoom] = useState(null);
    const [messages, setMessages] = useState('')
    
    const value = {
        socket,
        userName,
        setUserName,
        setCurrentRoom,
        currentRoom
    };
    
    return (
        <ChatContext.Provider value={ value }>
            { children }
        </ChatContext.Provider>
    );
};