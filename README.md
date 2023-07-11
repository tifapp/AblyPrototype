# tiF Ably Chat Prototype

This repo serves as a simple prototype for the chat feature to be built in the tiF MVP.

It includes the following features:

- Channels list with the live updating most recent message
- Sending and receiving messages
- User handle and link rendering
- The ability to mock an event ending

## Setup

First make sure to run the following command.

```sh
npm run setup
```

Then insert your API key from Ably in `secrets.ts`

```ts
// In secrets.ts
export const ABLY_API_KEY = "<Insert API key from ably here>";
```

Finally, you can build and run the project with either:

> NB: This prototype was only tested on iOS, so issues may arise for other devices.

```sh
# Any of these
npm run ios
npm run android
npm run web
npm run start
```

## Issues

1. Sometimes the message history doesn't load in the detail.
