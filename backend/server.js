const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors");


app.use(cors());
app.use(express.json());

const noteRoutes=require('./Routes/noteRoutes');
app.use('/api/notes',noteRoutes);



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
