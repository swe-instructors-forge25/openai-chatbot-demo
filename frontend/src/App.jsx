import { useState } from "react";
import axios from "axios";
import ArrowIcon from "./assets/arrow.png"
import "./styles/styles.css"

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  function handleMessageSend(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const cleanedInput = inputValue.trim();
    if (cleanedInput == "") {
      // do not make an API call if there is no message
      return;
    }

    const newMessageObject = { role: "user", content: cleanedInput };

    const updatedMessages = [...messages, newMessageObject];

    setMessages(updatedMessages);
    setInputValue("");
    setLoading(true);
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
      setLoading(false);

      setMessages((prevMessages) => [...prevMessages, newResponseObject]);
    } catch (error) {
      setLoading(false);
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <div className="app-container">
        <div className="chat-container">
          <div
            className="messages-container"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role}`}
              >
                {message.content}
              </div>
            ))}
            {loading && (
            <div className="message-loading">
              <div className="loading-bubble">...</div>
            </div>
            )}
          </div>

          <form className="form-section" onSubmit={handleMessageSend}>
            <input
              type="text"
              placeholder="Send a message!"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="input-field"
            />
            <div className="button-container">
              <button className="arrow-button" type="submit">
                <img src={ArrowIcon} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
