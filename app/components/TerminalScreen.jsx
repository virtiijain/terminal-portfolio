"use client";

import { useState, useEffect } from "react";
import Terminal from "./Terminal";
import { Expand } from "lucide-react";

export default function TerminalScreen() {
  const [time, setTime] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    <div className="h-screen w-screen overflow-hidden fixed top-0 left-0 flex flex-col">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center px-4 py-3 border-b text-sm sm:text-base flex-shrink-0 gap-2">
        <a
          href="https://virti-terminal-portfolio.vercel.app/"
          className="text-[#3D3D3D] hidden sm:block text-center truncate w-full sm:w-auto"
        >
          https://ivirti.me
        </a>
        <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto mt-2 sm:mt-0 gap-4">
          <span className="text-xs sm:text-sm">{time}</span>
          <Expand
            size={18}
            className="cursor-pointer hidden sm:block"
            onClick={toggleFullscreen}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col">
        <pre className="text-base lg:text-2xl leading-tight text-left break-words w-full overflow-x-hidden">
          {String.raw`
██╗   ██╗██╗██████╗ ████████╗██╗
██║   ██║██║██╔══██╗╚══██╔══╝██║
██║   ██║██║██████╔╝   ██║   ██║
╚██╗ ██╔╝██║██╔══██╗   ██║   ██║
 ╚████╔╝ ██║██║  ██║   ██║   ██║
  ╚═══╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝
`}
        </pre>

        <p className="mt-4 text-sm lg:text-lg font-semibold text-left ">
          Welcome to My Portfolio go ahead and explore!
        </p>
        <p className="mt-1 text-sm lg:text-base text-left">
          Type <span className="font-extrabold">'?'</span> or{" "}
          <span className="font-extrabold">'help'</span> to view commands.
        </p>

        <div className="w-full mt-2 flex-1 min-h-[200px] overflow-x-hidden">
          <Terminal />
        </div>
      </div>

      <div className="w-full text-center py-3 border-t text-xs sm:text-sm flex-shrink-0">
        &copy; {new Date().getFullYear()} Virti Jain | All Rights Reserved
      </div>
    </div>
  );
}
