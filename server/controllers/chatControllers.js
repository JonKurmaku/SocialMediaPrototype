const asyncHandler = require("express-async-handler")
const Chat = require("../models/chatModel")
const User = require("../models/userModel")

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400)
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage")

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {

    //  sender :: receiver.name
    //  receiver :: sender.name
    //    if(user._id === chat.name || isSingleChat){
    //    chat.name => other name
    //  }
    
    let receiver = await User.findOne({ _id: userId })
    var chatData = {
      chatName: receiver.name,
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData)
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat)
    } catch (error) {
      res.status(400)
      throw new Error(error.message)
    }
  }
})

const fetchChats = asyncHandler(async (req, res) => {
 // let allChats = []

 const chats = await Chat.find({
  $or: [
    { users: req.user._id },
    { groupAdmin: req.user._id }
  ]
})
.populate("users", "name email") 
.populate("groupAdmin", "name email") 
.populate({
  path: "latestMessage",
  populate: {
    path: "sender",
    select: "name pic email"
  }
});

//console.log(chats)
   /* const singlechats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
    .populate("users", "name email") 
    .populate("groupAdmin", "name email") 
    .populate({
      path: "latestMessage",
      populate: {
        path: "sender",
        select: "name pic email"
       
    }
  })

  const multiChat = await Chat.find({ "groupAdmin._id": req.user._id })
  console.log(multiChat)
  //allChats.push(singlechats)
  //allChats.push(multiChat)
  */

res.status(200).send(chats)    
    
}) 

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the fields" })
  }

  let users = JSON.parse(req.body.users)

  if (users.length < 2) {
    return res
      .status(400)
      .send({ message: "Group chat requires more than 2 users" })
  }
  console.log(req.body);
  //users.push(req.user) removed GroupAdmin from Users array
  console.log(users);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    })

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "name email")
      .populate("groupAdmin", "name email")

    res.status(200).json(fullGroupChat)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

const renameGroupChat = asyncHandler(async (req, res) => {

  const { chatId, newChatName } = req.body

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId, {
    chatName: newChatName
  },
    {
      new: true
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password")

  if (!req.body.newChatName) {
    res.status(400).send({ message: "Enter a new name for the chat " })
  }
  else {
    res.status(200).send({ message: "Chat renamed successfully" })
  }
})

const addToGroup = asyncHandler(async (req, res) => {
  const { userId, chatId } = req.body

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password")

  if (!added) {
    res.status(400)
    throw new Error("Chat Not Found")
  } else {
    res.json(added)
  }
})

const removeFromGroup = asyncHandler(async (req, res) => {
  const { userId, chatId } = req.body

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password")

  if (!removed) {
    res.status(400)
    throw new Error("Chat Not Found")
  } else {
    res.json(removed)
  }
})

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  addToGroup,
  removeFromGroup
}