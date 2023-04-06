import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import VideoCard from "@/components/VideoCard";
import { useContext } from "react";
import { NotificationsContext } from "@/hooks/useNotifications";
import NotificationList from "@/components/NotificationsList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { showNotifications } = useContext(NotificationsContext);
  return (
    <>
      <div className="bg-[#0F0F0F] min-w-full min-h-screen max-h-full">
        <Sidebar />
        {showNotifications && (
          <div className="absolute lg:pl-[70%] lg:pt-[5%] md:pl-[60%] md:pt-[7%] md:pr-[3%]  z-10">
            <NotificationList />
          </div>
        )}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full h-full justify-center z-10 md:pl-[10%] md:pt-[10%] lg:pt-[7%] lg:pl-[7%]  pt-[15%] pl-[15%]">
          <VideoCard title={"My First Video"} createdAt={"1 Days Ago"} />
          <VideoCard title={"My First Video"} createdAt={"1 Days Ago"} />
          <VideoCard title={"My First Video"} createdAt={"1 Days Ago"} />
        </div>
      </div>
    </>
  );
}
