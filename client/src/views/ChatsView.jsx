import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const ChatsView = () => {
    
    const [chats, setChats] = useState([]);
    
    const fetchedData = async () => {
        try {
            const { data } = await axios.get('/api/chat');
            setChats(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchedData();
    }, []);

    return (
        <div>
            <h2>Chats</h2>
            {chats.map((data) => (
                <div key={data._id}>{data.chatName}</div>
            ))}
        </div>
    );
};
