const express = require("express")
const { protect } = require("../middleware/authMiddleware");
const { sendMessage, fetchAllMessages} = require("../controllers/messageControllers")

const router = express.Router()

router.route('/').post(protect,sendMessage)
router.route('/:chatId').get(protect,fetchAllMessages)

module.exports=router