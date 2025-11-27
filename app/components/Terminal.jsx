"use client";

import { useState, useEffect, useRef } from "react";
import { commands } from "../data/commands";

export default function Terminal() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const runCommand = (cmd) => {
    const clean = cmd.toLowerCase();
    let output = "";

    if (clean === "clear") {
      setHistory([]);
      return;
    }

    if (clean === "?" || clean === "help") {
      output = commands["help"];
    } else {
      output = commands[clean] || "Command not found. Type 'help'.";
    }

    setHistory((prev) => [...prev, { cmd, output }]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    runCommand(input);
    setInput("");
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div
      ref={scrollRef}
      className="w-full text-left max-h-[400px] overflow-y-auto"
    >
      {history.map((item, i) => (
        <div key={i} className="mb-2">
          <p className="text-gray-200">visitor@ivirti.me:~$ {item.cmd}</p>
          <pre className="whitespace-pre-line mt-1">{item.output}</pre>
        </div>
      ))}

      <form onSubmit={submitHandler} className="flex items-center gap-2 mt-3">
        <span className="text-gray-200">visitor@ivirti.me:~$</span>
        <input
          autoFocus
          className="flex-1 bg-transparent outline-none text-gray-100"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
