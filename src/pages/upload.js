import React, { useState, useRef, useEffect } from "react";
import { BiCloud, BiMusic, BiPlus } from "react-icons/bi";
import Link from "next/link";
import saveFileToIPFS from "../utils/saveFileToIPFS";
import { useCreateAsset } from "@livepeer/react";
import { Box, CircularProgress } from "@mui/material";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import PeerTube from "../../artifacts/contracts/PeerTube.sol/PeerTube.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export default function Upload() {
  // Creating state for the input field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");
  const [videoHash, setVideoHash] = useState("");
  const [thumbnailHash, setThumbnailHash] = useState("");

  //  Creating a ref for thumbnail and video
  const thumbnailRef = useRef();
  const videoRef = useRef();

  const {
    mutate: createAsset,
    data: assets,
    progress,
    error,
    isLoading,
    isSuccess,
  } = useCreateAsset(
    video
      ? {
          sources: [
            {
              name: video.name,
              file: video,
              storage: {
                ipfs: true,
                metadata: {
                  name: title,
                  description: description,
                },
              },
            },
          ],
        }
      : null
  );

  const { config: uploadVideoConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: PeerTube.abi,
    functionName: "uploadVideo",
    args: [videoHash, title, description, category, thumbnailHash],
  });

  const {
    data: uploadData,
    write: uploadVideo,
    isLoading: isUploading,
    isSuccess: isUploadSuccess,
    error: uploadError,
  } = useContractWrite(uploadVideoConfig);

  const handleDiscardBtn = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setLocation("");
    setThumbnail("");
    setVideo("");
  };

  const uploadVideoToLivepeer = async () => {
    createAsset?.();
  };

  const handleUploadToIpfs = async () => {
    await uploadVideoToLivepeer();
    const hash = await saveFileToIPFS(thumbnail);
    setThumbnailHash(hash);

    console.log(`Thumbnail CID: ${thumbnailHash}`);
  };

  const handleSubmit = async () => {
    console.log(`Video hash: ${videoHash}`);
    uploadVideo();
    console.log(`Video Data: ${uploadData}`);
  };
  useEffect(() => {
    if (assets != null) {
      setVideoHash(assets[0].playbackId);
    }
    console.log(`Asset: ${JSON.stringify(assets)}`);
  }, [assets]);

  return (
    <div className="w-full min-h-screen max-h-full bg-[#0F0F0F] flex flex-row">
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col m-10  mt-10  lg:flex-row">
          <div className="flex lg:w-3/4 flex-col ">
            <label className="text-[#9CA3AF]  text-sm">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
            />
            <label className="text-[#9CA3AF] mt-10">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-[90%] text-white h-32 placeholder:text-gray-600  rounded-md mt-2 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
            />

            <div className="flex flex-row mt-10 w-[90%]  justify-between">
              <div className="flex flex-col w-2/5    ">
                <label className="text-[#9CA3AF]  text-sm">Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  placeholder="Bali - Indonesia"
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                />
              </div>
              <div className="flex flex-col w-2/5    ">
                <label className="text-[#9CA3AF]  text-sm">Category</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    console.log(`Category: ${category}`);
                  }}
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                >
                  <option>Music</option>
                  <option>Sports</option>
                  <option>Gaming</option>
                  <option>News</option>
                  <option>Entertainment</option>
                  <option>Education</option>
                  <option>Science & Technology</option>
                  <option>Travel</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <label className="text-[#9CA3AF]  mt-10 text-sm">Thumbnail</label>

            <div
              onClick={() => {
                thumbnailRef.current.click();
              }}
              className="border-2 w-64 border-gray-600  border-dashed rounded-md mt-2 p-2  h-36 items-center justify-center flex hover:cursor-pointer"
            >
              {thumbnail ? (
                <img
                  onClick={() => {
                    thumbnailRef.current.click();
                  }}
                  src={URL.createObjectURL(thumbnail)}
                  alt="thumbnail"
                  className="h-full rounded-md"
                />
              ) : (
                <BiPlus size={40} color="gray" />
              )}
            </div>

            <input
              type="file"
              className="hidden"
              ref={thumbnailRef}
              onChange={(e) => {
                setThumbnail(e.target.files[0]);
              }}
            />
          </div>

          <div
            onClick={() => {
              videoRef.current.click();
            }}
            className={
              video
                ? " w-96   rounded-md  h-64 items-center justify-center flex"
                : "border-2 border-gray-600  w-96 border-dashed rounded-md mt-8   h-64 items-center justify-center flex hover:cursor-pointer"
            }
          >
            {video ? (
              <video
                controls
                src={URL.createObjectURL(video)}
                className="h-full rounded-md"
              />
            ) : (
              <p className="text-[#9CA3AF]">Upload Video</p>
            )}
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          ref={videoRef}
          accept={"video/*"}
          onChange={(e) => {
            setVideo(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />

        <div className=" -mt-10 mr-10 flex  justify-evenly">
          <div className="flex items-center">
            <Link href="/" passHref>
              <button
                onClick={handleDiscardBtn}
                className="bg-transparent  text-[#9CA3AF] py-2 px-6 border rounded-lg  border-gray-600  mr-6"
              >
                Discard
              </button>
            </Link>

            <button
              onClick={async () => {
                await handleUploadToIpfs();
                console.log(`Video Hash from OnClick: ${videoHash}`);
              }}
              className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500 bg-blue-500 hover:bg-blue-700 text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center"
              disabled={isSuccess}
            >
              {isSuccess ? (
                <p>Uploaded</p>
              ) : isLoading ? (
                <Box>
                  <CircularProgress sx={{ color: "white" }} />
                </Box>
              ) : (
                <>
                  <BiCloud />
                  <p className="ml-2">Upload To IPFS</p>
                </>
              )}
            </button>
            <button
              onClick={async () => {
                handleSubmit();
              }}
              className=" disabled:opacity-50 bg-blue-500  disabled:hover:bg-blue-500 hover:bg-blue-700 disabled:cursor-not-allowed text-white  py-2 ml-6  rounded-lg flex px-4 justify-between flex-row items-center"
              disabled={!isSuccess}
            >
              {isUploadSuccess ? (
                <p>Success!</p>
              ) : isUploading ? (
                <Box sx={{ color: "white" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <BiCloud />
                  <p className="ml-2">Upload </p>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
