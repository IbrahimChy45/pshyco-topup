importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD2d_najqnMXstfTvjlR6_4kffh5axIasY",
  projectId: "pshyco-top-up-center",
  messagingSenderId: "454109876822",
  appId: "1:454109876822:web:6141a2e77780f75051a1f7"
});

const messaging = firebase.messaging();
