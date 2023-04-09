import {
  Bars3Icon,
  MagnifyingGlassIcon,
  VideoCameraIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { GrYoutube } from "react-icons/gr";
import { RiVideoAddLine } from "react-icons/ri";

import { IconContext } from "react-icons";
import { useContext, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { NotificationsContext, VideoContext } from "@/hooks/useNotifications";
import { gql, useApolloClient } from "@apollo/client";

export default function Navbar() {
  const [searchText, setSearchText] = useState("");
  const { showNotifications, setShowNotifications } =
    useContext(NotificationsContext);
  const { setVideos } = useContext(VideoContext);

  const client = useApolloClient();

  const QUERY = gql`
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

  const getSearchedVideos = async () => {
    // Query the videos from the graph
    client
      .query({
        query: QUERY,
        variables: {
          first: 200,
          skip: 0,
          orderBy: "date",
          orderDirection: "desc",
          // NEW: Added where in order to search for videos
          where: {
            ...(searchText && {
              title_contains_nocase: searchText,
            }),
          },
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        // Set the videos to the state
        setVideos(data.videos);
      })
      .catch((err) => {
        alert("Something went wrong. please try again.!", err.message);
      });
  };
  return (
    <>
      <div className="flex flex-row  justify-between w-full  items-center ">
        <div className="flex flex-row items-center justify-center">
          <IconContext.Provider value={{ className: "w-8 h-8 items-center" }}>
            <div>
              <GrYoutube />
            </div>
          </IconContext.Provider>
          <div className="font-bold text-3xl px-2">PeerTube</div>
        </div>
        <div className="flex  w-[40%]  justify-center items-center bg-[#808080] rounded-xl">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-[88%] bg-[#323232] rounded-xl rounded-r-none h-9 px-4"
            placeholder="Search"
          />
          <button
            className="rounded-xl w-[12%] flex items-center justify-center"
            onClick={getSearchedVideos}
          >
            <MagnifyingGlassIcon width={25} height={25} />
          </button>
        </div>

        <div className="flex flex-row justify-evenly w-[20%] items-center">
          <Link href="/upload" passHref>
            <button
              className="hover:rounded-full hover:bg-[#808080] hover:bg-opacity-30 p-2"
              onClick={() => console.log("Add Video Button Clicked")}
            >
              <IconContext.Provider value={{ className: "w-7 h-7" }}>
                <RiVideoAddLine />
              </IconContext.Provider>
            </button>
          </Link>

          <button
            className="hover:rounded-full hover:bg-[#808080] hover:bg-opacity-30 p-2"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <BellIcon width={30} height={30} />
          </button>

          <ConnectButton showBalance={false} />
        </div>
      </div>
    </>
  );
}
