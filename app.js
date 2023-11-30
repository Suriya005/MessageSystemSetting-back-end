const express = require("express");
const app = express();
const Routes = require("./routes/routes");
const cors = require("cors");
const Provider = require("./models/providerModel");

app.use(cors({ origin: "*" }));

app.use(express.json());
// content-type: application/json
app.use(express.urlencoded({ extended: false }));


app.use("/api", Routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
