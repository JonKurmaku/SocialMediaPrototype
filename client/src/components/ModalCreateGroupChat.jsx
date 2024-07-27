export default function ModalCreateGroupChat({ groupChatName, setGroupChatName, inputValue, handleInputChange, handleKeyDown, handleCreateGroupChat, toggleGroupChatModal, searchUsers }) {
    return (
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
    )
} 