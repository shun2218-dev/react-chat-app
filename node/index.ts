import path from "path";
import express from "express";
const app = express();

app.use(express.static(path.join(__dirname, "..", "start")));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "start", "index.html"));

  app.listen(3001, () => {});
});
