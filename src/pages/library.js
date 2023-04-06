import Sidebar from "@/components/Sidebar";
import { NotificationsContext } from "@/hooks/useNotifications";
import React, { useContext } from "react";
import NotificationList from "@/components/NotificationsList";

export default function Library() {
  const { showNotifications } = useContext(NotificationsContext);
  return (
    <div className="bg-[#0F0F0F] w-full min-h-screen max-h-full">
      <Sidebar />
      {showNotifications && (
        <div className="absolute z-10 lg:pl-[70%] lg:pt-[5%] md:pl-[60%] md:pt-[7%] md:pr-[3%] ">
          <NotificationList />
        </div>
      )}
      <div className=" text-white  pt-[10%] pl-[10%]">Library</div>
    </div>
  );
}
