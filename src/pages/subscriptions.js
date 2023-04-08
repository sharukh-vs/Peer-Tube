import Sidebar from "@/components/Sidebar";
import { NotificationsContext } from "@/hooks/useNotifications";
import React, { useContext, useEffect } from "react";
import NotificationList from "@/components/NotificationsList";
import * as PushAPI from "@pushprotocol/restapi";
import { useAccount } from "wagmi";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useState } from "react";

export default function Subscriptions() {
  const { showNotifications } = useContext(NotificationsContext);
  const [subscribers, setSubscribers] = useState([]);
  const { address } = useAccount();

  const getSubscribers = async () => {
    const subscribers = await PushAPI.channels.getSubscribers({
      channel: "eip155:80001:0x068025e6c34BaED33D3744fCd4D98c26e15dE43D", // channel address in CAIP
      page: 1, // Optional, defaults to 1
      limit: 10, // Optional, defaults to 10
      env: "staging", // Optional, defaults to 'prod'
    });

    console.log("Subscribers ", subscribers);
    setSubscribers(subscribers?.subscribers);
  };

  useEffect(() => {
    getSubscribers();
  }, []);
  return (
    <div className="bg-[#0F0F0F] w-full min-h-screen max-h-full">
      <Sidebar />
      {showNotifications && (
        <div className="absolute z-10 lg:pl-[70%] lg:pt-[5%] md:pl-[60%] md:pt-[7%] md:pr-[3%] ">
          <NotificationList />
        </div>
      )}
      {address && (
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 w-full h-full justify-center z-10 md:pl-[10%] md:pt-[10%] lg:pt-[7%] lg:pl-[7%]  pt-[15%] pl-[15%]">
          {subscribers?.map((subscriber, idx) => (
            <div
              className=" flex flex-row items-center p-2 bg-[#353535] m-2 rounded-lg"
              key={idx}
            >
              <div className="mr-2">
                <Jazzicon
                  diameter={30}
                  seed={jsNumberForAddress(`${subscribers[idx]}`)}
                />
              </div>
              <div className="text-white">{subscriber}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
