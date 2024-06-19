const express = require("express");
const cors = require("cors");
const fs = require("fs");

const server = express();
const router = express.Router();

server.use(cors());
server.use(express.json());

// ------------------------ functions ---------------------------------

const readFile = () => {
  const content = fs.readFileSync("./db/data.json", "utf-8");
  return JSON.parse(content);
};

const writeFile = (content) => {
  const updateFile = JSON.stringify(content, null, 2);
  fs.writeFileSync("./db/data.json", updateFile, "utf-8");
};

// ----------------------- routes ----------------------------------

router.get("/", (req, res) => {
  try {
    const content = readFile();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: "Erro interno de servidor" });
  }
});

router.post("/", (req, res) => {
  try {
    const { email, phone, company, instagram, userName, userNickname } =
      req.body;
    const currentContent = readFile();

    const id = Math.random().toString(32).substring(2, 9);

    const newEntry = {
      id,
      email,
      phone,
      company,
      instagram,
      userName,
      userNickname,
    };

    currentContent.push(newEntry);
    writeFile(currentContent);

    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: "Erro interno de servidor" });
  }
});

// ----------------------- server ----------------------------------

server.use(router);

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
