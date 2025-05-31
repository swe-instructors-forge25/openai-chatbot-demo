import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// definte routers
import chatbotRouter from "./routes/chatbot.js";

const app = express();
const port = 3000;

// use middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// use routes
app.use("/chat", chatbotRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
