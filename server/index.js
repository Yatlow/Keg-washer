import express from 'express'; // express is  considered old, fastify is newer
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut , sendPasswordResetEmail } from 'firebase/auth';
import admin from 'firebase-admin';
import {doc, getDoc, deleteDoc,getDocs,collection } from "firebase/firestore";

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    OAth2: process.env.FIREBASE_TOKEN_URI
};


const app1 = initializeApp(firebaseConfig);
const auth = getAuth(app1);
admin.initializeApp({
    credential: admin.credential.cert('keg-washer-firebase-adminsdk-7ww1i-aa7938c93f.json'),  
});
const app = express();
const db = admin.firestore();
const allowedOrigins = [
    'https://yatlow.github.io',
    'http://localhost:5500',
    'http://localhost',
    'http://127.0.0.1:5500',
    'http://127.0.0.1:5501'
];

const corsOptions = {
    origin: function(origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/login', async (req, res) => {
    const { email, password } = req.body; // Access email and password from the request body
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const customToken = await admin.auth().createCustomToken(userCredential.user.uid);
        res.json({ success: true, token: customToken });
    } catch (error) {
        console.error('Error verifying custom token:', error);
        res.status(401).json({ success: false, message: 'Authentication failed' });
    }
});
app.post('/logout', async (req, res) => {
    const {email} = req.body;
    try{
        signOut(auth);
        res.json({ success: 1 });
    }catch{
        res.json({ success: 0 });
    }
});
app.post('/forgotPassowrd', async (req, res) => {
    const { email } = req.body;
    try {
        await admin.auth().getUserByEmail(email);
        res.json({ success: 1 });
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            console.error('User not found');
            res.status(404).json({ success: 0 });
        } else {
            console.error('Failed to send password reset email:', error.message);
            res.status(500).json({ success: 0 });
        }
    }
});
app.post('/resetPassowrd', async (req, res) => {
    const { email } = req.body;
    try {
        await sendPasswordResetEmail(auth, email);
        res.json({ success: 1});
    } catch (error) {
        console.error('Failed to send password reset email:', error.message);
            res.status(500).json({ success: 0});    
    }
});
app.get('/ping', async (req, res) => {
    res.status(200).send('server is allive');
});


async function DeleteOld(CollectionName, Tfield, yearsAgo) {
    const now= new Date();
    const cutOfDate= new Date();
    cutOfDate.setFullYear(now.getFullYear()-yearsAgo) 
    try{
        const colRef = db.collection(CollectionName); // Use Admin SDK's method
        const snapshot = await colRef.get();

        snapshot.forEach(async (doc) => {
           const DocData= doc.data();
           const timestamp=  DocData[Tfield]?.toDate();
           if (timestamp && timestamp<cutOfDate){
                await doc.ref.delete()
           }
        });
    }catch (error){
        console.log("error deleting old docs", error)
    }
}

const OneWeek= 7*24*60*60*1000;
setInterval(async() => {
    const collectionRef = db.collection("users").doc("keg-washer"); 
    const docSnapshot = await collectionRef.get();
    const yearsAgo= docSnapshot.data()["Years-Saved"]
    await DeleteOld("Saved-Parameters", "Timestamp", yearsAgo)
    await DeleteOld("Washer-Logs", "On", yearsAgo)
}, OneWeek);

const port = process.env.PORT || 10000;  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
