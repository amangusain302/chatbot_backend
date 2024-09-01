const express = require("express");
const { chatHistory } = require("../controllers/messageController");

const router = express.Router();

router.get("/message/history", chatHistory);

module.exports = router;