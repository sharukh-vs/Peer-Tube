import React, { useEffect, useState } from "react";
import LivepeerPlayer from "./LivepeerPlayer";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { styled } from "@mui/material/styles";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { IconContext } from "react-icons";
import TextField from "@mui/material/TextField";
import Comment from "./Comment";
import { useSigner, useAccount, useContract } from "wagmi";
import * as PushAPI from "@pushprotocol/restapi";

import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
} from "wagmi";
import PeerTube from "../../artifacts/contracts/PeerTube.sol/PeerTube.json";
import { Box, CircularProgress } from "@mui/material";
import { useApolloClient, gql } from "@apollo/client";
// import subscribeToChannel from "@/utils/subscribeToChannel";

const StyledTextField = styled(TextField)({
  "& label": {
    color: "white",
  },
  "&:hover label": {
    fontWeight: 500,
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline": {
    borderBottomColor: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
      borderWidth: 2,
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export default function VideoContainer({ video }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState();
  const [dislikes, setDislikes] = useState();
  const [subscribed, setSubscribed] = useState(false);
  const [notified, setNotified] = useState(false);

  const { data: signer } = useSigner({
    onSuccess(signer) {
      console.log("Success the Signer is :", signer);
    },
  });

  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: PeerTube.abi,
    signerOrProvider: signer,
  });
  const { address } = useAccount();

  const client = useApolloClient();
  const { config: commentConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: PeerTube.abi,
    functionName: "addComment",
    args: [video.id, comment],
  });

  //   const { config: likeConfig } = usePrepareContractWrite({
  //     address: CONTRACT_ADDRESS,
  //     abi: PeerTube.abi,
  //     functionName: "addLike",
  //     args: [video.id],
  //     onSuccess() {
  //       console.log("Like Config, ", likeConfig);
  //     },
  //     onError(e) {
  //       console.log("Like Config Error, ", e.message);
  //     },
  //   });
  const { config: dislikeConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: PeerTube.abi,
    functionName: "addDislike",
    args: [video.id],
  });

  const {
    data: commentData,
    write: uploadComment,
    isLoading: isUploading,
    isSuccess: commentAddSuccess,
    error: commentError,
  } = useContractWrite(commentConfig);

  //   const {
  //     data: likeData,
  //     write: likeVideo,
  //     isLoading: isLiking,
  //     isSuccess: likeVideoSuccess,
  //     error: likeError,
  //   } = useContractWrite({
  //     mode: "recklesslyUnprepared",
  //     address: CONTRACT_ADDRESS,
  //     abi: PeerTube.abi,
  //     functionName: "addLike",
  //     args: [video.id],

  //   });
  //   const {
  //     data: dislikeData,
  //     write: dislikeVideo,
  //     isLoading: isDisliking,
  //     isSuccess: dislikeVideoSuccess,
  //     error: dislikeError,
  //   } = useContractWrite(dislikeConfig);

  const COMMENTS_QUERY = gql`
    query comments($first: Int, $where: Video_filter, $videoId: String) {
      comments(first: $first, where: { videoId: $videoId }) {
        id
        author
        videoId
        comment_message
      }
    }
  `;

  const getComments = () => {
    client
      .query({
        query: COMMENTS_QUERY,
        variables: {
          first: 20,
          videoId: video.id,
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        setComments(data.comments);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  const subscribeToChannel = async (signer, address) => {
    console.log(`Address: ${address}`);
    console.log("Signer: ", signer);

    await PushAPI.channels.subscribe({
      signer: signer,
      channelAddress: "eip155:80001:0x068025e6c34BaED33D3744fCd4D98c26e15dE43D",
      userAddress: `eip155:80001:${address}`,
      onSuccess: () => {
        console.log("opt in success");
        setSubscribed(true);
      },
      onError: () => {
        console.log("opt in error");
      },
      env: "staging",
    });
  };

  const sendNotifs = async (signer, creatorAddress, videoTitle) => {
    try {
      await PushAPI.payloads.sendNotification({
        signer: signer,
        type: 1, // target
        identityType: 2, // direct payload
        notification: {
          title: `[SDK-TEST] notification TITLE:`,
          body: `[sdk-test] notification BODY`,
        },
        payload: {
          title: `${creatorAddress.slice(0, 12)}....${creatorAddress.slice(
            35,
            42
          )} uploaded: `,
          body: `${videoTitle}`,
          cta: "",
          img: "",
        }, // recipient address
        channel: "eip155:80001:0x068025e6c34BaED33D3744fCd4D98c26e15dE43D", // your channel address
        env: "staging",
      });
    } catch (e) {
      console.log(e.message);
    }
    // console.log("Api Response: ", apiResponse);
  };

  //   const { data: commentsData } = useContractRead({
  //     address: CONTRACT_ADDRESS,
  //     abi: PeerTube.abi,
  //     functionName: "getComments",
  //     args: [video.id],
  //   });

  const { data: likeCount } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: PeerTube.abi,
    functionName: "getLikes",
    args: [video.id],
    watch: true,
    onSuccess() {
      console.log("Like count from read contract: ", likeCount.toString());
    },
  });

  const { data: dislikeCount } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: PeerTube.abi,
    functionName: "getDislikes",
    args: [video.id],
    watch: true,
    onSuccess() {
      console.log(
        "Dislike count from read contract: ",
        dislikeCount.toString()
      );
    },
  });

  const handleCommentUpload = () => {
    setComment("");
    uploadComment();
    console.log(`Comment Data: ${commentData}`);
  };

  useEffect(() => {
    console.log(`Video id from useEffect: ${video.id}`);

    getComments();
    console.log(`Like Count: ${likeCount}`);
    // console.log("Like Data", likeData);
    setLikes(likeCount?.toString());
    setDislikes(dislikeCount?.toString());

    // console.log("Dislike Data", dislikeData);
  }, []);

  return (
    <div>
      <LivepeerPlayer videoHash={video.hash} videoTitle={video.title} />
      <div className="flex justify-between flex-row py-4">
        <div className="w-full">
          <h3 className="text-2xl font-bold text-white">{video.title}</h3>

          <div className="flex flex-row w-full mt-2 justify-between items-center">
            <div className="flex flex-row items-center">
              <Jazzicon
                diameter={35}
                seed={jsNumberForAddress(`${video.author}`)}
              />
              <div className=" ml-2 font-light text-lg">
                {video.author.slice(0, 12) +
                  "...." +
                  video.author.slice(34, 42)}
              </div>
              {`${address.toLowerCase()}` === video.author ? (
                <div className="bg-white ml-5 py-2 px-3 text-black font-semibold rounded-3xl hover:opacity-80 disabled:bg-gray-500">
                  <button
                    disabled={notified}
                    onClick={async () => {
                      await sendNotifs(signer, address, video.title);
                    }}
                  >
                    Notify Subscribers
                  </button>
                </div>
              ) : (
                <div className="bg-white ml-5 py-2 px-3 text-black font-semibold rounded-3xl hover:opacity-80 disabled:bg-gray-500">
                  <button
                    disabled={subscribed}
                    onClick={async () => {
                      await subscribeToChannel(signer, address);
                    }}
                  >
                    {subscribed ? <p>Subscribed</p> : <p>Subscribe</p>}
                  </button>
                </div>
              )}
            </div>
            <div className="bg-[#3c3c3c] flex flex-row py-2 px-5 justify-between rounded-3xl">
              <div className="mr-2 pr-2 border-r-2 hover:opacity-70">
                <button
                  className="flex flex-row  items-center"
                  onClick={async () => {
                    console.log(`Video id: ${video.id}`);
                    // likeVideo();
                    await contract.addLike(parseInt(video.id));
                  }}
                >
                  <IconContext.Provider value={{ className: "w-6 h-6" }}>
                    <FiThumbsUp className="text-white" />
                  </IconContext.Provider>
                  <p className="px-2">{likes}</p>
                </button>
              </div>

              <div className="hover:opacity-70">
                <button
                  className="flex flex-row items-center"
                  onClick={() => {
                    console.log(`Video id: ${video.id}`);
                    dislikeVideo();
                  }}
                >
                  <IconContext.Provider value={{ className: "w-6 h-6" }}>
                    <FiThumbsDown className="text-white" />
                  </IconContext.Provider>
                  <p className="px-2">{dislikes}</p>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full h-[50%] bg-[#3c3c3c] hover:opacity-80 rounded-lg mt-4 text-white">
            <p className="px-4 pt-2 font-semibold">
              {video.category} •{" "}
              {new Date(video.date * 1000).toLocaleString("en-IN")}
            </p>
            <div className="px-4">{video.description}</div>
          </div>
        </div>
      </div>
      <div className="py-10">
        <Divider sx={{ backgroundColor: "#808080" }} />
      </div>
      <div className=" text-gray-600">
        <StyledTextField
          id="standard-multiline-flexible"
          label="Add a Comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          multiline
          maxRows={4}
          sx={{ width: "100%" }}
          InputProps={{
            style: {
              color: "white",
            },
          }}
          variant="standard"
        />
      </div>
      <div className="flex justify-end mt-2">
        <button
          className="py-2 px-4 rounded-lg bg-slate-600 text-white disabled:opacity-50"
          disabled={comment ? false : true}
          onClick={() => {
            console.log(comment);
            handleCommentUpload();
          }}
        >
          {isUploading ? (
            <Box>
              <CircularProgress sx={{ color: "white" }} />
            </Box>
          ) : (
            <p>Comment</p>
          )}
        </button>
      </div>
      <div>
        {/* {commentAddSuccess && (
          <Comment author={video.author} comment={comment} />
        )} */}
        {comments?.map((comment) => (
          <Comment
            author={`${comment.author}`}
            comment={`${comment.comment_message}`}
          />
        ))}
      </div>
    </div>
  );
}
