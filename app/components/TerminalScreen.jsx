"use client";

import { useState, useEffect } from "react";
import Terminal from "./Terminal";
import { Power, Expand } from "lucide-react";

export default function TerminalScreen() {
  const [time, setTime] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const togglePower = () => {
    if (isOn) {
      setIsOn(false);
    } else {
      setTimeout(() => {
        setIsOn(true);
      }, 1500);
    }
  };

  if (!isOn) {
    return (
      <div
        onClick={togglePower}
        className="flex items-center justify-center h-screen w-screen bg-black text-gray-400 text-xl cursor-pointer"
      >
        POWER OFF — Click to turn ON
      </div>
    );
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-gray-300 overflow-hidden fixed top-0 left-0 flex flex-col">
      <div className="w-full flex justify-between items-center px-4 py-3 border-b border-gray-700 text-sm flex-shrink-0">
        <Power
          size={18}
          className="text-gray-500 cursor-pointer hover:text-gray-300"
          onClick={togglePower}
        />
        <span className="text-gray-200 font-medium">https://ivirti.me</span>
        <div className="flex items-center gap-4">
          <span className="text-gray-300">{time}</span>
          <Expand
            size={18}
            className="text-gray-500 cursor-pointer hover:text-gray-300"
            onClick={toggleFullscreen}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <pre className="text-2xl text-white leading-tight text-left">
          {String.raw`
██╗   ██╗██╗██████╗ ████████╗██╗
██║   ██║██║██╔══██╗╚══██╔══╝██║
██║   ██║██║██████╔╝   ██║   ██║
╚██╗ ██╔╝██║██╔══██╗   ██║   ██║
 ╚████╔╝ ██║██║  ██║   ██║   ██║
  ╚═══╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝
`}
        </pre>

        <p className="mt-4 text-lg text-gray-200">
          Welcome to Virti&apos;s Terminal Portfolio
        </p>

        <p className="mt-2 text-gray-400">
          Type <span className="text-white font-bold">'?'</span> or{" "}
          <span className="text-white font-bold">'help'</span> to view commands.
        </p>

        <div className="w-full mt-4">
          <Terminal />
        </div>
      </div>

      <div className="w-full text-center py-3 border-t border-gray-700 text-xs text-gray-400 flex-shrink-0">
        &copy; {new Date().getFullYear()} Virti Jain | All Rights Reserved
      </div>
    </div>
  );
}
