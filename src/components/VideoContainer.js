import React from "react";
import LivepeerPlayer from "./LivepeerPlayer";
import { Avatar, Divider } from "@mui/material";
import Image from "next/image";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function VideoContainer({ video }) {
  return (
    <div>
      <LivepeerPlayer videoHash={video.hash} videoTitle={video.title} />
      <div className="flex justify-between flex-row py-4">
        <div className="w-full">
          <h3 className="text-2xl font-bold text-white">{video.title}</h3>

          <div className="flex flex-row w-full mt-2 justify-between items-center">
            <div className="flex flex-row items-center">
              <Jazzicon
                diameter={35}
                seed={jsNumberForAddress(`${video.author}`)}
              />
              <div className=" ml-2 font-light text-lg">
                {video.author.slice(0, 12) +
                  "...." +
                  video.author.slice(34, 42)}
              </div>
              <div className="bg-white ml-5 py-2 px-3 text-black font-semibold rounded-3xl hover:opacity-80">
                <button>Subscribe</button>
              </div>
            </div>
            <div className="bg-[#3c3c3c] flex flex-row py-2 px-5 justify-between rounded-3xl">
              <div className="mr-2 pr-2 border-r-2 hover:opacity-70">
                <button className="flex flex-row  items-center">
                  <IconContext.Provider value={{ className: "w-6 h-6" }}>
                    <FiThumbsUp className="text-white" />
                  </IconContext.Provider>
                  <p className="px-2">121</p>
                </button>
              </div>

              <div className="hover:opacity-70">
                <button className="flex flex-row items-center">
                  <IconContext.Provider value={{ className: "w-6 h-6" }}>
                    <FiThumbsDown className="text-white" />
                  </IconContext.Provider>
                  <p className="px-2">20</p>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full h-[50%] bg-[#3c3c3c] hover:opacity-80 rounded-lg mt-4 text-white">
            <p className="px-4 pt-2 font-semibold">
              {video.category} •{" "}
              {new Date(video.date * 1000).toLocaleString("en-IN")}
            </p>
            <div className="px-4">{video.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
