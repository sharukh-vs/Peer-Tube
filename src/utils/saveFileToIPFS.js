import { Web3Storage } from "web3.storage";

function makeStorageClient() {
  return new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY });
}

const saveFileToIPFS = async (file) => {
  console.log("Uploading to Web3 Storage....");
  const client = makeStorageClient();
  const cid = await client.put([file]);
  console.log("stored files with cid:", cid);
  return cid;
};

export default saveFileToIPFS;
