const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use("/build", express.static(path.join(__dirname, "../build")));
  app.get("/", (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, "../index.html"));
  });
}

app.listen(3000, () => {
  console.log("Server listening on port: 3000");
});
