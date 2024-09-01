const OpenAI = require("openai");
require('dotenv').config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.chatbot = async (data) => {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: data.message }],
            model: "gpt-3.5-turbo",
        });
        console.log(chatCompletion.choices[0].message)
        return chatCompletion.choices[0].message.content
    }
    catch (err) {
        console.log(err.messages)
    }
}
