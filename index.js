import express from "express";
import router from "./routes/userRoute.js";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
