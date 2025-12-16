const express=require('express');
const app=express();
const port =3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());//so that the backend /express can understand the frontend json data
//api endpoints for notes 
let notes=[];//for adding and storing notes in memory /database substitute

app.post('/api/notes', (req, res) => {
    const { note } = req.body;
    if (!note) return res.status(400).json({ error: "Note content is required" });

    // store as object
    notes.push({ note }); 

    // send full updated array back
    res.json({ message: "Note added successfully", notes });
});
app.get('/api/notes',(req,res)=>
{
    res.json({notes});
});




app.listen(port,()=>{
    console.log("Someone requested the / route");
    console.log(`Server is running at http://localhost:${port}`);
});