import React from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import Divider from "@mui/material/Divider";

export default function Comment({ author, comment }) {
  return (
    <div className="flex flex-row mt-2 ">
      <div>
        <Jazzicon diameter={40} seed={jsNumberForAddress(`${author}`)} />
      </div>
      <div className="flex flex-col ml-2 w-full">
        <div className="font-extralight text-base">
          {author.slice(0, 10) + "......" + author.slice(35, 42)}
        </div>
        <div className="font-semibold text-xl">{comment}</div>
        <div className="py-2">
          <Divider sx={{ backgroundColor: "#808080" }} />
        </div>
      </div>
    </div>
  );
}
