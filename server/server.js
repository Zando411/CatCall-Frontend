const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cats = require('./cats.json');

const app = express();
const port = 3014;

app.use(cors());
app.use(express.json());

// file upload section
const storage = multer.diskStorage({
  destination: 'catPhotos/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use('/catPhotos', express.static('uploads'));

// json cats storage

const CATS_FILE = './cats.json';

const readCats = () => {
  try {
    const data = fs.readFileSync(CATS_FILE);
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading cats file', err);
    return [];
  }
};

const writeCats = (data) => {
  try {
    fs.writeFileSync(CATS_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing cats file', err);
  }
};

app.post('/cats', upload.single('image'), (req, res) => {
  const { name, age, sex, breed, city, state } = req.body;
  const image = `/uploads/${req.file.filename}`;

  if (!name || !age || !sex || !breed || !city || !state || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const cat = {
    name,
    age,
    sex,
    breed,
    city,
    state,
    imageUrl: image,
  };

  const cats = readCats();
  cats.push(cat);
  writeCats(cats);

  console.log('Cat Data Received:', cat);
  res.status(201).json({ message: 'Cat data saved', cat });
});

app.get('/cats', (req, res) => {
  const cats = readCatsFromFile();
  res.json(cats);
});

// login section
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
