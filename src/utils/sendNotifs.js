import * as PushAPI from "@pushprotocol/restapi";

const sendNotifs = async (signer, creatorAddress, videoTitle) => {
  const apiResponse = await PushAPI.payloads.sendNotification({
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
  console.log("Api Response: ", apiResponse);
};

export default sendNotifs;
