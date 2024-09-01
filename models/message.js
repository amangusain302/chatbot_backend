const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderType : { type :String, enum : ["user", "bot"]},
  message : {type : String}
}, { timestamps: true });

module.exports = mongoose.model('messages', messageSchema);
