import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import user from '../utils/loggedUser';
import ModalCreateGroupChat from '../components/ModalCreateGroupChat'
import ModalModifyGroupChat from '../components/ModalModifyGroupChat';

export const ChatsView = () => {
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const [selectedChat, setSelectedChat] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [showGroupChatModal, setShowGroupChatModal] = useState(false);
    const [showGroupChatModalModifier, setShowGroupChatModalModifier] = useState(false);
    const [searchUsers, setSearchUsers] = useState([]);
    const [groupChatName, setGroupChatName] = useState('');
    const [message, setMessage] = useState('');
    const [chatID, setChatID] = useState();
    const [chatName, setChatName] = useState('');
    const [hasLoaded, setHasLoaded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [chatRenamed, setChatRenamed] = useState('');
    const [userLoggedUser, setUserLoggedUser] = useState('');
    const [profileClicked, setProfileClicked] = useState(false);
    const [profileModal, setProfileModal] = useState(false);
    const [valueEntered, setValueEntered] = useState('');
    const [groupUsers, setGroupUsers] = useState([]);
    const [list, setList] = useState(true);
    // const [loadingChat, setLoadingChat] = useState();

    useEffect(() => {
        setUserLoggedUser(user().name);
    }, []);

    const fetchedData = async () => {
        try {
            let Token = user().token

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
            let Token = user().token

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

    const handleSearchUser = async (name) => {

        try {
            let Token = user().token

            const config = {
                headers: {
                    Authorization: `Bearer ${Token}`,
                    'Cache-Control': 'no-cache', // Disable cache
                    Pragma: 'no-cache', // Disable cache
                    Expires: '0', // Disable cache
                },
            };

            const { data } = await axios.get(`/api/user?search=${name}`, config);
            console.log(data);
            return data;
            // setChats(data);
        } catch (error) {
            alert('Error getting the user', error);
        }
    }

    const accessChat = async (userId) => {
        try {
            let Token = user().token
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
            let Token = user().token

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
    const createGroupChat = async (name) => {
        try {
            let Token = user().token

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
                users: JSON.stringify(searchUsers.map((user) => user._id))
            };

            const { data } = await axios.post('/api/chat/group', body, config)
            console.log(data);

            //data.users.map((u) => console.log(u.name));
            setGroupUsers(data.users);


            const existingChat = chats.find(chat => chat._id === data._id);
            if (!existingChat) {
                setChats(prevChats => [...prevChats, data]);
            }
        } catch (error) {
            console.log(error);
            return [];
        }

    }

    //function to update chat name
    const renameGroupChat = async (chatId, chatName) => {
        try {
            let Token = user().token

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

            const { data } = await axios.put('/api/chat/rename', body, config);
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    //function to remove someone from the group chat
    const removeFromGroupChat = async (userID) => {
        try {
            let Token = user().token

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
                userId: userID
            }

            const { data } = await axios.put('/api/chat/groupremove', body, config)
            console.log(data);

            setGroupUsers(prevGroupUsers => prevGroupUsers.filter(user => user._id !== userID));
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    //function to add someone to the group chat
    const addToGroupChat = async (userID) => {
        try {
            let Token = user().token;
    
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
                userId: userID
            };
    
            const { data } = await axios.put('/api/chat/groupadd', body, config);
            console.log("Added user data:", data);
    
            if (data.users) {
                setGroupUsers(data.users);
                setList(false); 
            } else {
                console.error('Unexpected data structure:', data);
            }
    
        } catch (error) {
            console.log("Error adding to group chat:", error);
        }
    }
    console.log('Group users:', groupUsers);

    //function to send a message to a single chat or group chat
    const sendMessage = async () => {
        try {
            let Token = user().token

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
            setChatMessages((prev) => [...prev, {
                chat: null,
                content: message,
                sender: data.sender.name
            }]);
        } catch (error) {
            console.log(error);
        }
    }

    const toggleGroupChatModal = () => {
        setShowGroupChatModal(!showGroupChatModal);
    };

    const toggleGroupChatModalModifier = () => {
        setShowGroupChatModalModifier(!showGroupChatModalModifier);
        setIsEditing(false)

        if (showGroupChatModalModifier) {
            fetchedData();
        }
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        setChatRenamed(chatName);
    };

    const toggleDropDownMenu = () => {
        setProfileClicked(!profileClicked);
    }

    const toggleProfileModal = () => {
        setProfileModal(true);
    }

    const handleInputChange = (e) => {
        setValueEntered(e.target.value);
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            console.log('Value Entered:', valueEntered);
            const data = await handleSearchUser(valueEntered);

            if (data.length > 0) {
                setSearchUsers((prev) => {
                    const existingUserIds = prev.map(user => user._id);
                    const newUsers = data.filter(user => !existingUserIds.includes(user._id));
                    return [...prev, ...newUsers];
                });
            }
            setValueEntered('');
        }
    };

    const handleCreateGroupChat = () => {
        createGroupChat(groupChatName);
        setShowGroupChatModal(false);
    };

    const handleGroupChatNameChange = (e) => {
        if (e.key === 'Enter') {
            renameGroupChat(chatID, chatName);
            setIsEditing(!isEditing);
            setChatName(e.target.value);
        }
    }

    const removeUserFromGroup = (userID) => {
        setGroupUsers(prevGroupUsers => prevGroupUsers.filter(user => user._id !== userID));
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    }

    return (

        <>
            <div className="big-container">

                {/* Navbar */}
                <div className="navbar">
                    <div className="searchUser">
                        <img src="/searchLogo.png" alt="Search" onClick={handleSearch} />
                        <input type="text" placeholder="Search user to chat" onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <h2>ChillChat</h2>
                    <div className='loggedUser' onClick={toggleDropDownMenu}>
                        <p>{userLoggedUser}</p>
                    </div>
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
                                        setGroupUsers(data.users);
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


                    {/*place where you can see messages */}
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
                                            <strong>{msg.sender.name ? msg.sender.name : msg.sender}: </strong>
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
            {showGroupChatModal && <ModalCreateGroupChat groupChatName={groupChatName} setGroupChatName={setGroupChatName}
                valueEntered={valueEntered} handleInputChange={handleInputChange} handleKeyDown={handleKeyDown}
                handleCreateGroupChat={handleCreateGroupChat} toggleGroupChatModal={toggleGroupChatModal}
                searchUsers={searchUsers} />}



            {/* modal for modifying groupchat */}
            {showGroupChatModalModifier && (
                <ModalModifyGroupChat isEditing={isEditing} chatRenamed={chatRenamed} setChatRenamed={setChatRenamed}
                    handleGroupChatNameChange={handleGroupChatNameChange} chatName={chatName} toggleEditMode={toggleEditMode}
                    valueEntered={valueEntered} handleInputChange={handleInputChange} handleKeyDown={handleKeyDown}
                    toggleGroupChatModalModifier={toggleGroupChatModalModifier} groupUsers={groupUsers} removeFromGroupChat={removeFromGroupChat}
                    removeUserFromGroup={removeUserFromGroup} searchUsers={searchUsers} addToGroupChat={addToGroupChat} list={list}
                />
            )}

            {/* Dropdown menu */}
            {profileClicked && (
                <div className='dropdownMenu'>
                    <h2 onClick={() => {
                        toggleProfileModal()
                        setProfileClicked(false)
                    }}>Profile</h2>
                    <h2 onClick={logout}>Log out</h2>
                </div>
            )}

            {profileModal && (
                <div className='modalOverlay'>
                    <div className='modalForProfile'>
                        <h2>Name: {user().name}</h2>
                        <h2>Email: {user().email}</h2>
                        <button className='closeBtn' onClick={() => setProfileModal(false)}>Close</button>
                    </div>
                </div>
            )}

        </>
    );
};
