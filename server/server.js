const express = require('express');
const cors = require('cors');

const app = express();
const port = 3014;

app.use(cors());
app.use(express.json());


const mockUser = {
  email: 'test@example.com',
  password: 'password',
};

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === mockUser.email && password === mockUser.password) {
    res.status(200).send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Login failed' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});