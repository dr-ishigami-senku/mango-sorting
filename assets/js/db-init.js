const firebaseConfig = {
    apiKey: "AIzaSyASOzEC6YbY161o19yiHaknmsV1ECE8RX4",
    authDomain: "mango-database-e8657.firebaseapp.com",
    databaseURL: "https://mango-database-e8657-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mango-database-e8657",
    storageBucket: "mango-database-e8657.appspot.com",
    messagingSenderId: "190857298549",
    appId: "1:190857298549:web:3c6943032c4c46a009ae3c"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();