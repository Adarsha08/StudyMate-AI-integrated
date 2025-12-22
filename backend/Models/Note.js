const mongoose = require('mongoose');
const mongoUrl = 'mongodb://127.0.0.1:27017/studyMateDB';
 
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,       // Use new URL parser (recommended)
    useUnifiedTopology: true     // Use new server discovery and monitoring engine
})
.then(() => console.log("MongoDB connected"))  // Success message
.catch((err) => console.log("MongoDB connection error:", err)); // Error handling

const noteSchema=new mongoose.Schema(
    {
        note:{
            type:String,
            required:true

        }
    },{timestamps:true}
)
const notes=mongoose.model('Notes',noteSchema);

module.exports = notes;
