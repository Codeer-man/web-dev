require("dotenv").config();

const express = require("express");
const cors = require("cors");

const ConnectDB = require("./utilis/db");
const authRoutes = require("./routes/auth-routes");
const homeRoutes = require("./routes/home-routes");
const adminRoutes = require("./routes/admin-routes");

const app = express();
ConnectDB();

const corsoptions = {
  origins: "http://localhost:5173",
  method: "Get,POST,PATCH,DELETE,HEAD",
  Credential: true,
};

app.use(cors(corsoptions));

// middleware
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/auth", homeRoutes);
app.use("/api/admin", adminRoutes);

// connecting to port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
