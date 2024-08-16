# Technologies
I used Next.js for its powerful server-side capabilities and routing features. While I didn’t leverage server-side components extensively, Next.js's routing was essential for managing navigation.

For state management of gallery images, I implemented Redux Toolkit, which simplified the setup and handling of state.

I opted for the native WebSocket API for real-time communication instead of using a library like Socket.io, keeping the solution straightforward.

I also added OptionsContext to allow for future expansion and interaction with the main component, though it wasn't strictly necessary for the current functionality.

# Improvements
Image Storage: Instead of sending raw image data, consider using an image URL with storage solutions like AWS S3. This would make image handling more efficient and reduce payload sizes.

Enhanced Options: Add parameters like negative_prompt and image_size for more control over image generation, offering users greater customization.





This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

