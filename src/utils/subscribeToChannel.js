import * as PushAPI from "@pushprotocol/restapi";

const subscribeToChannel = async (signer, address) => {
  console.log(`Address: ${address}`);
  console.log("Signer: ", signer);

  await PushAPI.channels.subscribe({
    signer: signer,
    channelAddress: "eip155:80001:0x068025e6c34BaED33D3744fCd4D98c26e15dE43D",
    userAddress: `eip155:80001:${address}`,
    onSuccess: () => {
      console.log("opt in success");
    },
    onError: () => {
      console.log("opt in error");
    },
    env: "staging",
  });
};

export default subscribeToChannel;
