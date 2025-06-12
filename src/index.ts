import express from "express";

const app = express();

app.listen(4000, () => {
  console.log("✅ Server running at port: ", 4000);
});
