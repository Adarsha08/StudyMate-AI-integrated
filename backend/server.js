const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Routes for notes management
const noteRoutes=require('./Routes/noteRoutes');
app.use('/api/notes',noteRoutes);

// Routes for user authentication  of registration and login
app.use('/api/auth',require('./Routes/userRoutes'));



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
