import express from "express";
import router from "./routes/projectRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import bodyParser from "body-parser";
import ejs from "ejs";
import connectDB from "./config/database.js";

// Import models to register schemas
import "./models/index.js";

const app = express();
const port = process.env.PORT || 3000;

// Initialize server
async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.engine("html", ejs.renderFile);
    app.set("view engine", "html");
    app.set("views", "./views");
    app.use(express.static("public"));
    app.use('/uploads', express.static('uploads'));

    // Routes
    app.use("/", router);
    app.use("/admin", adminRoutes);

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Server Error: Something went wrong!');
    });

    // 404 handler
    app.use((req, res) => {
      res.status(404).send('Page Not Found: The page you are looking for does not exist.');
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
      console.log(`Admin panel: http://localhost:${port}/admin`);
    });
  } catch (error) {s
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
