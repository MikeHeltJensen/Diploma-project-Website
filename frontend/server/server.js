const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the server!');
}); 

app.get('/data', (req, res) => {
    res.json({ message: 'This is some data from the server!' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
