import axios from "axios";

const saveFileToIPFS = async (file) => {
  const formData = new FormData();
  // add file to the form data
  formData.append("file", file);

  var config = {
    method: "post",
    url: "https://api.web3.storage/upload",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY}`,
      "Content-Type": "text/plain",
    },
    data: formData,
  };

  // Posting the form data to the IPFS API
  const response = await axios(config);
  // returning the CID
  return response.data.cid;
};

export default saveFileToIPFS;
