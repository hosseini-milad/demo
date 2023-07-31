// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
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

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
