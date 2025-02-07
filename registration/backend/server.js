require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDb = require("./utils/db");
const contactRoute = require("./routes/contact-route");
const authRoutes = require("./routes/auth-routes");
const errormiddleware = require("./middleware/error-middleware");
const serverRoute = require("./routes/service-route");

const app = express();

ConnectDb();

// middleware
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credential: true,
};

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/form", contactRoute);

app.use("/api/services", serverRoute)

app.use(errormiddleware);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
