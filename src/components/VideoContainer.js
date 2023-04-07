import React from "react";
import LivepeerPlayer from "./LivepeerPlayer";

export default function VideoContainer({ video }) {
  return (
    <div>
      <LivepeerPlayer videoHash={video.hash} videoTitle={video.title} />
      <div className="flex justify-between flex-row py-4">
        <div>
          <h3 className="text-2xl text-white">{video.title}</h3>
          <p className="text-gray-500 mt-1">
            {video.category} •{" "}
            {new Date(video.date * 1000).toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
}
