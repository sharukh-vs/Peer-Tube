import Image from "next/image";
import React from "react";
import Avatar from "@mui/material/Avatar";

export default function VideoCard({ title, creator, createdAt }) {
  return (
    <div
      className=" text-white w-[320px] mb-3 hover:cursor-pointer"
      onClick={() => console.log("Card Clicked")}
    >
      <Image
        src={"https://content.wepik.com/statics/8315911/preview-page0.jpg"}
        height={250}
        width={320}
        className="rounded-lg"
      />
      <div className="flex flex-row mt-2">
        <div className="mr-3">
          <Avatar sx={{ backgroundColor: "yellow", color: "black" }}>C</Avatar>
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-lg">{title}</p>
          <div className=" text-gray-500">
            0xb01F14.....78c970
            <div>{createdAt}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
