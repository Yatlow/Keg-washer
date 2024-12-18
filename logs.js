const Logo=[
"*"," "," "," ","*"," ","*","*","*","*","*","*","*","*","*","*","*","*","*"," ","*"," "," "," ","*","\n",
"*"," "," "," ","*"," "," "," "," "," "," "," ","*"," "," "," "," "," "," "," ","*"," "," "," ","*","\n",
"*"," "," "," ","*"," ","*","*","*","*","*"," ","*"," ","*","*","*","*","*"," ","*"," "," "," ","*","\n",
"*"," "," "," ","*"," ","*"," "," "," ","*"," ","*"," ","*"," "," "," ","*"," ","*"," "," "," ","*","\n",
"*","*","*","*","*"," ","*"," "," "," ","*"," ","*"," ","*"," "," "," ","*"," ","*","*","*","*","*","\n",
"*"," "," "," ","*"," ","*"," "," "," ","*"," ","*"," ","*"," "," "," "," "," ","*"," "," "," ","*","\n",
"*"," "," "," ","*"," ","*","*","*","*","*"," ","*"," ","*"," "," "," ","*"," ","*"," "," "," ","*","\n",
"*"," "," "," ","*"," ","*"," "," "," ","*"," ","*"," ","*"," "," "," ","*"," ","*"," "," "," ","*","\n",
"*"," "," "," ","*"," ","*"," "," "," ","*"," ","*"," ","*","*","*","*","*"," ","*"," "," "," ","*","\n","\n"
]
const Timestamp = new Date();
const year = Timestamp.getFullYear();
const month = String(Timestamp.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
const day = String(Timestamp.getDate()).padStart(2, '0');
const hours = String(Timestamp.getHours()).padStart(2, '0');
const minutes = String(Timestamp.getMinutes()).padStart(2, '0');
const formattedTimestamp = `${day}/${month}/${year} ${hours}:${minutes}`;
let printTime=formattedTimestamp.split('');
const startText=[
    "L","i","v","e"," ","L","o","g"," ","K","e","g"," ","W","a","s","h","e","r","\n",
    "L","o","a","d","e","d"," ","o","n",":"," ",""
].concat(printTime, ["\n", "\n"]); // Merge arrays seamlessly
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';
const firebaseConfig = {
    apiKey: "AIzaSyAIg4_DSXJH1nIjarnTHaYG7Z8ydNJEBZM",
    authDomain: "keg-washer.firebaseapp.com",
    projectId: "keg-washer",
    storageBucket: "keg-washer.appspot.com",
    messagingSenderId: "82969373226",
    appId: "1:82969373226:web:5fa94ca93b177076f53153",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);



async function write() {
    const logoHatch = document.getElementById("logoHatch");
    const LoadedT= document.getElementById("loaded")
    return new Promise((resolve)=>{
    let delay = 0;

    // Function to write characters with a delay
    const appendWithDelay = (textArray, charDelay,Tag) => {
        textArray.forEach((char,index) => {
            setTimeout(() => {
                Tag.innerHTML += char;
                if (index === textArray.length - 1 && textArray === startText) {
                    resolve();
                }
            }, delay);
            delay += charDelay;
        });
    };

    appendWithDelay(Logo, 4,logoHatch); // Delay of 4ms per character for Logo
    appendWithDelay(startText, 4,LoadedT); // Delay of 100ms per character for startText
    })
}

async function LiveLog(){
    const LiveLog = doc(db, 'users', 'Live-Logs');
    const LogPrint =document.getElementById("Logs");
    let rowCount= 1;
    const processedKeys = new Set();

    const appendWithDelay = (text, charDelay,Tag) => {
        return new Promise((resolve)=>{
            let delay = 0;
            LogPrint.innerHTML += `\n${rowCount}\t`
            text.split('').forEach((char,index) => {
                setTimeout(() => {
                    Tag.innerHTML += char;
                    if (index === text.length-1){
                        resolve();
                    }
                }, delay);
                delay += charDelay;
            });
        });
    }
    async function fetchAndUpdateLog() {
        try{
            let UserDoc= await getDoc(LiveLog);
            let Doc=UserDoc.data()
            const sortedKeys = Object.keys(Doc).sort((a, b) => {
                return parseInt(a) - parseInt(b); 
            });
            for (const key of sortedKeys) {          
                if(!processedKeys.has(key)){
                    processedKeys.add(key)
                    try{
                        const KWlog=Doc[key]
                        await appendWithDelay(KWlog,5,LogPrint);
                        rowCount++;
                        }
                    catch (error){
                        console.error(`Error:${error}`)
                    }
                
                }
            }
        } catch (error) {
                console.error("Error fetching document:", error);
        }   
        setTimeout(fetchAndUpdateLog, 50);  
    };
    fetchAndUpdateLog();
};


function loadingLog(){
    const loadingLog = document.getElementById("loadingLog");
    let count = 0; // Current number of *
    let increasing = true; // Flag to track the direction of animation

function animateLoading() {
    let loadingString = "\n*"; // First star has no space
    if (count > 1) {
        loadingString += " *".repeat(count - 1); // Add spaces for additional stars
    }

    // Update the content of loadingLog
    loadingLog.innerHTML = loadingString;

    // Adjust count based on the direction
    if (increasing) {
        count++;
        if (count === 30) increasing = false; // Reverse direction at 40
    } else {
        count--;
        if (count === 0) increasing = true; // Reverse direction at 0
    }

    // Calculate dynamic speed for easing (e.g., speed slows down at peaks)
    const speed = Math.abs(100 - count); // Base delay is 50ms, adjusts based on distance from 20

    // Recursively call with adjusted delay
    setTimeout(animateLoading, speed);
}

// Start the animation
animateLoading();


}

function refreshIdToken() {
    if (auth.currentUser) {
        auth.currentUser.getIdToken(true)
        .then((newIdToken) => {
            localStorage.setItem("customToken", newIdToken);
        })
        .catch((error) => {
            console.error("Error refreshing ID token:", error);
        });
    } else {
        console.log("No user is logged in.");
    }
    }
    
    
    
    async function page() {
        await write()
        loadingLog()
        LiveLog()
        setInterval(refreshIdToken, 59 * 60 * 1000);
}


window.onload = page;