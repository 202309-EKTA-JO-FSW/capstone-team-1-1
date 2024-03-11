const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes");
const { createProxyMiddleware } = require("http-proxy-middleware");

require("dotenv").config();

const { connectToMongo } = require("./db/connection");

const app = express();

const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// main route
app.use("/api", apiRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);

    connectToMongo();
  });
}
module.exports = app;
