const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

const port = 3000;

const users = [
  {
    name: "user",
    email: "user@example.com",
    hashedPassword: "hashed-password",
  },
];

app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello World!");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  if (user.hashedPassword === password) {
    res.status(200).json({ name: user.name, email: user.email });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const hashedPassword = password;

  users.push({ name, email, hashedPassword });

  res.status(201).json({ name: name, email: email });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
