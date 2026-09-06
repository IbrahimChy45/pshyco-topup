importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyD2d_najqnMXstfTvjlR6_4kffh5axIasY",
  authDomain: "pshyco-top-up-center.firebaseapp.com",
  databaseURL: "https://pshyco-top-up-center-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "pshyco-top-up-center",
  storageBucket: "pshyco-top-up-center.firebasestorage.app",
  messagingSenderId: "454109876822",
  appId: "1:454109876822:web:6141a2e77780f75051a1f7"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'ff profile pic. png.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

