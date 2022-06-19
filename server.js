const express = require("express");
const cors = require("cors");
const routes = require("./src/routes/routes");
const path = require("path");

const app = express();

app.use("/uploads",express.static('uploads'));
app.use(cors());
app.use(express.json());
app.use(routes);



app.listen(443,()=>console.log("SERVIDOR: ATIVO 🔥 !"));