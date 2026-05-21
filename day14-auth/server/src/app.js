let express = require("express");
let cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error.middleware");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

let app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use(errorMiddleware);

module.exports = app;
