import React from 'react';

export default function ModalModifyGroupChat({ isEditing, chatRenamed, setChatRenamed, handleGroupChatNameChange, chatName,
    toggleEditMode, valueEntered, handleInputChange, handleKeyDown,toggleGroupChatModalModifier, 
    groupUsers, searchUsers, addToGroupChat, removeFromGroupChat, removeUserFromGroup, list }) {

    const handleRemoveUser = (userID) => {
        removeFromGroupChat(userID);
        removeUserFromGroup(userID);
    };

    const handleAddUser = (userID) => {
        addToGroupChat(userID);
    };

    return (
        <div className='modalOverlay'>
            <div className='modalForModyfingGroupChat'>
                <div className='editGroupName'>
                    {isEditing ? (
                        <input className='chatNameModifier'
                            type="text"
                            value={chatRenamed}
                            onChange={(e) => setChatRenamed(e.target.value)}
                            onKeyDown={handleGroupChatNameChange}
                        />
                    ) : (<p className='font'>{chatName}</p>)}
                    <img src="/edit_.png" alt="" onClick={toggleEditMode} />
                </div>

                <input
                    type="text"
                    placeholder="Add Users"
                    value={valueEntered}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />

                <div className='groupUsersList'>
                    {list && searchUsers.map((user) => (
                        <div key={user._id} className="userItem">
                            {user.name} <button onClick={() => handleAddUser(user._id)}>Add</button>
                        </div>
                    ))}
                </div>

                <div className="groupUsersList">
                    {groupUsers.map((data) => (
                        <div key={data._id} className="userInGroup">
                            {data.name} <span onClick={() => handleRemoveUser(data._id)}>x</span>
                        </div>
                    ))}
                </div>
                <div className='buttons'>
                    <button className='closeBtn' onClick={toggleGroupChatModalModifier}>Close</button>
                </div>
            </div>
        </div>
    );
}
