// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyDw9fHnA_49dSVoRZmm-LzEACfUE_9DHjU",
authDomain: "test-e094b.firebaseapp.com",
databaseURL: "https://test-e094b-default-rtdb.firebaseio.com",
projectId: "test-e094b",
storageBucket: "test-e094b.appspot.com",
messagingSenderId: "425256372199",
appId: "1:425256372199:web:09d884c3712d8b5f719f42",
measurementId: "G-SY4S6G8271"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = firebase.database();


// Light
var btnLight = document.getElementById("LightButton");
btnLight.onclick = function() {
    if(document.getElementById("LightMode").textContent === "TURN OFF") {
        database.ref("TT_IoT").update({
                    "Led": 1
                });
    } else {
        database.ref("TT_IoT").update({
            "Led": 0
        });
    }
}


// getTemp
database.ref("TT_IoT/Temp").on("value", function(snapshot) {
    var temp = snapshot.val()
    document.getElementById("temp-value").innerHTML = temp + "&#176; C";
});

// getHum
database.ref("TT_IoT/Hum").on("value", function(snapshot) {
    var temp = snapshot.val();
    document.getElementById("hum-value").innerHTML = temp + "%";
});

// auto update ImgDen
database.ref("TT_IoT/Led").on("value", function(snapshot) {
    var ss = snapshot.val();
    if(ss == 1) {
        document.getElementById("LightMode").innerHTML = "TURN ON";
        document.getElementById("LightButton").style.backgroundColor = "#ffbe00";
    } else {
        document.getElementById("LightMode").innerHTML = "TURN OFF";
        document.getElementById("LightButton").style.backgroundColor = "#a9bdbe";
    }
});

// auto update Warning
database.ref("TT_IoT/Pir").on("value", function(snapshot) {
    var ss = snapshot.val();
    if(ss == 1) {
        document.getElementById("warn-value").innerHTML = "WARNING";
        setInterval(function() {
            if(document.getElementById("warning").style.backgroundColor === "rgb(223, 77, 85)") {
                document.getElementById("warning").style.backgroundColor = "black";
            } else {
                document.getElementById("warning").style.backgroundColor = "#df4d55";
            }
            console.log(document.getElementById("warning").style.backgroundColor === "rgb(223, 77, 85)");
    }, 500);
        
    } else {
        document.getElementById("warn-value").innerHTML = "SAFE";
        document.getElementById("warning").style.backgroundColor = "#0070fc";
    }
});
// function changeColor() {
//     const background = document.getElementById("warning");
//     const arrayColor = ['#df4d55', 'black'];
//     setInterval(function() {
//             if(document.getElementById("warning").backgroundColor === "#df4d55") {
//                 document.getElementById("warning").style.backgroundColor = "#black";
//             } else {
//                 document.getElementById("warning").style.backgroundColor = "#df4d55";
//             }
//     }, 500);
// }


// #df4d55