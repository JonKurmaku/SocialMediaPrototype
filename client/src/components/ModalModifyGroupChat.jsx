export default function ModalModifyGroupChat({ isEditing, chatRenamed, setChatRenamed, handleGroupChatNameChange, chatName,
    toggleEditMode, valueEntered, handleInputChange, handleKeyDown, toggleGroupChatModalModifier, groupUsers }) {
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

                <div className="groupUsersList">
                    {groupUsers.map((data, index) => (
                        <div key={index} className="userInGroup">{data.name}</div>
                    ))}
                </div>
                <div className='buttons'>
                    <button className='closeBtn' onClick={() => {
                        toggleGroupChatModalModifier()
                    }}>Close</button>
                </div>
            </div>
        </div>
    )
}