import Navbar from "@/components/Navbar";
import React from "react";
import { useContext, useState, useEffect } from "react";
import { NotificationsContext } from "@/hooks/useNotifications";
import NotificationList from "@/components/NotificationsList";
import { useApolloClient, gql } from "@apollo/client";
import VideoContainer from "@/components/VideoContainer";
import VideoCard from "@/components/VideoCard";

export default function Video() {
  const { showNotifications } = useContext(NotificationsContext);
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const client = useApolloClient();
  const getUrlVars = () => {
    var vars = {};
    var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  };

  const GET_RELATED_VIDEOS = gql`
    query videos(
      $first: Int
      $skip: Int
      $orderBy: Video_orderBy
      $orderDirection: OrderDirection
      $where: Video_filter
    ) {
      videos(
        first: $first
        skip: $skip
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: $where
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

  const getRelatedVideos = () => {
    client
      .query({
        query: GET_RELATED_VIDEOS,
        variables: {
          first: 20,
          skip: 0,
          orderBy: "date",
          orderDirection: "desc",
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        setRelatedVideos(data.videos);
        const currentVideo = data?.videos?.find(
          (video) => video.id === getUrlVars().id
        );
        setVideo(currentVideo);
      })
      .catch((err) => {
        alert("Something went wrong. please try again.!", err.message);
      });
  };

  useEffect(() => {
    getRelatedVideos();
  }, []);
  return (
    <>
      <div className=" bg-[#0F0F0F] min-w-full min-h-screen max-h-full">
        <div className="px-4 py-2 shadow-lg">
          <Navbar />
        </div>
        {showNotifications && (
          <div className="absolute lg:pl-[70%] lg:pt-[1%] md:pl-[60%] md:pt-[7%] md:pr-[3%]  z-10">
            <NotificationList />
          </div>
        )}
        <div className="w-full  flex flex-row">
          <div className="flex-1 flex flex-col">
            {video && (
              <div className="flex flex-col m-10 justify-between lg:flex-row">
                <div className="lg:w-3/4 w-6/6">
                  <VideoContainer video={video} />
                </div>
                <div className="w-1/4 ml-5 ">
                  <h4 className="text-md  font-bold text-white ml-5 mb-3">
                    Related Videos
                  </h4>
                  {relatedVideos.map((video) => (
                    <div
                      onClick={() => {
                        setVideo(video);
                      }}
                      key={video.id}
                    >
                      <VideoCard
                        id={video.id}
                        title={video.title}
                        creator={video.author}
                        createdAt={video.date}
                        thumbnailHash={video.thumbnailHash}
                        horizontal={true}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
