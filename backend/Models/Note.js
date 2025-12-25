const mongoose = require('mongoose');

const mongoUrl = 'mongodb://127.0.0.1:27017/studyMateDB';

mongoose.connect(mongoUrl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const noteSchema = new mongoose.Schema(
  {
    note: { type: String, required: true },
    //user field to associate note with a specific user
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Users', // must match User model name
      required: true 
    }
  },
  { timestamps: true }
);

const Note = mongoose.model('Notes', noteSchema);

module.exports = Note;
