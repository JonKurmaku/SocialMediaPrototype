import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const ChatsView = () => {

    const [chats, setChats] = useState([]);
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const [selectedChat, setSelectedChat] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [showGroupChatModal, setShowGroupChatModal] = useState(false);
    const [showGroupChatModalModifier, setShowGroupChatModalModifier] = useState(false);
    const [searchUsers, setSearchUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [groupChatName, setGroupChatName] = useState('');
    const [message, setMessage] = useState('');
    const [chatID, setChatID] = useState();
    const [chatName, setChatName] = useState('');
    const [hasLoaded, setHasLoaded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [chatRenamed, setChatRenamed] = useState('');
    // const [loadingChat, setLoadingChat] = useState();

    const fetchedData = async () => {
        try {
            let user = localStorage.getItem('userInfo');
            user = JSON.parse(user)
            let Token = user.token

            const config = {
                headers: {
                    Authorization: `Bearer ${Token}`,
                    'Cache-Control': 'no-cache', // Disable cache
                    Pragma: 'no-cache', // Disable cache
                    Expires: '0', // Disable cache
                },
            };

            const { data } = await axios.get('/api/chat', config);
            console.log(data);
            setChats(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchedData();
    }, []);


    const handleSearch = async () => {
        if (!search) {
            alert('You should enter a name here');
            return;
        }

        try {
            let user = localStorage.getItem('userInfo');
            user = JSON.parse(user)
            let Token = user.token

            const config = {
                headers: {
                    Authorization: `Bearer ${Token}`,
                    'Cache-Control': 'no-cache', // Disable cache
                    Pragma: 'no-cache', // Disable cache
                    Expires: '0', // Disable cache
                },
            };

            const { data } = await axios.get(`/api/user?search=${search}`, config);
            console.log(data);
            setSearchResult(data);
            // setChats(data);
        } catch (error) {
            alert('Error getting the user', error);
        }
    }

    const accessChat = async (userId) => {
        try {
            let user = localStorage.getItem('userInfo');
            user = JSON.parse(user)
            let Token = user.token
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${Token}`,
                    'Cache-Control': 'no-cache', // Disable cache
                    Pragma: 'no-cache', // Disable cache
                    Expires: '0', // Disable cache
                },
            };

            const { data } = await axios.post('/api/chat', { userId }, config);
            console.log(data);

            const existingChat = chats.find(chat => chat._id === data._id);
            if (!existingChat) {
                setChats(prevChats => [...prevChats, data]);
            }
            setSearchResult([]);
            setHasLoaded(false);
            console.log(data._id);
            // setChatID(data._id);
            // console.log(chatID);
        } catch (error) {
            console.error('Error accessing chat:', error.response ? error.response.data : error.message);
        }
    }

    const seeChat = async (userID) => {
        try {
            let user = localStorage.getItem('userInfo');
            user = JSON.parse(user)
            let Token = user.token

            const config = {
                headers: {
                    Authorization: `Bearer ${Token}`,
                    'Cache-Control': 'no-cache', // Disable cache
                    Pragma: 'no-cache', // Disable cache
                    Expires: '0', // Disable cache
                },
            };


            const { data } = await axios.get(`/api/message/${userID}`, config);
            console.log(data);
            setChatMessages(data);
            setHasLoaded(true);
        } catch (error) {
            console.log(error);
        }
    }

    //function to create a group chat
    const createGroupChat = async (name, users) => {
        try {
            let user = localStorage.getItem('userInfo');
            user = JSON.parse(user)
            let Token = user.token

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${Token}`,
                    'Cache-Control': 'no-cache', // Disable cache
                    Pragma: 'no-cache', // Disable cache
                    Expires: '0', // Disable cache
                },
            };

            const body = {
                name: name,
                users: JSON.stringify(users.map(user => user._id))
            };

            const { data } = await axios.post('/api/chat/group', body, config)
            console.log(data);

            const existingChat = chats.find(chat => chat._id === data._id);
            if (!existingChat) {
                setChats(prevChats => [...prevChats, data]);
            }
        } catch (error) {
            console.log(error);
        }

    }

    //function to update chat name
    const renameGroupChat = async (chatId, chatName) => {
        try {
            let user = localStorage.getItem('userInfo');
            user = JSON.parse(user)
            let Token = user.token

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${Token}`,
                    'Cache-Control': 'no-cache', // Disable cache
                    Pragma: 'no-cache', // Disable cache
                    Expires: '0', // Disable cache
                },
            };

            const body = {
                chatId: chatID,
                newChatName: chatRenamed
            }

            const {data} = await axios.put('/api/chat/rename', body, config);
            console.log(data);

        }catch (error){
            console.log(error);
        }
    }

    //function to send a message to a single chat or group chat
    const sendMessage = async () => {
        try {
            let user = localStorage.getItem('userInfo');
            user = JSON.parse(user)
            let Token = user.token
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${Token}`,
                    'Cache-Control': 'no-cache', // Disable cache
                    Pragma: 'no-cache', // Disable cache
                    Expires: '0', // Disable cache
                },
            };

            const body = {
                "content": message,
                "chatId": chatID
            };

            console.log("Sending message:", body);

            const { data } = await axios.post('/api/message', body, config);
            console.log(data);

            setMessage('');
        } catch (error) {
            console.log(error);
        }
    }

    const toggleGroupChatModal = () => {
        setShowGroupChatModal(!showGroupChatModal);
    };

    const toggleGroupChatModalModifier = () => {
        setShowGroupChatModalModifier(!showGroupChatModalModifier);

    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        setChatRenamed(chatName);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setSearchUsers([...searchUsers, { name: inputValue }]);
            setInputValue('');
        }
    };

    const handleCreateGroupChat = () => {
        createGroupChat(groupChatName, searchUsers);
        setShowGroupChatModal(false);
    };

    const handleGroupChatNameChange = (e) => {
        if (e.key === 'Enter') {
            renameGroupChat(chatID, chatName);
            setIsEditing(!isEditing);
            setChatName(e.target.value);
        }
    }


    return (
        
        <>
            <div className="big-container">
                <div className="navbar">
                    <div className="searchUser">
                        <img src="/searchLogo.png" alt="Search" onClick={handleSearch} />
                        <input type="text" placeholder="Search User" onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <h2>ChillChat</h2>
                </div>
                <div className="chatView">
                    <div className='chatNav'>
                        <div className="chatItems">
                            <h1 className="font">My Chats</h1>
                            <div className="newGroup" onClick={toggleGroupChatModal}>
                                <button>New Group Chat</button>
                                <img src="/addLogo.png" alt="" />
                            </div>
                        </div>

                        <div className="chatList">
                            {
                                chats.map((data) => (
                                    <div key={data._id} onClick={() => {
                                        seeChat(data._id)
                                        setChatID(data._id);
                                        setChatName(data.chatName);
                                        setSelectedChat(data.isGroupChat);
                                    }}>{data.chatName}</div>
                                ))
                            }
                        </div>

                        <div className="searchResultList">
                            {
                                searchResult.map((user) => (
                                    <div key={user._id} className="userItem" onClick={() => accessChat(user._id)}>
                                        {/* <img src={user.profilePicture || '/defaultProfilePicture.png'} alt={user.name} className="userImage" /> */}
                                        <div className="userInfo">
                                            <h3>{user.name}</h3>
                                            <h3>{user.email}</h3>
                                            {/* <p>{user.statusMessage || 'No status message'}</p> */}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className='chatPlace'>
                        {!hasLoaded && chatMessages.length === 0 ? (
                            <h1>Click on a user to start chatting</h1>
                        ) : (
                            <>
                                {!selectedChat ? (
                                    <div className='chatIdentifier'>
                                        <h2 className='font'>{chatName}</h2>
                                    </div>
                                ) : (
                                    <div className='chatIdentifier'>
                                        <h2 className='font'>{chatName}</h2>
                                        <img src="/visibility.png" alt="" onClick={toggleGroupChatModalModifier} />
                                    </div>
                                )
                                }
                                <div className="messages">
                                    {chatMessages.map((msg) => (
                                        <div key={msg._id}>
                                            <strong>{msg.sender.name}: </strong>
                                            {msg.content}
                                        </div>
                                    ))}
                                </div>
                                <div className='chatUtils'>
                                    <input type="text" placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)} />
                                    <button onClick={sendMessage}>Send</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>



            {/* modal for creating groupchat */}            
            {showGroupChatModal && (
                <div className='modalOverlay'>
                    <div className='modalForCreatingGroupChat'>
                        <h2 className='font'>Create Group Chat</h2>
                        <input
                            type="text"
                            placeholder="Enter chat name"
                            value={groupChatName}
                            onChange={(e) => setGroupChatName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Add Users"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />

                        <div className='users'>
                            {searchUsers.map((user, index) => (
                                <div key={index}>{user.name}</div>
                            ))}
                        </div>
                        <div className='buttons'>
                            <button className='createBtn' onClick={handleCreateGroupChat}>Create Chat</button>
                            <button className='closeBtn' onClick={toggleGroupChatModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}



            {/* modal for modifying groupchat */}  
            {showGroupChatModalModifier && (
                <div className='modalOverlay'>
                    <div className='modalForCreatingGroupChat'>
                        <div className='editGroupName'>
                            {!isEditing ? (
                                 <input className='chatNameModifier'
                                 type="text"
                                 value={chatRenamed}
                                 onChange={(e) => setChatRenamed(e.target.value)}
                                 onKeyDown={handleGroupChatNameChange}
                             />
                            ):(<p className='font'>{chatName}</p>)}
                            <img src="/edit_.png" alt="" onClick={toggleEditMode}/>
                        </div>

                        <input
                            type="text"
                            placeholder="Add Users"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />

                        <div className='buttons'>
                            <button className='closeBtn' onClick={() => {
                                toggleGroupChatModalModifier()
                                }}>Close</button>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
};
