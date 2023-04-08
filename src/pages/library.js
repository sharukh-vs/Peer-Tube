import Sidebar from "@/components/Sidebar";
import { NotificationsContext } from "@/hooks/useNotifications";
import React, { useContext, useEffect, useState } from "react";
import NotificationList from "@/components/NotificationsList";
import { useAccount } from "wagmi";
import { gql, useApolloClient } from "@apollo/client";
import VideoCard from "@/components/VideoCard";

export default function Library() {
  const { showNotifications } = useContext(NotificationsContext);
  const { address } = useAccount();
  const [videos, setVideos] = useState([]);
  const client = useApolloClient();

  const MY_VIDEOS = gql`
    query videos(
      $first: Int
      $skip: Int
      $orderBy: Video_orderBy
      $orderDirection: OrderDirection
      $where: Video_filter
      $author: String
    ) {
      videos(
        first: $first
        skip: $skip
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: { author: $author }
      ) {
        id
        hash
        title
        description
        category
        thumbnailHash
        date
        author
      }
    }
  `;

  const getMyVideos = () => {
    client
      .query({
        query: MY_VIDEOS,
        variables: {
          first: 200,
          author: `${address}`,
        },
      })
      .then(({ data }) => {
        setVideos(data.videos);
      })
      .catch((err) => {
        alert("Something went wrong. please try again.!", err.message);
      });
  };

  useEffect(() => {
    getMyVideos();
  }, [address]);
  return (
    <div className="bg-[#0F0F0F] w-full min-h-screen max-h-full">
      <Sidebar />
      {showNotifications && (
        <div className="absolute z-10 lg:pl-[70%] lg:pt-[5%] md:pl-[60%] md:pt-[7%] md:pr-[3%] ">
          <NotificationList />
        </div>
      )}

      {address ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full h-full justify-center z-10 md:pl-[10%] md:pt-[10%] lg:pt-[7%] lg:pl-[7%]  pt-[15%] pl-[15%]">
          {videos?.map((video) => (
            <div>
              <VideoCard
                id={video.id}
                title={video.title}
                createdAt={video.date}
                creator={video.author}
                thumbnailHash={video.thumbnailHash}
                link={""}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full text-xl font-semibold text-white h-screen justify-center items-center">
          Please connect your wallet
        </div>
      )}
    </div>
  );
}
