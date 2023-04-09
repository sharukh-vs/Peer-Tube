This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## LinkedIn
[https://www.linkedin.com/in/mohd-ziyad-565081225/](LinkedIn)

## Polyscan Contract
[https://mumbai.polygonscan.com/address/0x55525391d1A9EBd9FbAc0B44bb65E9336047f2dA](Polyscan)

## Subgraph (TheGraph Protocol)

[https://thegraph.com/hosted-service/subgraph/mohdziyadc/peer-tube-v2](Subgraph)

## About PeerTube

PeerTube is a decentralized video sharing and viewing platform. It is like a Web3 version of YouTube. PeerTube lets you upload a video, view it, subscribe to a channel, like/dislike and comment on a video publicly. Users can also search for the videos which are present on chain. Users pay a subscription price to follow creators. 

We combined Push Protocol, TheGraph Protocol and Livepeer, and deployed it all on Polygon Mumbai Testnet.

## How it works
There are three parts to our project.

**First - The Backend.**      
The Backend is basically our smart contract which interacts with the blockchain. For the smart contract, we have used Solidity. We have used Hardhat for compiling, deploying and testing our contract. Then we have setup a subgraph using TheGraph Protocol for indexing events from Ethereum.

**Second - The Frontend**       
We built an extensive front-end. For this we have used Next.js. We used Apollo to interact with the subgraph, and used wagmi+ethers.js to interact with the PeerTube smart contract. We have used RainbowKit for the connect wallet button.

**Third - Push Protocol and Livepeer**              
Once a user uploads their video from the frontend, it would be uploaded to ipfs using Livepeer’s API and from there the video will be fetched and streamed. The IPFS url is used to create a video. We have also implemented Push Protocol by showing notifications in a notification box. The creator of the video can only notify their subscribers. For subscriptions and push notifications, we have used Push Protocol. 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
