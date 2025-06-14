import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm DashBot 🤖. How can I help you today?", fromBot: true },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = { id: Date.now(), text: input, fromBot: false };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: "Thanks for your message! I'll get back to you shortly.", fromBot: true },
      ]);
    }, 500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-widget fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg shadow-lg w-80 flex flex-col overflow-hidden">

          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <span className="font-bold">DashBot</span>
            <button onClick={() => setIsOpen(false)} aria-label="Close Chat">
              <FaTimes />
            </button>
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-80 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg max-w-[70%] ${
                  msg.fromBot
                    ? "bg-purple-500 text-white self-start"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center p-3 border-t dark:border-gray-700">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 text-sm bg-gray-100 dark:bg-gray-800 rounded focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="ml-2 text-purple-500 hover:text-purple-700">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full shadow-lg text-white hover:scale-110 transform transition"
          onClick={() => setIsOpen(true)}
          aria-label="Open Chat"
        >
          <FaRobot className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
