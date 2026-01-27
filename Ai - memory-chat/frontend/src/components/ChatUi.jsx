import { useState } from "react";
import { io } from "socket.io-client";

function ChatUi() {
  const [messages, setMessages] = useState([

  ]);
  console.log(messages)
  const [input, setInput] = useState([]);
  console.log(input)

  const inputFun = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = () => {
 


    setMessages(messages => [...messages , { role: "user", text: input }]);
    setInput("");

    const socket = io("localhost:3000");
    socket.emit("listen", input);
    socket.on("listen", (data) => {
      console.log(data);
       setMessages(messages =>[...messages , { role: "ai", text: data }]);
    });

 ;
  };

  return (
    <div className="h-screen overflow-auto bg-gray-900 text-white flex justify-center">
      <div className="w-full max-w-3xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 text-center font-semibold">
          ChatGPT Clone
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              
              <div
              key={i}
                className={`max-w-xs md:max-w-md p-3 rounded-lg text-sm ${
                  msg.role === "user" ? "bg-blue-600" : "bg-gray-800"
                }`}
                
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

      

       

        {/* Input Area */}
        <div className="p-4 border-t border-gray-700 flex gap-2">
          <textarea
            className="flex-1 resize-none rounded-lg bg-gray-800 p-3 text-sm outline-none"
            rows="1"
            placeholder="Type your message..."
            value={input}
            onChange={inputFun}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-blue-950 px-4 rounded outline-none "
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatUi;
