import Image from "next/image";
import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

export default function VideoCard({
  id,
  title,
  creator,
  createdAt,
  thumbnailHash,
  horizontal,
}) {
  return (
    <div
      className=" text-white  w-[320px] mb-3 hover:cursor-pointer hover:bg-[#201f1f] rounded-lg p-1.5
     "
      onClick={() => {
        window.location.href = `/video?id=${id}`;
      }}
    >
      <div className="w-full bg-black  rounded-lg   flex items-center justify-center">
        <Image
          src={`https://ipfs.io/ipfs/${thumbnailHash}/`}
          width={340}
          height={250}
          className={
            horizontal
              ? "object-cover rounded-lg w-60  "
              : "object-cover rounded-lg w-full h-48"
          }
        />
      </div>

      <div className="flex  flex-row mt-2">
        <div className="mr-3">
          <Jazzicon diameter={30} seed={jsNumberForAddress(`${creator}`)} />
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-lg">{title}</p>
          <div className=" text-gray-500">
            <div>{creator.slice(0, 6) + "...." + creator.slice(37, 42)}</div>
            <div>{createdAt}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
