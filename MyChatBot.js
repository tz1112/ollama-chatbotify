// MyChatBot.js
import React from "react";
import ChatBot from "react-chatbotify";
import { Ollama } from 'ollama/browser'


const MyChatBot = () => {

  const ollama = new Ollama({ host: 'http://127.0.0.1:11434' })
  async function run(prompt){
    const output = await ollama.generate({
      model: 'orca-mini:latest',
      prompt: prompt,
    })
    console.log(output)
    return output.response;
  }
  
  const flow = {
    start: {
      message: "Hello, I'm HAGRID. Enter your question below.",
      path: "chat_loop",
    },
    chat_loop: {
      message: async (params) => {
        return await run(params.userInput)
      },
      path: "chat_loop"
    }
  }

  return (
    <ChatBot flow={flow}/>
  );
};

export default MyChatBot;