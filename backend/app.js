const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const fs = require('fs');
const path = require('path');

dotenv.config();
app.use(express.json());
const patientRoutes = require("./routes/patient.routes");
const insurerRoutes = require("./routes/insurer.routes");
const connectDB = require("./config/mongo.config");
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
  }
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();

app.use("/patients", patientRoutes);
app.use("/insurers", insurerRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server is running");
});
