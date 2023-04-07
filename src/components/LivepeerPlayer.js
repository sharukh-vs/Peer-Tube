import React from "react";
import { Player } from "@livepeer/react";

export default function LivepeerPlayer({ videoHash, videoTitle }) {
  return (
    <Player
      title={videoTitle}
      playbackId={videoHash}
      showPipButton
      showLoadingSpinner
      objectFit="cover"
      priority
      autoPlay
    />
  );
}
