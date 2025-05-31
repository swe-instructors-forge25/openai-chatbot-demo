const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// use middleware
app.use(express.json());
app.use(cors());

// definte routers
const chatbotRouter = require("./routes/chatbot");

// use routes
app.use("/chat", chatbotRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
