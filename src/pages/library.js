import Sidebar from "@/components/Sidebar";
import React from "react";

export default function Library() {
  return (
    <div className="bg-[#0F0F0F] w-full min-h-screen max-h-full">
      <Sidebar />
      <div className=" text-white  pt-[10%] pl-[10%]">Library</div>
    </div>
  );
}
