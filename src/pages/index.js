import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import VideoCard from "@/components/VideoCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="bg-[#0F0F0F] min-w-full min-h-screen max-h-full">
        <Sidebar />
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full h-full justify-center z-10 md:pl-[10%] md:pt-[10%] lg:pt-[7%] lg:pl-[7%]  pt-[15%] pl-[15%]">
          <VideoCard title={"My First Video"} createdAt={"1 Days Ago"} />
          <VideoCard title={"My First Video"} createdAt={"1 Days Ago"} />
          <VideoCard title={"My First Video"} createdAt={"1 Days Ago"} />
        </div>
      </div>
    </>
  );
}
