import express from "express";
import router from "./routes/projectRoute.js";
import bodyParser from "body-parser";
import ejs from "ejs";
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.static("public"));
app.use("/", router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
