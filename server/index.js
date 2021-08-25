const express = require('express');
const cors = require('cors');

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

//determines what port.
const port = process.env.PORT || 5000;

//Prints on console text
app.listen(port, () => console.log(`Server started on port ${port}` ));