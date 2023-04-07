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
import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
} from "wagmi";
import PeerTube from "../../artifacts/contracts/PeerTube.sol/PeerTube.json";
import { Box, CircularProgress } from "@mui/material";
import { useApolloClient, gql } from "@apollo/client";

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

  const client = useApolloClient();
  const { config: commentConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: PeerTube.abi,
    functionName: "addComment",
    args: [video.id, comment],
  });

  const {
    data: commentData,
    write: uploadComment,
    isLoading: isUploading,
    isSuccess: commentAddSuccess,
    error: commentError,
  } = useContractWrite(commentConfig);

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
    console.log(typeof video.id);
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
        alert("Something went wrong. please try again.!", err.message);
      });
  };

  //   const { data: commentsData } = useContractRead({
  //     address: CONTRACT_ADDRESS,
  //     abi: PeerTube.abi,
  //     functionName: "getComments",
  //     args: [video.id],
  //   });

  const handleCommentUpload = () => {
    setComment("");
    uploadComment();
    console.log(`Comment Data: ${commentData}`);
  };

  useEffect(() => {
    getComments();
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
              <div className="bg-white ml-5 py-2 px-3 text-black font-semibold rounded-3xl hover:opacity-80">
                <button>Subscribe</button>
              </div>
            </div>
            <div className="bg-[#3c3c3c] flex flex-row py-2 px-5 justify-between rounded-3xl">
              <div className="mr-2 pr-2 border-r-2 hover:opacity-70">
                <button className="flex flex-row  items-center">
                  <IconContext.Provider value={{ className: "w-6 h-6" }}>
                    <FiThumbsUp className="text-white" />
                  </IconContext.Provider>
                  <p className="px-2">121</p>
                </button>
              </div>

              <div className="hover:opacity-70">
                <button className="flex flex-row items-center">
                  <IconContext.Provider value={{ className: "w-6 h-6" }}>
                    <FiThumbsDown className="text-white" />
                  </IconContext.Provider>
                  <p className="px-2">20</p>
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
