import React, { createContext, useContext, useState, useEffect } from 'react';
import { createSocketConnection, EVENTS } from '@pushprotocol/socket';

const user = '0xD8634C39BBFd4033c0d3289C4515275102423681';
const chainId = 5;
const userCAIP = `eip155:${chainId}:${user}`;

const ChatContext = createContext();

export const useChat = () => {
    return useContext(ChatContext);
}

export const ChatProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [currentRoom, setCurrentRoom] = useState(null);
    const [sdkSocket, setSDKSocket] = useState(null);
    
    useEffect(() => {
        const connectionObject = createSocketConnection({
            user: userCAIP,
            env: 'dev',
            socketOptions: { autoConnect: true } // Start the connection automatically
        });

        setSDKSocket(connectionObject);

        return () => {
            if (sdkSocket) {
                sdkSocket.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (sdkSocket) {
            sdkSocket.on(EVENTS.CONNECT, () => {
                console.log('Connected to the Push Protocol server');
            });

            sdkSocket.on(EVENTS.DISCONNECT, () => {
                console.log('Disconnected from the Push Protocol server');
            });

            // You can add more event listeners here if needed.
        }
    }, [sdkSocket]);

    const value = {
        sdkSocket,
        userName,
        setUserName,
        setCurrentRoom,
        currentRoom
    };
    
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
        
    );
};
