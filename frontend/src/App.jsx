import { useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function handleMessageSend() {
    const cleanedInput = inputValue.trim();
    if (cleanedInput == "") {
      // do not make an API call if there is no message
      return;
    }

    const newMessageObject = { role: "user", content: cleanedInput };

    const updatedMessages = [...messages, newMessageObject];

    setMessages(updatedMessages);
    setInputValue("");
    sendChatMessage(updatedMessages);
  }

  const sendChatMessage = async (messageArray) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/chat/send-message",
        {
          model: "gpt-3.5-turbo",
          messages: messageArray,
        }
      );

      const newResponseObject = {
        role: response.data.role,
        content: response.data.content,
      };

      setMessages((prevMessages) => [...prevMessages, newResponseObject]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <div>
        <div
          style={{
            marginBottom: "20px",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              style={{ padding: "8px", borderBottom: "1px solid #eee" }}
            >
              {message.content}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Send a message!"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ flex: 1, padding: "8px" }}
          />
          <div
            onClick={handleMessageSend}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            <p style={{ margin: 0 }}>Send Message</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
