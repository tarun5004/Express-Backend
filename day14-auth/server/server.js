require("dotenv").config();
let app = require("./src/app");
let connectDB = require("./src/config/db");

let PORT = process.env.PORT || 4000;

let startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
  }
};

startServer();
