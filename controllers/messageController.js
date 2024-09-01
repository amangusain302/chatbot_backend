const { chatbot } = require("../services/openaiService");
const MESSAGE = require("./../models/message");

exports.chatHistory = async (req, res, next) => {
    try {
        const messages = await MESSAGE.find({});
        res.status(200).json({ status: true, data: messages });
    }
    catch (err) {
        res.status(500).json({ status: false, error : err.message });
    }
};

exports.messageHandler = async (req) => {
    try {
        const saveMessage = (new MESSAGE({
            senderType: "user",
            message: req.message
        })).save()

        // const botMessage = await chatbot(req)
        const botMessage = "JavaScript is a popular programming language commonly used for building interactive and dynamic websites. It is a versatile language that can be used for client-side scripting, server-side development, and even mobile app development. JavaScript code is typically embedded in HTML documents and can be used to manipulate the content of a webpage, respond to user interactions, and communicate with servers. It is widely supported by web browsers and is an essential tool for web development."
        console.log(botMessage)
        const saveBotMessage = (new MESSAGE({
            senderType: "bot",
            message: botMessage || "Hey This is dummy message"
        })).save()

        return saveBotMessage;
    }
    catch (err) {
        console.log(err.message)
    }
}
