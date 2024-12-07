const express = require('express');
const fs = require('fs/promises'); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send('Username and password are required!');
    }

    const user = { username, password };

    await fs.appendFile('users.txt', JSON.stringify(user) + '\n');

    res.status(200).send('User registered successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user'); 
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
