import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
const firebaseConfig = {
    apiKey: "AIzaSyCnzPpG1aplE9-DLlhhRP5OaFtxmG4Ou6w",
    authDomain: "serviceadvisor.firebaseapp.com",
    databaseURL: "https://serviceadvisor.firebaseio.com",
    projectId: "serviceadvisor",
    storageBucket: "serviceadvisor.appspot.com",
    messagingSenderId: "188030944983",
    appId: "1:188030944983:web:0212cbe4ca59e9d057d292",
    measurementId: "G-KTFT31001J"
  };
  

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestForToken = async() => {
    return getToken(messaging, { vapidKey: "BLJqoTFEFUUMH8A18rChn3C5J3T2YcORJI4XDVH56IBCgqymaUV5th0ScSYU1Lel0qFgOXyVWcH1GSsUeD4V9A8" })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          // Perform any other neccessary action with the token
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  };