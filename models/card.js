const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const cardSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: function(v) {
        return /http[s]?:\/\/(www\.)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|((([a-z-]{2,})*\.([a-z-]{2,}))*))(:\d{2,5})?((\/[-a-zA-Z0-9#\/=]*)?)/.test(v);
      }
    }
  },
  owner: {
    required: true,
    type: { ObjectId },
    ref: 'user',
  },
  likes: {
    type: { ObjectId },
    ref: 'user',
    default: [],
  },
  createdAt: {
   type: Date,
   default: Date.now,
  }
});

module.exports = mongoose.model('card', cardSchema);