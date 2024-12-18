const attributes = [
    "postCausticWaterRinseRecureEachRins", "postCausticWaterRinseOn", "postCausticWaterRinseOf",
    "preboobotMeteg", "pressureMeteg", "FirstAirPurgeRecure", "FirstAirPurgeTon", "FirstAirPurgeToff", "InitialWaterFlud",
    "recureMedSquirt", "medSquirtWaterOn", "medSquirtWaterOff", "recureShortSquirt",
    "ShortSquirtWaterOn", "ShortSquirtWaterOff", "recureLongSquirt", "LongSquirtWaterOn",
    "LongSquirtWaterOff", "RinseWaterWithPump", "PostWaterPurgeRecure", "PostWaterPurgeTon",
    "PostWaterPurgeToff", "InitialCausticFlud", "CausticRinseKeg1", "CausticRinseKeg2",
    "pressurizeCausticInKeg", "causticSoakInKeg", "SecondCausticFlud", "recureShortCausticSquirt",
    "CausticSquirtPumpOn", "CausticSquirtPumpOff", "recurePurgeCausticSquirt",
    "airAndPumpIntervale", "recureLastCausticSquirt", "CausticLastSquirtPumpOn",
    "CausticLastSquirtPumpOff", "PostCausticPurgeRecure", "PostCausticPurgeTon",
    "PostCausticPurgeToff", "postCausticWaterRinseRecure",
    "SanitizeInitialKeg1", "SanitizeInitialKeg2",
    "SanitizeInitialBothKegs", "paaInitialPumpRecure", "paaInitialPumpOn", "paaInitialPumpOff",
    "paaSquirtRecure", "Co2PumpIntervale", "postSquirtSanitizeBothKegs", "co2PurgeKeg1Recure",
    "co2PurgeKeg1Open", "co2PurgeKeg1Closed", "co2PurgeKeg2Recure", "co2PurgeKeg2Open",
    "co2PurgeKeg2Closed", "co2PurgeBothKegsOpen", "co2PurgeBothKegsClosed", "kegPdestination", "TimeOutPdestination",
    "PostTimeOutBuildP", "PTimeWhenSensorDisabled"
];

const disabledInputs = [
    "kegPdestination", "TimeOutPdestination", "PostTimeOutBuildP"
]

const LabelList = [
    "PrebootToggleHousing",
    "PressureToggleHousing",
    "label1",
    "label2",
    "label3",
    "label4",
    "label5",
    "label6",
    "label7",
    "label8",
    "label9"
]

const translationDictionary = {
    "כניסה כאורח":"Log in as Guest","הצג דוקומנטציה":"Show Documentation",
    "טען נתונים למשטף": "Load values to Washer", "תצוגה מקדימה": "Preview", "קונסולת משטף חביות": "Keg Washer Console",
    "שמור לוגים ל:": "Save Logs For", "שנים": "years", "נתונים שנשמרו בעבר": "Previously saved Values",
    "לוגים של משטף החביות": "Keg Washer Logs", "הודלק ב:": "Turned on at:", "חביות שנשטפו:": "Kegs Washed",
    "טען נתונים אלו למשטף": "Load these values to Keg Washer", "פרמטרים אלו עודכנו על ידי:": "Parameters updated by:",
    "הצג נתונים שנשמרו בעבר": "Show previously saved Values", "הצג לוגים של משטף החביות": "Show Keg Washer Logs",
    "הצג קונסולת משטף החביות": "Show Keg Washer Console", "טוען נתונים מהשרת": "loading Data from server",
    "הפרמטרים של כל שטיפה מוגדרים בשלב #2": "The parameters of each rinse are detirmened by stage #2",
    "פרמטרים אלו ישפיעו גם על שלב #6": "These parameters will also efect stage #6",
    "משטף חביות התחבר לאחרונה ב:": 'Keg washer last connected at:',
    "שפה מועדפת": "DefaultLanguage",
    "חיבור אחרון": "Last log in",
    "פרמטרים עודכנו על ידי:": 'Parameters were updated by:',
    "שמור את כל הפרמטרים עכשיו": "Save All Parameters Now",
    "סגור ללא שמירה": "Close Without Saving",
    'סייקל בדיקה ראשוני ישתנה רק לאחר שמירת פרמטרים <br>לחיצה על "שמור פרמטים" ישמור את כל הפרמטרים מהדף!': 'Initial test cycle will be changed only after saving parameters<br> clicking "Save Parameters" will save all parametrs on page!',
    'חיישני לחץ ישתנו רק לאחר שמירת פרמטרים <br>לחיצה על "שמור פרמטים" ישמור את כל הפרמטרים מהדף!': 'Pressure Sensors will be changed only after saving parameters<br> clicking "Save Parameters" will save all parametrs on page!',
    "ב:": "At:",
    "טוען פרמטרים מהשרת": "Sucssesfuly Logged In",
    "נתוני ברירת מחדל!": "Default Value",
    "סגור": "Close",
    "מחליף משתמש": "Changing user",
    "מתנתק אוטומטית<br>המושב עבר": "Logging out- TIMEOUT",
    "שכחתי סיסמא": "I forgot my password",
    "אחד או שני פרטי הכניסה שגויים": 'One ore both Details are wrong',
    "איפוס סיסמא": "Reset Password",
    "כניסה מחדש": "Retry logging in",
    "English": "עברית",
    "פרמטרים למערכת חביות": "Keg Washer Parameters",
    "הכנס פרטי משתמש": "Enter User Details",
    "אימייל:": "Email:",
    "סיסמא:": "Password:",
    "כניסה": "Login",
    "© ישראל אטלו": "© Yisrael Atlow",
    "עדכון פרמטרים במשטף חביות": "Update Parameters in Keg Washer",
    "עדכון אחרון": "Last Update",
    "גרסה": "Version",
    "שמור פרמטרים": "Save Parameters",
    "הצג נתוני ברירת מחדל": "Show Default Data",
    "איפוס לנתוני ברירת מחדל": "Reset to Default Data",
    "החלף משתמש": "Switch User",
    "לחץ יעד": "Target Pressure",
    "חיטוי בחומצה פראצטית": "Sanitization with Peracetic Acid",
    "סייקל בדיקה ראשוני": "Initial Test Cycle",
    "חיישני לחץ": "Pressure Sensors",
    "יפעל רק אם המתג המכני מופעל!": "Will only operate if the mechanical switch is activated!",
    "שלב #1 דחיקת בירה החוצה עם אוויר": "Stage #1 Purging Out Beer with Air",
    "כמות חזרות": "Number of Repeats",
    "פעמים": "Times",
    "משך כניסת אוויר בכל חזרה": "Duration of Air Inflow per Repetition",
    "שניות": "Seconds",
    "משך ניקוז ללא אוויר בכל חזרה": "Drain Duration without Air per Repetition",
    "שלב #2 שטיפה ראשונה במים": "Stage #2 First Water Rinse",
    "משך מילוי מים ראשוני": "Initial Water Fill Duration",
    "התזת מים בינונית": "Medium Water Squirt",
    "משך כניסת מים בכל חזרה": "Water Inflow Duration per Repetition",
    "משך ניקוז ללא מים בכל חזרה": "Drain Duration without Water per Repetition",
    "התזת מים קצרה": "Short Water Squirt",
    "התזת מים ארוכה": "Long Water Squirt",
    "משך שטיפה במים עם משאבה לבניית לחץ": "Water Rinse with Pressure-Building Pump",
    "שטיפה במים יחד עם משאבה לבניית לחץ": "Water Rinse with Pressure-Building Pump",
    "שלב #3 דחיקת מים לאחר שטיפה ראשונה החוצה עם אוויר": "Stage #3 Purging Water with Air after First Rinse",
    "שלב #4 ניקוי בסודה קאוסטיק": "Stage #4 Caustic Cleaning",
    "משך מילוי קאוסטיק ראשוני- ל2 החביות": "Initial Caustic Fill Duration - for Both Kegs",
    "משך מילוי קאוסטיק ראשוני- ל2 החביות": "Initial Caustic Fill Duration - for Both Kegs",
    "משך רחיצה קאוסטיק חבית ימין": "Caustic Rinse Duration for Right Keg",
    "משך רחיצה קאוסטיק חבית שמאל": "Caustic Rinse Duration for Left Keg",
    "כניסת קאוסטיק לחבית ללא יציאת הקאוסטיק לבניית לחץ": "Caustic Inflow to Keg without Caustic Outflow for Pressure Build-up",
    "משך דחיסת הקאוסטיק לחבית": "Caustic Compression Duration into Keg",
    "משך השריית קאוסטיק בחבית בלחץ": "Caustic Soak Duration in Keg under Pressure",
    "משך מילוי קאוסטיק שני- ל2 החביות": "Second Caustic Fill Duration - for Both Kegs",
    "התזת קאוסטיק קצרה": "Short Caustic Squirt",
    "משך הפעלת משאבה": "Pump Activation Duration",
    "משך כיבוי משאבה": "Pump Deactivation Duration",
    "התזת קאוסטיק בשילוב אוויר": "Caustic Squirt with Air",
    "אינטרוול אוויר ומשאבה": "Air and Pump Interval",
    "התזת קאוסטיק ארוכה- לאחר התזה בשילוב אוויר": "Long Caustic Squirt - after Air Squirt",
    "שלב #5 דחיקת סודה קאוסטיק החוצה עם אוויר": "Stage #5 Purging Caustic with Air",
    "שלב #6 שטיפה במים לאחר ניקוי קאוסטיק": "Stage #6 Water Rinse after Caustic Cleaning",
    "כמות שטיפות": "Number of Rinses",
    "דחיקת מים החוצה עם אוויר בין כל שטיפה": "Purging water between each rinse",
    "התזת מים בכל שטיפה": "Water Squirt per Rinse",
    "שלב #7 חיטוי בחומצה פראצטית": "Stage #7 Sanitization with Peracetic Acid",
    "משך מילוי פראצטית חבית ימין": "Peracetic Fill Duration for Right Keg",
    "משך מילוי פראצטית חבית שמאל": "Peracetic Fill Duration for Left Keg",
    "משך מילוי פראצטית ל2 החביות": "Peracetic Fill Duration for Both Kegs",
    "התזת פראצטית ראשונה": "First Peracetic Squirt",
    "התזת פראצטית בשילוב CO2": "Peracetic Squirt with CO2",
    "אינטרוול CO2 ומשאבה": "CO2 and Pump Interval",
    "חיטוי פראצטית ארוך לשני החביות- לאחר התזה בשילוב CO2": "Long Peracetic Sanitization for Both Kegs - after CO2 Squirt",
    "שלב #8 דחיקת חומצה פראצטית החוצה עם CO2": "Stage #8 Purging Peracetic Acid with CO2",
    "חבית ימין": "Right Keg",
    "משך כניסת CO2 בכל חזרה": "CO2 Inflow Duration per Repetition",
    "משך ניקוז ללא CO2 בכל חזרה": "Drain Duration without CO2 per Repetition",
    "חבית שמאל": "Left Keg",
    "חבית ימין ושמאל יחד": "Both Kegs Together",
    "משך דחיקת פראצטית החוצה עם CO2 ל 2 החביות": "Peracetic Purging Duration with CO2 for Both Kegs",
    "משך ניקוז פראצטית החוצה ללא CO2 ל 2 החביות": "Peracetic Drain Duration without CO2 for Both Kegs",
    "משך חיטוי פראצטית ארוך לשני החביות": "Long Peracetic Sanitization for Both Kegs",
    "שלב #9 בניית לחץ בחבית עם CO2": "Stage #9 Pressure Build-up in Keg with CO2",
    "משך המתנה להגעה ליעד": "Wait Duration to Reach Target",
    "משך בניית לחץ לאחר המתנה במידה ולא הגיע ללחץ יעד": "Pressure Build Duration after Wait if Target Pressure Not Reached",
    "משך בניית לחץ במידה ומתג חיישני לחץ כבוי": "Pressure Build Duration if Pressure Sensor Switch is Off",
    "שולח פרמטרים לשרת": "Sending Data to Server",
    "ממתין לשרת": "Waiting for Server",
    "אישור": "Confirm",
    "טעינה מחדש": "Reload",
    "שליחה מחדש": "Resend",
    "איפוס פרמטרים מחדש": "Reset to default Data",
    "שמור כקובץ PDF": "Save as PDF",
    "דלוק": "On",
    "כבוי": "Off",
    "במידה ולאחר סיום- כפתור ההפעלה לחוץ, יפעל שוב- עד לעזיבת הכפתור": "If after finishing - the power button is pressed, it will work again - until the button is released",
};

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signInWithCustomToken, signOut } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';
import { getFirestore, doc, updateDoc, getDoc, setDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';
const firebaseConfig = {
    apiKey: "AIzaSyAIg4_DSXJH1nIjarnTHaYG7Z8ydNJEBZM",
    authDomain: "keg-washer.firebaseapp.com",
    projectId: "keg-washer",
    storageBucket: "keg-washer.appspot.com",
    messagingSenderId: "82969373226",
    appId: "1:82969373226:web:5fa94ca93b177076f53153",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const docRef = doc(db, 'parameters', 'updated');

let servrPort = "https://keg-control-1.onrender.com";
let preboobotMeteg = 1;
let pressureMeteg = 1;
let escapePressedOnce = 1;
let closedConfirmBox = 0;
let secretClick = 0;
let LangFlag = 0; //hebrew
let resetPassBoxOpen = false;
let prefboxOpen = false;
let menuOpen = false;
let LiveLogsOpen = false;
let lastSaveOpen = false;
let DefValAndsLastSaveOpen = false;
let WasherLogsOpen = false;
const idToken = sessionStorage.getItem('customToken');

function translateToEnglish(hebrewText) {
    return translationDictionary[hebrewText] || hebrewText;  // Default to original text if not found
}

function traslateStickListener(hostLang) {
    const elementsToTranslate = document.querySelectorAll('.translatable');
    elementsToTranslate.forEach(function (element) {
        // Store original Hebrew text in a data attribute if it doesn't already have one
        if (!element.dataset.originalText) {
            element.dataset.originalText = element.innerHTML.trim();
            element.innerHTML = element.dataset.originalText;
        }

        // Toggle translation based on the language flag
        if (LangFlag === 0) {
            element.innerHTML = translateToEnglish(element.innerHTML);  // Translate to English
            document.getElementById("bodyBox").classList.add("englishHtml");
            document.getElementById("login-email").placeholder = "Email"
            document.getElementById("login-password").placeholder = "Password"
            document.body.setAttribute('dir', 'ltr');
        } else {
            element.innerHTML = element.dataset.originalText;  // Restore Hebrew text
            document.getElementById("bodyBox").classList.remove("englishHtml");
            document.getElementById("login-email").placeholder = "אימייל"
            document.getElementById("login-password").placeholder = "סיסמא"
            document.body.setAttribute('dir', 'rtl');
        }
    });

    // Toggle the LangFlag and button text
    if (LangFlag === 0) {
        LangFlag = 1; // Switch to English
        hostLang.innerHTML = `<div class="LangIndictor translatable" id="LangIndictor">עברית</div>`;
    } else {
        LangFlag = 0; // Switch back to Hebrew
        hostLang.innerHTML = `<div class="LangIndictor translatable" id="LangIndictor">English</div>`;
    }
    let TglBtn1 = document.getElementById("PrebootToggleHousing");
    let TglBtn2 = document.getElementById("PressureToggleHousing");
    if (TglBtn1.classList.contains("FNCTglHouseOFF")) {
        TglBtn1.classList.remove("FNCTglHouseOFF")
        TglBtn1.classList.add("FNCTglHouseOFF-ENG")
    } else if (TglBtn1.classList.contains("FNCTglHouseOFF-ENG")) {
        TglBtn1.classList.remove("FNCTglHouseOFF-ENG")
        TglBtn1.classList.add("FNCTglHouseOFF")
    }
    if (TglBtn2.classList.contains("FNCTglHouseOFF")) {
        TglBtn2.classList.remove("FNCTglHouseOFF")
        TglBtn2.classList.add("FNCTglHouseOFF-ENG")
    } else if (TglBtn2.classList.contains("FNCTglHouseOFF-ENG")) {
        TglBtn2.classList.remove("FNCTglHouseOFF-ENG")
        TglBtn2.classList.add("FNCTglHouseOFF")
    }
    document.querySelectorAll('*').forEach(element => {
        const style = window.getComputedStyle(element);
        if (style.fontFamily.includes('Eng') && style.fontSize === '14px' || style.fontSize === '15px' || element.classList.contains('DefeStageRow')) {
            element.classList.add('reduceFontENG')
            // element.style.setProperty('font-size', '12px', 'important');
        } else if (element.classList.contains('reduceFontENG')) {
            element.classList.remove('reduceFontENG')
            // element.style.setProperty('font-size', '14px', 'important');
        }
        if (element.classList.contains('note') && style.fontFamily.includes('Eng')) {
            element.classList.add('noteEng')
        } else if (element.classList.contains('noteEng')) {
            element.classList.remove('noteEng')
            // element.style.setProperty('font-size', '14px', 'important');
        }
    });
};

document.getElementById("hostLangOut").addEventListener("click", function () {
    let hostLang = document.getElementById("hostLangOut");
    traslateStickListener(hostLang)
});

document.getElementById("hostLangIn").addEventListener("click", function () {
    let hostLang = document.getElementById("hostLangIn");
    traslateStickListener(hostLang)
});

document.getElementById("Hamburger").addEventListener("click", function () {
    if (!menuOpen) {
        document.getElementById("menuItems").classList.add("menuItems")
        document.getElementById("menuItems").classList.remove("hiddenMenItems")
        document.getElementById("menu").classList.add("menuBack")
        menuOpen = true
    } else {
        document.getElementById("menuItems").classList.remove("menuItems")
        document.getElementById("menuItems").classList.add("hiddenMenItems")
        document.getElementById("menu").classList.remove("menuBack")
        menuOpen = false

    }
});

document.getElementById("WasherConsole").addEventListener("click", function () {
    const consoleBox = document.getElementById("LiveLogDisplayBox");
    const console = document.getElementById("live-log");
    const confirmBox = document.getElementById("confirmBox");
    let lastScroll = 0;
    if (!LiveLogsOpen) {
        consoleBox.classList.remove("hiddenValBox")
        consoleBox.classList.add("DefValDisplayBox")
        LiveLogsOpen = true
        DisableItems()
        console.src = console.src;
        document.getElementById("menuItems").classList.remove("menuItems")
        document.getElementById("menuItems").classList.add("hiddenMenItems")
        document.getElementById("menu").classList.remove("menuBack")
        menuOpen = false
        confirmBox.classList.add("hiddenBox");  // Remove hidden class
        confirmBox.classList.remove("infoBox");
        function scrollToBottom() {
            const iframeContenet = console.contentWindow?.document || console.contentDocument;
            if (iframeContenet) {
                const currentScroll = iframeContenet.body.scrollHeight
                if (currentScroll > lastScroll) {
                    console.contentWindow.scrollTo(0, currentScroll)
                    lastScroll = currentScroll
                }
            }
        }
        setInterval(() => {
            scrollToBottom();
        }, 300);
        event.stopPropagation();
    } else {
        consoleBox.classList.add("hiddenValBox")
        consoleBox.classList.remove("DefValDisplayBox")
        LiveLogsOpen = false
        exitConfirmBox()
    }
})

document.getElementById("RefrshConsole").addEventListener("click", function () {
    const console = document.getElementById("live-log");
    console.src = console.src;
});

document.getElementById("CloseConsole").addEventListener("click", function () {
    if (LiveLogsOpen) {
        const consoleBox = document.getElementById("LiveLogDisplayBox");
        consoleBox.classList.add("hiddenValBox")
        consoleBox.classList.remove("DefValDisplayBox")
        LiveLogsOpen = false
        exitConfirmBox()
    }
});

document.getElementById("CloseuserPrefBox").addEventListener("click", function () {
    if (prefboxOpen) {
        document.getElementById("userPrefBox").classList.add("hiddenMain")
        document.getElementById("userPrefBox").classList.remove("userPrefBox")
        prefboxOpen = false;
    }
});

document.getElementById("CloseSavedLogs").addEventListener("click", function () {
    if (lastSaveOpen) {
        document.getElementById("SavedLogsBox").classList.add("hiddenValBox")
        document.getElementById("SavedLogsBox").classList.remove("SavedLogsBox")
        document.getElementById("SavedLogs").innerHTML = "";
        lastSaveOpen = false;
        exitConfirmBox();
    }
});

async function LoadspecificValues(collection, DocR) {
    DisableItems()
    try {
        const DefRef = doc(db, collection, DocR);
        const LoadedFromDb = await getDoc(DefRef);
        const Values = LoadedFromDb.data();
        document.getElementById("appendSpecificValues").addEventListener("click", function () {
            reset(collection, DocR);
            extiDefaultValBox()
            if (DefValAndsLastSaveOpen) {
                setTimeout(() => {
                    document.getElementById("SavedLogsBox").classList.add("hiddenValBox")
                    document.getElementById("SavedLogsBox").classList.remove("SavedLogsBox")
                    document.getElementById("SavedLogs").innerHTML = "";
                    lastSaveOpen = false;
                    exitConfirmBox();
                }, 100);
            }
        });
        let escapeTimeout = setTimeout(function () {
            escapePressedOnce = 0;
        }, 500);
        attributes.forEach(attribute => {
            if (Values.hasOwnProperty(attribute)) {
                document.getElementById(`${attribute}Val`).innerHTML = Values[attribute];
                if (attribute === "preboobotMeteg") {
                    if (Values[attribute] == 1) {
                        document.getElementById(`preboobotMetegVal`).innerHTML = LangFlag == 0 ? "דלוק" : "On";
                    }
                    else if (Values[attribute] == 0) {
                        document.getElementById(`preboobotMetegVal`).innerHTML = LangFlag == 0 ? "כבוי" : "Off";
                    }
                }
                if (attribute === "pressureMeteg") {
                    if (Values[attribute] == 1) {
                        document.getElementById(`pressureMetegVal`).innerHTML = LangFlag == 0 ? "דלוק" : "On";
                    }
                    else if (Values[attribute] == 0) {
                        document.getElementById(`pressureMetegVal`).innerHTML = LangFlag == 0 ? "כבוי" : "Off";
                    }
                }
            }
        });
        document.getElementById('SpecificValuesAutherId').innerHTML = Values['LastUser'];
        let timestamp = Values['Timestamp'];
        let Timestamp = new Date(timestamp.seconds * 1000);
        function formattime(Timestamp) {
            const year = Timestamp.getFullYear();
            const month = String(Timestamp.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const day = String(Timestamp.getDate()).padStart(2, '0');
            const hours = String(Timestamp.getHours()).padStart(2, '0');
            const minutes = String(Timestamp.getMinutes()).padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        }
        const formattedTimestamp = formattime(Timestamp);
        document.getElementById('SpecificValuesTime').innerHTML = formattedTimestamp;
        exitConfirmBox()
    } catch (error) {
        document.getElementById("conirmContent").innerHTML = LangFlag == 0 ? 'תקלה בתקשורת לשרת' : 'Failed to Connect Server'
        document.getElementById("exitConfirm").classList.remove("disabledConfirmBtn");
        document.getElementById("exitConfirm").classList.add("confirmBoxBtn");
        console.error('Error loading initial values:', error);
        let escapeTimeout = setTimeout(function () {
            escapePressedOnce = 0;
        }, 500);
    }
};

document.getElementById("PastSaves").addEventListener("click", function () {
    const confirmBox = document.getElementById("confirmBox");
    const PastSavesBox = document.getElementById("SavedLogsBox")
    if (!lastSaveOpen) {
        PastSavesBox.classList.remove("hiddenValBox")
        PastSavesBox.classList.add("SavedLogsBox")
        lastSaveOpen = true
        DisableItems()
        let dinamicinner = LangFlag === 0 ? 'טוען נתונים מהשרת' : 'Loading Values from Server';
        document.getElementById("conirmContent").innerHTML = dinamicinner + '<img src="assets/pics/loading.png" class="loading" id="loading4">';
        document.getElementById("exitConfirm").innerHTML = LangFlag === 0 ? 'ממתין לשרת' : 'Waiting for Server';
        document.getElementById("exitConfirm").classList.add("disabledConfirmBtn");
        document.getElementById("menuItems").classList.remove("menuItems")
        document.getElementById("menuItems").classList.add("hiddenMenItems")
        document.getElementById("menu").classList.remove("menuBack")
        menuOpen = false
        loadPastSaves()
        event.stopPropagation();
    } else {
        PastSavesBox.classList.add("hiddenValBox")
        PastSavesBox.classList.remove("SavedLogsBox")
        lastSaveOpen = false
        exitConfirmBox()
    }
});

async function loadPastSaves() {
    function formattime(Timestamp) {
        const year = Timestamp.getFullYear();
        const month = String(Timestamp.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(Timestamp.getDate()).padStart(2, '0');
        const hours = String(Timestamp.getHours()).padStart(2, '0');
        const minutes = String(Timestamp.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
    try {
        const collectionRef = collection(db, "Saved-Parameters");
        const snapshot = await getDocs(collectionRef);
        let confirmBox = document.getElementById("confirmBox");
        confirmBox.classList.remove("infoBox");
        confirmBox.classList.add("hiddenBox");
        const collection_Data = [];
        snapshot.forEach(doc => {
            const docData = doc.data();
            let docId = doc.id;
            const printableTime = formattime(new Date(docData.Timestamp.seconds * 1000))
            collection_Data.push({ id: doc.id, data: doc.data() })
            const string1 = LangFlag === 0 ? "פרמטרים אלו עודכנו על ידי:" : "Parameters updated by:";
            const string2 = LangFlag === 0 ? "ב:" : "at:";
            const string3 = LangFlag === 0 ? "תצוגה מקדימה" : "Preview";
            const string4 = LangFlag === 0 ? "טען נתונים למשטף" : "Load values to Washer";
            document.getElementById("SavedLogs").insertAdjacentHTML('beforeend', `
                        <div class="logRow">
                            <div class="translatable">${string1}</div>
                            <div>${docData.LastUser}</div>
                            <div class="translatable">${string2}</div>
                            <div>${printableTime}</div>
                            <div><button class="formBtn translatable" id="${docId}Display">${string3}</button></div>
                            <div class="LoadThisBox"><button class="formBtn translatable LoadThis" id="${docId}Load">${string4}</button></div>
                        </div>`);
            (function (id) {
                document.getElementById(`${id}Display`).addEventListener("click", async function () {
                    showValbox();
                    DefValAndsLastSaveOpen = true;
                    event.stopPropagation();
                    await LoadspecificValues("Saved-Parameters", id);
                });

                document.getElementById(`${id}Load`).addEventListener("click", function () {
                    reset("Saved-Parameters", id);
                    document.getElementById("SavedLogsBox").classList.add("hiddenValBox")
                    document.getElementById("SavedLogsBox").classList.remove("SavedLogsBox")
                    document.getElementById("SavedLogs").innerHTML = "";
                    lastSaveOpen = false;
                });
            })(docId);
        });
    } catch (eror) {
        console.error("Saved Params not Found", eror)
    }
}

document.getElementById("CloseWasherLogs").addEventListener("click", function () {
    if (WasherLogsOpen) {
        document.getElementById("WasherLogsBox").classList.add("hiddenValBox")
        document.getElementById("WasherLogsBox").classList.remove("DefValDisplayBox")
        document.getElementById("WasherLogsWrap").innerHTML = "";
        WasherLogsOpen = false;
        exitConfirmBox();
    }
});

async function loadKWLogs() {
    function formattime(Timestamp) {
        const year = Timestamp.getFullYear();
        const month = String(Timestamp.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(Timestamp.getDate()).padStart(2, '0');
        const hours = String(Timestamp.getHours()).padStart(2, '0');
        const minutes = String(Timestamp.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    }
    function formattimeNoD(Timestamp) {
        const year = Timestamp.getFullYear();
        const month = String(Timestamp.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(Timestamp.getDate()).padStart(2, '0');
        const hours = String(Timestamp.getHours()).padStart(2, '0');
        const minutes = String(Timestamp.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    try {
        const collectionRef = collection(db, "Washer-Logs");
        const snapshot = await getDocs(collectionRef);
        let confirmBox = document.getElementById("confirmBox");
        confirmBox.classList.remove("infoBox");
        confirmBox.classList.add("hiddenBox");
        const collection_Data = [];
        snapshot.forEach(doc => {
            const string1 = LangFlag === 0 ? "תאריך" : "Date";
            const string2 = LangFlag === 0 ? "הודלק ב" : "Turned on";
            const string3 = LangFlag === 0 ? "חביות שנשטפו" : "Kegs Washed";
            const string4 = LangFlag === 0 ? "חביות שחוטאו בלבד" : "Kegs only Sanitized";
            const string5 = LangFlag === 0 ? "חביות שרוקנו בלבד" : "Kegs only Purged";
            const string6 = LangFlag === 0 ? "כובה ב" : "Turned off";
            const docData = doc.data();
            let docId = doc.id;
            const printableTime = formattime(new Date(docData["On"].seconds * 1000))
            collection_Data.push({ id: doc.id, data: doc.data() })
            document.getElementById("WasherLogsWrap").insertAdjacentHTML('beforeend', `
                        <div class="KeglogRow">
                            <div class="translatable LogLabel">${string1}:</div>
                            <div class="LogVal">${printableTime}</div>
                            <div class="translatable LogLabel">${string2}:</div>
                            <div class="LogVal">${docData["On"] ? formattimeNoD(new Date(docData["On"].seconds * 1000)) : " - - -"}</div>
                            <div class="translatable LogLabel">${string3}:</div>
                            <div class="LogVal">${docData["full_cycle"] || 0}</div>
                            <div class="translatable LogLabel">${string4}:</div>
                            <div class="LogVal">${docData["Short_cycle"] || 0}</div>
                            <div class="translatable LogLabel">${string5}:</div>
                            <div class="LogVal">${docData["purge_cycle"] || 0}</div>
                            <div class="translatable LogLabel">${string6}:</div>
                            <div class="LogVal">${docData["off"] ? formattimeNoD(new Date(docData["off"].seconds * 1000)) : " - - -"}</div>
                        </div>`);
        });
    } catch (eror) {
        console.error("KW Logs not Found", eror)
    }
}

document.getElementById("WasherLogs").addEventListener("click", function () {
    const confirmBox = document.getElementById("confirmBox");
    const WasherLogsBox = document.getElementById("WasherLogsBox")
    if (!WasherLogsOpen) {
        WasherLogsBox.classList.remove("hiddenValBox")
        WasherLogsBox.classList.add("DefValDisplayBox")
        WasherLogsOpen = true
        DisableItems()
        let dinamicinner = LangFlag === 0 ? 'טוען נתונים מהשרת' : 'Loading Values from Server';
        document.getElementById("conirmContent").innerHTML = dinamicinner + '<img src="assets/pics/loading.png" class="loading" id="loading4">';
        document.getElementById("exitConfirm").innerHTML = LangFlag === 0 ? 'ממתין לשרת' : 'Waiting for Server';
        document.getElementById("exitConfirm").classList.add("disabledConfirmBtn");
        document.getElementById("menuItems").classList.remove("menuItems")
        document.getElementById("menuItems").classList.add("hiddenMenItems")
        document.getElementById("menu").classList.remove("menuBack")
        menuOpen = false
        loadKWLogs()
        event.stopPropagation();
    } else {
        WasherLogsBox.classList.add("hiddenValBox")
        WasherLogsBox.classList.remove("DefValDisplayBox")
        WasherLogsOpen = false
        exitConfirmBox()
    }
});

function showValbox() {
    document.getElementById("DefValDisplayBox").classList.add("DefValDisplayBox");
    document.getElementById("DefValDisplayBox").classList.remove("hiddenValBox");
    document.getElementById("bodyBox").classList.add("disable_scroll");
    document.getElementById("logout-btn").disabled = true;
    document.getElementById("logout-btn").classList.add("disabledConfirmBtn");
    document.getElementById("userPref").classList.add("functionLabelDisable");
    document.getElementById("Hamburger").classList.add("functionLabelDisable");
    let form = document.getElementById("control-form");
    let formElements = form.elements;
    for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;  // Disable each form element
    }
    let exitBnt = document.getElementById("exitConfirm");
    exitBnt.disabled = false
    LabelList.forEach(function (labelId) {
        let LabelElemnt = form.querySelector(`#${labelId}`);
        if (LabelElemnt) {
            LabelElemnt.classList.add("functionLabelDisable");
        }
    });
    let dinamicinner = LangFlag === 0 ? 'טוען נתונים מהשרת' : 'Loading Values from Server';
    document.getElementById("conirmContent").innerHTML = dinamicinner + '<img src="assets/pics/loading.png" class="loading" id="loading4">';
    document.getElementById("exitConfirm").innerHTML = LangFlag === 0 ? 'ממתין לשרת' : 'Waiting for Server';
    document.getElementById("exitConfirm").classList.add("disabledConfirmBtn");
}

async function showDefaultVals() {
    showValbox()
    await LoadspecificValues("parameters", "Default")
}

function DisableItems() {
    let confirmBox = document.getElementById("confirmBox");
    let body = document.getElementById("bodyBox");
    document.getElementById("CloseDefaultValBox").classList.add("functionLabelDisable")
    document.getElementById("DefValDisplayBox").classList.add("functionLabelDisable")
    document.getElementById("LangIndictor") ? document.getElementById("LangIndictor").classList.add("functionLabelDisable") : "";
    document.getElementById("userPref").classList.add("functionLabelDisable")
    document.getElementById("Hamburger").classList.add("functionLabelDisable")
    confirmBox.classList.remove("hiddenBox");  // Remove hidden class
    confirmBox.classList.add("infoBox");       // Add infoBox class
    body.classList.add("disable_scroll");       // Add infoBox class
    let form = document.getElementById("control-form");
    document.getElementById("topSubmit").classList.add("disabledConfirmBtn");
    document.getElementById("BottomSubmit").classList.add("disabledConfirmBtn");
    let formElements = form.elements;
    for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;  // Disable each form element
    }
    let exitBnt = document.getElementById("exitConfirm");
    exitBnt.disabled = false
    LabelList.forEach(function (labelId) {
        let LabelElemnt = form.querySelector(`#${labelId}`);
        if (LabelElemnt) {
            LabelElemnt.classList.add("functionLabelDisable");
        }
    });
}

function toggleMeteg(MetegId, MetegVal) {
    let FNCTglBtn = document.getElementById(MetegId);
    let TglLangindicator = LangFlag === 0 ? "FNCTglHouseOFF" : "FNCTglHouseOFF-ENG"
    if (MetegVal === 1) {
        FNCTglBtn.classList.remove(TglLangindicator);
        MetegVal = 0;  // Set the state to OFF (0)
    }
    // If the value is 0, toggle to ON (set value to 1)
    else if (MetegVal === 0) {
        FNCTglBtn.classList.add(TglLangindicator);
        MetegVal = 1;  // Set the state to ON (1)
    }

    return MetegVal;  // Return the modified value
    // console.log(preboobotMeteg);
    // console.log(pressureMeteg);
}

document.getElementById("KeepLogs").addEventListener("change", function () {
    const YearsSaved = { "Years-Saved": document.getElementById("KeepLogs").value }
    const YerRef = doc(db, 'users', 'keg-washer');
    updateDoc(YerRef, YearsSaved);
});

async function update() {
    let inner = document.getElementById("conirmContent");
    let dinamicinner = LangFlag === 0 ? 'שולח פרמטרים לשרת' : 'Sending Data to Sever'
    inner.innerHTML = dinamicinner + '<img src="assets/pics/loading.png" class="loading" id="loading5">';
    document.getElementById("exitConfirm").innerHTML = LangFlag === 0 ? 'ממתין לשרת' : 'Waiting for Server';
    document.getElementById("exitConfirm").classList.add("disabledConfirmBtn");
    DisableItems()
    const formData = {};
    formData['LastUser'] = sessionStorage.getItem('LoggedInEmail');
    let Timestamp = new Date();
    formData['Timestamp'] = Timestamp;
    attributes.forEach(attribute => {
        if (attribute === "preboobotMeteg") {
            formData[attribute] = Number(preboobotMeteg);
        }
        else if (attribute === "pressureMeteg") {
            formData[attribute] = Number(pressureMeteg);
        }
        else {
            let inputValue = Number($('#' + attribute).val());
            formData[attribute] = isNaN(inputValue) ? 1 : inputValue;
        }
    });
    try {
        const year = Timestamp.getFullYear();
        const month = String(Timestamp.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(Timestamp.getDate()).padStart(2, '0');
        const hours = String(Timestamp.getHours()).padStart(2, '0');
        const minutes = String(Timestamp.getMinutes()).padStart(2, '0');
        const formattedTimestamp = `${day}/${month}/${year} ${hours}:${minutes}`;
        const stringedTimestamp = Timestamp.toISOString();
        await updateDoc(docRef, formData);
        const LogDoc = doc(db, 'Saved-Parameters', stringedTimestamp);
        await setDoc(LogDoc, formData);
        inner.innerHTML = LangFlag === 0 ? 'פרמטרים נשמרו בשרת' : 'Parameters Saved on server';
        document.getElementById("exitConfirm").innerHTML = LangFlag === 0 ? 'סגור' : 'Close';
        DisableItems()
        setTimeout(() => {
            exitConfirmBox()
        }, 750);
        document.getElementById('LastUser').innerHTML = formData['LastUser'];
        document.getElementById('Timestamp').innerHTML = formattedTimestamp;
    } catch (error) {
        let inner = document.getElementById("conirmContent")
        console.error('Error:', error);
        inner.innerHTML = LangFlag === 0 ? 'תקלה בתקשורת לשרת' : 'Comuinication eror with server';
        document.getElementById("exitConfirm").classList.remove("disabledConfirmBtn");
        document.getElementById("exitConfirm").classList.remove("confirmBoxBtnHidden");
        document.getElementById("Resend").classList.remove("confirmBoxBtnHidden");
        document.getElementById("Resend").classList.add("confirmBoxBtn");
        DisableItems()
    };
}

async function reset(collection, DocR) {
    let inner = document.getElementById("conirmContent");
    let dinamicinner = LangFlag === 0 ? 'טוען נתוני ברירת מחדל מהשרת' : 'Loading Default Values from Server';
    inner.innerHTML = dinamicinner + '<img src="assets/pics/loading.png" class="loading" id="loading4">';
    document.getElementById("exitConfirm").innerHTML = LangFlag === 0 ? 'ממתין לשרת' : 'Waiting for Server';
    document.getElementById("exitConfirm").classList.add("disabledConfirmBtn");
    DisableItems()
    try {
        const DefRef = doc(db, collection, DocR);
        const LoadedFromDb = await getDoc(DefRef);
        const Default_values = LoadedFromDb.data();
        let escapeTimeout = setTimeout(function () {
            escapePressedOnce = 0;
        }, 500);
        DisableItems()
        // Populate form fields with initial values
        attributes.forEach(attribute => {
            // Check if the attribute exists in the response object
            if (Default_values.hasOwnProperty(attribute)) {
                // Set the value of the form field using jQuery
                $('#' + attribute).val(Default_values[attribute]);

                let StartMetegId1 = 0;
                let StartMetegId = 0;
                if (attribute === "preboobotMeteg") {
                    // console.log(attribute+":"+Default_values[attribute])
                    StartMetegId = "PrebootToggleHousing";
                    if (Default_values[attribute] == 1) {
                        preboobotMeteg = 1;
                        preboobotMeteg = toggleMeteg(StartMetegId, preboobotMeteg, preboobotMeteg);
                        // console.log("preboot should be on")
                    }
                    else if (Default_values[attribute] == 0) {
                        preboobotMeteg = 0;
                        preboobotMeteg = toggleMeteg(StartMetegId, preboobotMeteg, preboobotMeteg);
                        // console.log("preboot should be off")
                    }
                    if (preboobotMeteg == 0) {
                        preboobotMeteg = 1;
                    } else { preboobotMeteg = 0 }

                }
                if (attribute === "pressureMeteg") {
                    // console.log(attribute+":"+Default_values[attribute])
                    StartMetegId1 = "PressureToggleHousing";
                    if (Default_values[attribute] == 1) {
                        pressureMeteg = 1;
                        pressureMeteg = toggleMeteg(StartMetegId1, pressureMeteg, pressureMeteg);
                        // console.log("pressure should be on")
                    }
                    else if (Default_values[attribute] == 0) {
                        pressureMeteg = 0;
                        pressureMeteg = toggleMeteg(StartMetegId1, pressureMeteg, pressureMeteg);
                        // console.log("pressure should be on")
                    }
                    if (pressureMeteg == 0) {
                        pressureMeteg = 1;
                    } else (pressureMeteg = 0)
                }
            }
        });
        document.getElementById('LastUser').innerHTML = Default_values['LastUser'];
        let timestamp = Default_values['Timestamp'];
        let Timestamp = new Date(timestamp.seconds * 1000);
        function formattime(Timestamp) {
            const year = Timestamp.getFullYear();
            const month = String(Timestamp.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const day = String(Timestamp.getDate()).padStart(2, '0');
            const hours = String(Timestamp.getHours()).padStart(2, '0');
            const minutes = String(Timestamp.getMinutes()).padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        }
        const formattedTimestamp = formattime(Timestamp);
        document.getElementById('Timestamp').innerHTML = formattedTimestamp;
        await updateDoc(docRef, Default_values);
        const updateTime = new Date();
        const stringedTimestamp = updateTime.toISOString();
        Default_values['Timestamp'] = updateTime;
        if (Default_values['LastUser'] == "KegWasher@machine.co.il") {
            Default_values['LastUser'] = `${sessionStorage.getItem('LoggedInEmail')} ~DefVal`
        }
        const LogDoc = doc(db, 'Saved-Parameters', stringedTimestamp);
        if (collection != "Saved-Parameters") {
            await setDoc(LogDoc, Default_values);
        }
        let inner = document.getElementById("conirmContent");
        inner.innerHTML = LangFlag == 0 ? ' הנתונים עודכנו' : 'Values Updated';
        document.getElementById("exitConfirm").innerHTML = LangFlag == 0 ? 'סגור' : 'Close';
        setTimeout(() => {
            exitConfirmBox()
        }, 750);
    } catch (error) {
        DisableItems()
        let inner = document.getElementById("conirmContent");
        inner.innerHTML = LangFlag == 0 ? 'תקלה בתקשורת לשרת' : 'Failed to Connect Server'
        document.getElementById("exitConfirm").classList.remove("disabledConfirmBtn");
        document.getElementById("exitConfirm").classList.add("confirmBoxBtnHidden");
        document.getElementById("Reset").classList.remove("confirmBoxBtnHidden")
        document.getElementById("Reset").classList.add("confirmBoxBtn")
        console.error('Error loading initial values:', error);
        let escapeTimeout = setTimeout(function () {
            escapePressedOnce = 0;
        }, 500);
    }
};

document.getElementById("aproveWarning").addEventListener("click", async function () {
    let confirmBox = document.getElementById("confirmBox");
    confirmBox.classList.remove("hiddenBox");  // Remove hidden class
    confirmBox.classList.add("infoBox");
    document.getElementById("wariningBox").classList.remove("wariningBox")
    document.getElementById("wariningBox").classList.add("hiddenMain")
    document.getElementById("WarningMesseage").innerHTML = "";
    await update()
    exitConfirmBox();
});

document.getElementById("CloseWarning").addEventListener("click", function () {
    exitConfirmBox();
    document.getElementById("wariningBox").classList.remove("wariningBox")
    document.getElementById("wariningBox").classList.add("hiddenMain")
    document.getElementById("WarningMesseage").innerHTML = "";
});

document.getElementById("userPref").addEventListener("click", function (event) {
    if (!prefboxOpen) {
        document.getElementById("userPrefBox").classList.remove("hiddenMain")
        document.getElementById("userPrefBox").classList.add("userPrefBox")
        prefboxOpen = true;
    } else {
        document.getElementById("userPrefBox").classList.add("hiddenMain")
        document.getElementById("userPrefBox").classList.remove("userPrefBox")
        prefboxOpen = false;
    }
    event.stopPropagation();
});

document.getElementById("PrebootToggleHousing").addEventListener("click", function (event) {
    const customToken = sessionStorage.getItem('customToken');
    if (!customToken) {
        let inner = document.getElementById("conirmContent");
        let dinamicinner2 = LangFlag === 0 ? 'משתמש אינו מחובר/אינו מורשה' : 'User unauthorized/ unauthenticated';
        inner.innerHTML = dinamicinner2;
        document.getElementById("exitConfirm").innerHTML=LangFlag === 0 ? 'סגור' : 'Close';
        document.getElementById("exitConfirm").classList.remove("disabledConfirmBtn");
        document.getElementById("RelogIn").classList.remove("confirmBoxBtnHidden")
        document.getElementById("RelogIn").classList.add("confirmBoxBtn")
        DisableItems()
    } else {
        DisableItems()
        let confirmBox = document.getElementById("confirmBox");
        confirmBox.classList.add("hiddenBox");  // Remove hidden class
        confirmBox.classList.remove("infoBox");
        preboobotMeteg = toggleMeteg("PrebootToggleHousing", preboobotMeteg);
        toggleMeteg("PrebootToggleHousing", preboobotMeteg);
        document.getElementById("wariningBox").classList.remove("hiddenMain")
        document.getElementById("wariningBox").classList.add("wariningBox")
        document.getElementById("WarningMesseage").innerHTML = LangFlag == 0 ? 'סייקל בדיקה ראשוני ישתנה רק לאחר שמירת פרמטרים <br>לחיצה על "שמור פרמטים" ישמור את כל הפרמטרים מהדף!' : 'Initial test cycle will be changed only after saving parameters<br> clicking "Save Parameters" will save all parametrs on page!';
        event.stopPropagation();
    }
});

document.getElementById("PressureToggleHousing").addEventListener("click", function (event) {
    const customToken = sessionStorage.getItem('customToken');
    if (!customToken) {
        let inner = document.getElementById("conirmContent");
        let dinamicinner2 = LangFlag === 0 ? 'משתמש אינו מחובר/אינו מורשה' : 'User unauthorized/ unauthenticated';
        document.getElementById("exitConfirm").innerHTML=LangFlag === 0 ? 'סגור' : 'Close';
        inner.innerHTML = dinamicinner2;
        document.getElementById("exitConfirm").classList.remove("disabledConfirmBtn");
        document.getElementById("RelogIn").classList.remove("confirmBoxBtnHidden")
        document.getElementById("RelogIn").classList.add("confirmBoxBtn")
        DisableItems()
    } else {
        let confirmBox = document.getElementById("confirmBox");
        confirmBox.classList.add("hiddenBox");  // Remove hidden class
        confirmBox.classList.remove("infoBox");
        pressureMeteg = toggleMeteg("PressureToggleHousing", pressureMeteg);
        toggleMeteg("PressureToggleHousing", pressureMeteg);
        document.getElementById("wariningBox").classList.remove("hiddenMain")
        document.getElementById("wariningBox").classList.add("wariningBox")
        document.getElementById("WarningMesseage").innerHTML = LangFlag == 0 ? 'חיישני לחץ ישתנו רק לאחר שמירת פרמטרים <br>לחיצה על "שמור פרמטים" ישמור את כל הפרמטרים מהדף!' : 'Pressure Sensors will be changed only after saving parameters<br> clicking "Save Parameters" will save all parametrs on page!';
        event.stopPropagation();
    }
});

document.getElementById("DefaultLanguageHousing").addEventListener("click", function (event) {
    const customToken = sessionStorage.getItem('customToken');
    if (!customToken) {
        let inner = document.getElementById("conirmContent");
        let dinamicinner2 = LangFlag === 0 ? 'משתמש אינו מחובר/אינו מורשה' : 'User unauthorized/ unauthenticated';
        inner.innerHTML = dinamicinner2;
        document.getElementById("exitConfirm").innerHTML=LangFlag === 0 ? 'סגור' : 'Close';
        document.getElementById("RelogIn").classList.remove("confirmBoxBtnHidden")
        document.getElementById("RelogIn").classList.add("confirmBoxBtn")
        DisableItems()
    } else {
        let LoggedInEmail = sessionStorage.getItem('LoggedInEmail');
        const userConectTime = doc(db, 'users', LoggedInEmail);
        let hostLang = document.getElementById("hostLangIn");
        traslateStickListener(hostLang)
        let userLang = {
            "lang-flag": LangFlag
        }
        updateDoc(userConectTime, userLang);
        let LanngMeteg = document.getElementById("DefaultLanguageBtn");
        if (LangFlag === 0) {
            LanngMeteg.classList.add("LangMetgHebrew")
            LanngMeteg.classList.remove("LangMetgEng")
        } else if (LangFlag === 1) {
            LanngMeteg.classList.remove("LangMetgHebrew")
            LanngMeteg.classList.add("LangMetgEng")
        }
        event.stopPropagation();
    }
});

document.getElementById("Reload").addEventListener("click", function (evet) {
    loadPage();
});

document.getElementById("Resend").addEventListener("click", function (evet) {
    const customToken = sessionStorage.getItem('customToken');
    if (!customToken) {
        let inner = document.getElementById("conirmContent");
        let dinamicinner2 = LangFlag === 0 ? 'משתמש אינו מחובר/אינו מורשה' : 'User unauthorized/ unauthenticated';
        inner.innerHTML = dinamicinner2;
        document.getElementById("exitConfirm").innerHTML=LangFlag === 0 ? 'סגור' : 'Close';
        document.getElementById("RelogIn").classList.remove("confirmBoxBtnHidden")
        document.getElementById("RelogIn").classList.add("confirmBoxBtn")
        DisableItems()
    } else {
        document.getElementById("exitConfirm").classList.remove("confirmBoxBtnHidden");
        document.getElementById("Resend").classList.add("confirmBoxBtnHidden")
        document.getElementById("Resend").classList.remove("confirmBoxBtn")
        update();
    }
});

document.getElementById("Reset").addEventListener("click", function (evet) {
    const customToken = sessionStorage.getItem('customToken');
    if (!customToken) {
        let inner = document.getElementById("conirmContent");
        let dinamicinner2 = LangFlag === 0 ? 'משתמש אינו מחובר/אינו מורשה' : 'User unauthorized/ unauthenticated';
        inner.innerHTML = dinamicinner2;
        document.getElementById("exitConfirm").innerHTML=LangFlag === 0 ? 'סגור' : 'Close';
        document.getElementById("exitConfirm").classList.remove("disabledConfirmBtn");
        document.getElementById("RelogIn").classList.add("confirmBoxBtn")
        DisableItems()
    } else {
        document.getElementById("exitConfirm").classList.remove("confirmBoxBtnHidden");
        document.getElementById("Reset").classList.add("confirmBoxBtnHidden")
        document.getElementById("Reset").classList.remove("confirmBoxBtn")
        reset("parameters", "Default");;
    }
});

document.getElementById("RelogIn").addEventListener("click", function (evet) {
    document.getElementById("contenet").classList.remove("ShownMain");
    document.getElementById("contenet").classList.add("hiddenMain");
    document.getElementById("login-container").classList.remove("hiddenMain");
    document.getElementById("username-display").innerText = '';
    document.getElementById("LangIndictor").classList.add("initial_lang_location");
});

async function readKegWasherConnect() {
    const washerConectTime = doc(db, 'users', 'keg-washer');
    let keepPolling = true
    while (keepPolling) {
        try {
            const kegWaherDoc = await getDoc(washerConectTime);
            const washerLastConnect = kegWaherDoc.data()["last-connection"];
            const YearsToSave = +kegWaherDoc.data()["Years-Saved"];
            let Timestamp = new Date(washerLastConnect.seconds * 1000);
            const year = Timestamp.getFullYear();
            const month = String(Timestamp.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const day = String(Timestamp.getDate()).padStart(2, '0');
            const hours = String(Timestamp.getHours()).padStart(2, '0');
            const minutes = String(Timestamp.getMinutes()).padStart(2, '0');
            const formattedTimestamp = `${day}/${month}/${year} ${hours}:${minutes}`;
            document.getElementById('KegWasherLastConnected').innerHTML = formattedTimestamp;
            document.getElementById('KeepLogs').value = YearsToSave;

        } catch (eror) {
            console.log("error getting washerLastConnect", eror)
        }
        await new Promise((resolve) => setTimeout(resolve, 5000));
    }
}

function convertTime(time) {
    let Timestamp = new Date(time.seconds * 1000);
    const year = Timestamp.getFullYear();
    const month = String(Timestamp.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(Timestamp.getDate()).padStart(2, '0');
    const hours = String(Timestamp.getHours()).padStart(2, '0');
    const minutes = String(Timestamp.getMinutes()).padStart(2, '0');
    const formattedTimestamp = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedTimestamp;
}

async function loadPage() {
    let inner = document.getElementById("conirmContent");
    let dinamicinner = LangFlag == 0 ? 'התחברת בהצלחה!<br>טוען פרמטרים מהשרת' : 'Sucssesfuly Logged In<br>Loading Data from Server';
    inner.innerHTML = dinamicinner + '<img src="assets/pics/loading.png" class="loading" id="loading0">';
    document.getElementById("exitConfirm").innerHTML = LangFlag == 0 ? 'ממתין לשרת' : 'Waiting for Server';
    document.getElementById("exitConfirm").classList.add("disabledConfirmBtn");
    document.getElementById("LangIndictor") ? document.getElementById("LangIndictor").classList.remove("initial_lang_location") : "";
    DisableItems();
    try {
        readKegWasherConnect()
        let LoggedInEmail = sessionStorage.getItem('LoggedInEmail');
        document.getElementById("username-display").innerText = LoggedInEmail;
        const userConectTime = doc(db, 'users', LoggedInEmail);
        const UserDoc = await getDoc(userConectTime);
        const UserLastConnect = convertTime(UserDoc.data()["last-connection"]);
        const userPrefLang = UserDoc.data()["lang-flag"]
        LangFlag = userPrefLang === 0 ? 1 : 0;
        let hostLang = document.getElementById("hostLangIn");
        traslateStickListener(hostLang)
        const UserCurrentConnect = new Date()
        const userlogs = {
            "last-connection": UserCurrentConnect,
            "Current-connection": UserCurrentConnect
        }
        await updateDoc(userConectTime, userlogs);
        let LanngMeteg = document.getElementById("DefaultLanguageBtn");
        if (LangFlag === 0) {
            LanngMeteg.classList.add("LangMetgHebrew")
            LanngMeteg.classList.remove("LangMetgEng")
        } else if (LangFlag === 1) {
            LanngMeteg.classList.remove("LangMetgHebrew")
            LanngMeteg.classList.add("LangMetgEng")
        }
        document.getElementById('LastLogin').innerHTML = UserLastConnect;
        const LoadedFromDb = await getDoc(docRef);
        const initial_values = LoadedFromDb.data();
        let escapeTimeout = setTimeout(function () {
            escapePressedOnce = 0;
        }, 500);
        DisableItems()
        let inner = document.getElementById("conirmContent");
        inner.innerHTML = LangFlag == 0 ? 'פרמטרים נטענו בהצלחה מהשרת!' : 'Sucsessfuly Loaded Data from Server';
        document.getElementById("exitConfirm").innerHTML = LangFlag == 0 ? 'סגור' : 'close';
        setTimeout(() => {
            exitConfirmBox()
        }, 750);
        // Populate form fields with initial values
        attributes.forEach(attribute => {
            // Check if the attribute exists in the response object
            if (initial_values.hasOwnProperty(attribute)) {
                // Set the value of the form field using jQuery
                $('#' + attribute).val(initial_values[attribute]);

                let StartMetegId1 = 0;
                let StartMetegId = 0;
                if (attribute === "preboobotMeteg") {
                    // console.log(attribute+":"+initial_values[attribute])
                    StartMetegId = "PrebootToggleHousing";
                    if (initial_values[attribute] == 1) {
                        preboobotMeteg = 1;
                        preboobotMeteg = toggleMeteg(StartMetegId, preboobotMeteg, preboobotMeteg);
                        // console.log("preboot should be on")
                    }
                    else if (initial_values[attribute] == 0) {
                        preboobotMeteg = 0;
                        preboobotMeteg = toggleMeteg(StartMetegId, preboobotMeteg, preboobotMeteg);
                        // console.log("preboot should be off")
                    }
                    if (preboobotMeteg == 0) {
                        preboobotMeteg = 1;
                    } else { preboobotMeteg = 0 }

                }
                if (attribute === "pressureMeteg") {
                    // console.log(attribute+":"+initial_values[attribute])
                    StartMetegId1 = "PressureToggleHousing";
                    if (initial_values[attribute] == 1) {
                        pressureMeteg = 1;
                        pressureMeteg = toggleMeteg(StartMetegId1, pressureMeteg, pressureMeteg);
                        // console.log("pressure should be on")
                    }
                    else if (initial_values[attribute] == 0) {
                        pressureMeteg = 0;
                        pressureMeteg = toggleMeteg(StartMetegId1, pressureMeteg, pressureMeteg);
                        // console.log("pressure should be on")
                    }
                    if (pressureMeteg == 0) {
                        pressureMeteg = 1;
                    } else (pressureMeteg = 0)
                }
            }
        });
        document.getElementById('LastUser').innerHTML = initial_values['LastUser'];
        let timestamp = initial_values['Timestamp'];
        let Timestamp = new Date(timestamp.seconds * 1000);
        const year = Timestamp.getFullYear();
        const month = String(Timestamp.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(Timestamp.getDate()).padStart(2, '0');
        const hours = String(Timestamp.getHours()).padStart(2, '0');
        const minutes = String(Timestamp.getMinutes()).padStart(2, '0');
        const formattedTimestamp = `${day}/${month}/${year} ${hours}:${minutes}`;
        document.getElementById('Timestamp').innerHTML = formattedTimestamp;
    } catch (error) {
        DisableItems()
        let inner = document.getElementById("conirmContent");
        inner.innerHTML = LangFlag == 0 ? 'תקלה בתקשורת לשרת' : 'Failed to Connect Server'
        document.getElementById("exitConfirm").classList.remove("disabledConfirmBtn");
        document.getElementById("exitConfirm").classList.remove("confirmBoxBtnHidden");
        document.getElementById("Reload").classList.remove("confirmBoxBtnHidden")
        document.getElementById("Reload").classList.add("confirmBoxBtn")
        console.error('Error loading initial values:', error);
        let escapeTimeout = setTimeout(function () {
            escapePressedOnce = 0;
        }, 500);
    }
};

function extiDefaultValBox() {
    document.getElementById("DefValDisplayBox").classList.remove("DefValDisplayBox");
    document.getElementById("DefValDisplayBox").classList.add("hiddenValBox");
    document.getElementById("logout-btn").disabled = false;
    document.getElementById("logout-btn").classList.remove("disabledConfirmBtn");
    document.getElementById("userPref").classList.remove("functionLabelDisable");
    document.getElementById("Hamburger").classList.remove("functionLabelDisable")
    event.preventDefault();  // Prevents form submission (and reload)
    let body = document.getElementById("bodyBox");
    body.classList.remove("disable_scroll");
    let form = document.getElementById("control-form");
    let formElements = form.elements;
    for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = false;  // Disable each form element
    }
    disabledInputs.forEach(function (inputId) {
        let inputElement = form.querySelector(`#${inputId}`);
        if (inputElement) {
            inputElement.disabled = true;
        }
    });
    LabelList.forEach(function (labelId) {
        let LabelElemnt = form.querySelector(`#${labelId}`);
        if (LabelElemnt) {
            LabelElemnt.classList.remove("functionLabelDisable");
        }
    });
}

function exitConfirmBox() {
    let confirmBox = document.getElementById("confirmBox");
    confirmBox.classList.remove("infoBox");    // Remove infoBox class
    confirmBox.classList.add("hiddenBox");      // Add hiddenBox class
    document.getElementById("exitConfirm").classList.remove("confirmBoxBtnHidden");
    document.getElementById("Resend").classList.add("confirmBoxBtnHidden");
    document.getElementById("Reload").classList.add("confirmBoxBtnHidden");
    document.getElementById("Hamburger").classList.remove("functionLabelDisable")
    document.getElementById("Reset").classList.add("confirmBoxBtnHidden");
    document.getElementById("LangIndictor").classList.remove("functionLabelDisable")
    document.getElementById("CloseDefaultValBox").classList.remove("functionLabelDisable")
    document.getElementById("DefValDisplayBox").classList.remove("functionLabelDisable")
    document.getElementById("topSubmit").classList.remove("disabledConfirmBtn");
    document.getElementById("logout-btn").classList.remove("disabledConfirmBtn");
    document.getElementById("BottomSubmit").classList.remove("disabledConfirmBtn");
    document.getElementById("userPref").classList.remove("functionLabelDisable");
    if (document.getElementById("DefValDisplayBox").classList.contains("DefValDisplayBox") == false) {
        let body = document.getElementById("bodyBox");
        body.classList.remove("disable_scroll");
        let form = document.getElementById("control-form");
        let formElements = form.elements;
        for (let i = 0; i < formElements.length; i++) {
            formElements[i].disabled = false;  // Disable each form element
        }
        disabledInputs.forEach(function (inputId) {
            let inputElement = form.querySelector(`#${inputId}`);
            if (inputElement) {
                inputElement.disabled = true;
            }
        });
        LabelList.forEach(function (labelId) {
            let LabelElemnt = form.querySelector(`#${labelId}`);
            if (LabelElemnt) {
                LabelElemnt.classList.remove("functionLabelDisable");
            }
        });
    }
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 27
        && document.getElementById("DefValDisplayBox").classList.contains("DefValDisplayBox")
        && document.getElementById("confirmBox").classList.contains("infoBox") == false) {  // Check if the key is 'Escape'
        extiDefaultValBox();
        if (DefValAndsLastSaveOpen) {
            setTimeout(() => {
                DefValAndsLastSaveOpen = false;
            }, 500);
        }
        event.stopPropagation();
    }
    if (event.keyCode === 27 && document.getElementById("wariningBox").classList.contains("wariningBox")
        && document.getElementById("confirmBox").classList.contains("infoBox") == false) {
        exitConfirmBox();
        document.getElementById("wariningBox").classList.remove("wariningBox")
        document.getElementById("wariningBox").classList.add("hiddenMain")
        document.getElementById("WarningMesseage").innerHTML = "";
    }
    if (event.keyCode === 27 && document.getElementById("userPrefBox").classList.contains("userPrefBox")
        && document.getElementById("confirmBox").classList.contains("infoBox") == false && !document.getElementById("resetPasswordBox").classList.contains("resetPasswordBox")) {
        document.getElementById("userPrefBox").classList.add("hiddenMain")
        document.getElementById("userPrefBox").classList.remove("userPrefBox")
        prefboxOpen = false;
    }
    if (event.keyCode === 27 && document.getElementById("resetPasswordBox").classList.contains("resetPasswordBox")
        && document.getElementById("confirmBox").classList.contains("infoBox") == false && resetPassBoxOpen === true) {
        document.getElementById("resetPasswordBox").classList.add("hiddenMain")
        resetPassBoxOpen = false;
        exitConfirmBox();
    }
    const consoleBox = document.getElementById("LiveLogDisplayBox");
    if (event.keyCode === 27 && consoleBox.classList.contains("DefValDisplayBox")
        && document.getElementById("confirmBox").classList.contains("infoBox") == false && LiveLogsOpen === true) {
        consoleBox.classList.add("hiddenValBox")
        LiveLogsOpen = false
        exitConfirmBox()
    }
    const WasherLogsBox = document.getElementById("WasherLogsBox");
    if (event.keyCode === 27 && WasherLogsBox.classList.contains("DefValDisplayBox")
        && document.getElementById("confirmBox").classList.contains("infoBox") == false && WasherLogsOpen === true) {
        WasherLogsBox.classList.add("hiddenValBox")
        document.getElementById("WasherLogsWrap").innerHTML = "";
        WasherLogsOpen = false
        exitConfirmBox()
    }
    const SavedLogsBox = document.getElementById("SavedLogsBox");
    if (event.keyCode === 27 && SavedLogsBox.classList.contains("SavedLogsBox")
        && document.getElementById("confirmBox").classList.contains("infoBox") == false && lastSaveOpen === true
        && document.getElementById("DefValDisplayBox").classList.contains("hiddenValBox") == true && DefValAndsLastSaveOpen === false) {
        SavedLogsBox.classList.add("hiddenValBox")
        lastSaveOpen = false
        document.getElementById("SavedLogs").innerHTML = "";
        exitConfirmBox()
    }
});

document.addEventListener("click", (event) => {
    const wariningBox = document.getElementById('wariningBox'); // Replace with your warning box ID
    if (wariningBox && !wariningBox.contains(event.target) && wariningBox.classList.contains("wariningBox")) {
        exitConfirmBox();
        document.getElementById("wariningBox").classList.remove("wariningBox")
        document.getElementById("wariningBox").classList.add("hiddenMain")
        document.getElementById("WarningMesseage").innerHTML = "";
    };
    if (!document.getElementById("userPrefBox").contains(event.target) && document.getElementById("userPrefBox").classList.contains("userPrefBox")
        && document.getElementById("confirmBox").classList.contains("infoBox") == false && !document.getElementById("resetPasswordBox").classList.contains("resetPasswordBox")) {
        document.getElementById("userPrefBox").classList.add("hiddenMain")
        document.getElementById("userPrefBox").classList.remove("userPrefBox")
        prefboxOpen = false;
    }
    if (!document.getElementById("resetPasswordBox").contains(event.target) && document.getElementById("resetPasswordBox").classList.contains("resetPasswordBox")
        && document.getElementById("confirmBox").classList.contains("infoBox") == false && resetPassBoxOpen === true) {
        document.getElementById("resetPasswordBox").classList.add("hiddenMain")
        document.getElementById("resetPasswordBox").classList.remove("resetPasswordBox")
        resetPassBoxOpen = false;
        exitConfirmBox();
    }
    if (!document.getElementById("LiveLogDisplayBox").contains(event.target) && document.getElementById("LiveLogDisplayBox").classList.contains("DefValDisplayBox")
        && document.getElementById("confirmBox").classList.contains("infoBox") == false && LiveLogsOpen === true) {
        document.getElementById("LiveLogDisplayBox").classList.add("hiddenValBox")
        document.getElementById("LiveLogDisplayBox").classList.remove("DefValDisplayBox")
        LiveLogsOpen = false;
        exitConfirmBox();
    }
    const SavedLogsBox = document.getElementById("SavedLogsBox");
    if (!SavedLogsBox.contains(event.target) && SavedLogsBox.classList.contains("SavedLogsBox")
        && document.getElementById("confirmBox").classList.contains("infoBox") == false && lastSaveOpen === true
        && document.getElementById("DefValDisplayBox").classList.contains("hiddenValBox") && DefValAndsLastSaveOpen === false) {
        SavedLogsBox.classList.add("hiddenValBox")
        document.getElementById("SavedLogs").innerHTML = "";
        lastSaveOpen = false
        exitConfirmBox()
    }
    const DefValDisplayBox = document.getElementById('DefValDisplayBox'); // Replace with your warning box ID
    if (DefValDisplayBox && !DefValDisplayBox.contains(event.target) && DefValDisplayBox.classList.contains("DefValDisplayBox")) {
        extiDefaultValBox()
        if (DefValAndsLastSaveOpen) {
            setTimeout(() => {
                DefValAndsLastSaveOpen = false;
            }, 500);
        }
        event.stopPropagation();
    };
    const WasherLogsBox = document.getElementById("WasherLogsBox");
    if (!WasherLogsBox.contains(event.target) && WasherLogsBox.classList.contains("DefValDisplayBox")
        && document.getElementById("confirmBox").classList.contains("infoBox") == false && WasherLogsOpen === true) {
        WasherLogsBox.classList.add("hiddenValBox")
        document.getElementById("WasherLogsWrap").innerHTML = "";
        WasherLogsOpen = false
        exitConfirmBox()
    }
});

document.getElementById("exitConfirm").addEventListener("click", function (event) {
    exitConfirmBox();
});

document.getElementById("CloseDefaultValBox").addEventListener("click", function (event) {
    extiDefaultValBox();
});

document.getElementById("showDefaultsTop").addEventListener("click", function (event) {
    document.getElementById("menuItems").classList.remove("menuItems")
    document.getElementById("menuItems").classList.add("hiddenMenItems")
    document.getElementById("menu").classList.remove("menuBack")
    menuOpen = false
    showDefaultVals();
    event.stopPropagation();
});

document.getElementById("showDefaults").addEventListener("click", function (event) {
    showDefaultVals();
    event.stopPropagation();
});

document.getElementById("DownloadPdfTop").addEventListener("click", async function (event) {
    const targetDiv = document.getElementById('DefValDisplayBox');
    DisableItems();
    let inner = document.getElementById("conirmContent");
    let dinamicinner = LangFlag === 0 ? 'מוריד קובץ PDF' : 'Downloading PDF'
    inner.innerHTML = dinamicinner + '<img src="assets/pics/loading.png" class="loading" id="loading5">';
    async function savePdf(generatedPdf) {
        return new Promise((resolve, reject) => {
            try {
                generatedPdf.save('Keg_Washer_Parameters.pdf', { returnPromise: true }).then(() => {
                    resolve(true);
                });
            } catch (error) {
                reject(false);
            }
        });
    }

    // Adjust styles for printing
    targetDiv.classList.remove("DefValDisplayBox");
    targetDiv.classList.add("PrintDefVal");

    const canvas = await html2canvas(targetDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true
    });

    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    const pdfWidth = 210; // A4 page width in mm
    const pdfHeight = 297; // A4 page height in mm
    const marginLeft = 5; // Left margin in mm
    const marginTop = 5; // Top margin in mm
    const contentWidth = pdfWidth - marginLeft * 2; // Content width after margins
    const contentHeight = pdfHeight - marginTop * 2; // Content height after margins
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = contentWidth / canvasWidth;
    const scaledCanvasHeight = canvasHeight * ratio;
    const totalPages = Math.ceil(scaledCanvasHeight / contentHeight);

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        const cropStartY = pageIndex * (contentHeight / ratio);
        const cropEndY = Math.min(cropStartY + (contentHeight / ratio), canvasHeight);
        const croppedCanvasHeight = cropEndY - cropStartY;
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvasWidth;
        tempCanvas.height = croppedCanvasHeight;

        const tempContext = tempCanvas.getContext('2d');
        tempContext.drawImage(canvas, 0, -cropStartY);

        const croppedImgData = tempCanvas.toDataURL('image/png');

        if (pageIndex > 0) {
            pdf.addPage();
        }

        const finalHeight = (pageIndex === totalPages - 1) ? croppedCanvasHeight * ratio : contentHeight;
        pdf.addImage(croppedImgData, 'PNG', marginLeft, marginTop, contentWidth, finalHeight);
    }

    // Save the PDF and log the result
    let printed = await savePdf(pdf);
    console.log(printed);
    dinamicinner = LangFlag === 0 ? 'שולח פרמטרים לשרת' : 'Sending Data to Sever'
    inner.innerHTML = dinamicinner + '<img src="assets/pics/loading.png" class="loading" id="loading5">';
    exitConfirmBox();
    targetDiv.classList.add("DefValDisplayBox");
    targetDiv.classList.remove("PrintDefVal");
});

document.getElementById('control-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the default form submission
    const customToken = sessionStorage.getItem('customToken');
    if (!customToken) {
        let inner = document.getElementById("conirmContent");
        let dinamicinner2 = LangFlag === 0 ? 'משתמש אינו מחובר/אינו מורשה' : 'User unauthorized/ unauthenticated';
        document.getElementById("exitConfirm").innerHTML=LangFlag === 0 ? 'סגור' : 'Close';
        inner.innerHTML = dinamicinner2;
        document.getElementById("exitConfirm").classList.remove("disabledConfirmBtn");
        document.getElementById("RelogIn").classList.remove("confirmBoxBtnHidden")
        document.getElementById("RelogIn").classList.add("confirmBoxBtn")
        DisableItems()
    } else {
        await update()
    }
});

document.getElementById('reset-btn').addEventListener('click', function () {
    const customToken = sessionStorage.getItem('customToken');
    if (!customToken) {
        let inner = document.getElementById("conirmContent");
        let dinamicinner2 = LangFlag === 0 ? 'משתמש אינו מחובר/אינו מורשה' : 'User unauthorized/ unauthenticated';
        document.getElementById("exitConfirm").innerHTML=LangFlag === 0 ? 'סגור' : 'Close';
        inner.innerHTML = dinamicinner2;
        document.getElementById("exitConfirm").classList.remove("disabledConfirmBtn");
        document.getElementById("RelogIn").classList.remove("confirmBoxBtnHidden")
        document.getElementById("RelogIn").classList.add("confirmBoxBtn")
        DisableItems()
    } else {
        reset("parameters", "Default");
    }
});

document.getElementById('reset-btn-top').addEventListener('click', function () {
    const customToken = sessionStorage.getItem('customToken');
    if (!customToken) {
        let inner = document.getElementById("conirmContent");
        let dinamicinner2 = LangFlag === 0 ? 'משתמש אינו מחובר/אינו מורשה' : 'User unauthorized/ unauthenticated';
        inner.innerHTML = dinamicinner2;
        document.getElementById("exitConfirm").classList.remove("disabledConfirmBtn");
        document.getElementById("RelogIn").classList.remove("confirmBoxBtnHidden")
        document.getElementById("RelogIn").classList.add("confirmBoxBtn")
        DisableItems()
    } else {
        document.getElementById("menuItems").classList.remove("menuItems")
        document.getElementById("menuItems").classList.add("hiddenMenItems")
        document.getElementById("menu").classList.remove("menuBack")
        menuOpen = false
        reset("parameters", "Default");
    }
});

function toggleStage(labelId, stageId, ImgId) {
    let clicked = false;
    function toogle() {
        let functionInputs = document.getElementById(stageId);
        let functionLabel = document.getElementById(labelId);
        let functionImg = document.getElementById(ImgId);
        if (!clicked) {
            functionInputs.classList.add("functionInputsHidden");
            functionLabel.classList.add("functionLabelHiddenInput");
            functionImg.classList.add("ClosedImg")
            clicked = true;
        } else {
            functionInputs.classList.remove("functionInputsHidden");
            functionLabel.classList.remove("functionLabelHiddenInput");
            functionImg.classList.remove("ClosedImg")
            clicked = false;
        }
    }
    document.getElementById(labelId).addEventListener("click", toogle);
    if (window.matchMedia("(max-width: 768px)").matches) {
        toogle();
    }
}

function stagetoggler() {
    toggleStage("label1", "stage1", "Tgl1");
    toggleStage("label2", "stage2", "Tgl2");
    toggleStage("label3", "stage3", "Tgl3");
    toggleStage("label4", "stage4", "Tgl4");
    toggleStage("label5", "stage5", "Tgl5");
    toggleStage("label6", "stage6", "Tgl6");
    toggleStage("label7", "stage7", "Tgl7");
    toggleStage("label8", "stage8", "Tgl8");
    toggleStage("label9", "stage9", "Tgl9");
    toggleStage("label10", "stage10", "Tgl10");
    toggleStage("label11", "stage11", "Tgl11");
    toggleStage("label12", "stage12", "Tgl12");
    toggleStage("label13", "stage13", "Tgl13");
    toggleStage("label14", "stage14", "Tgl14");
    toggleStage("label15", "stage15", "Tgl15");
    toggleStage("label16", "stage16", "Tgl16");
    toggleStage("label17", "stage17", "Tgl17");
    toggleStage("label18", "stage18", "Tgl18");
}

function logInPage() {
    let LoggedInEmail = 0;
    let idleTimeout = 0;
    let intervalId;
    stagetoggler();
    document.getElementById("ShowPass").addEventListener("click", function (event) {
        document.getElementById("login-password").type = "text";
        setTimeout(() => {
            document.getElementById("login-password").type = "password";
        }, 3000);

    })
    DisableItems();
    document.getElementById("bodyBox").classList.remove("disable_scroll");
    document.getElementById("LangIndictor").classList.add("initial_lang_location");
    document.getElementById("LangIndictor").classList.remove("functionLabelDisable");

    async function SucsessLogin() {
        exitConfirmBox();
        document.getElementById("LangIndictor").classList.remove("initial_lang_location");
        document.getElementById("hostLangIn").innerHTML = document.getElementById("hostLangOut").innerHTML;
        document.getElementById("hostLangOut").innerHTML = "";
        document.getElementById("contenet").classList.remove("hiddenMain");
        document.getElementById("contenet").classList.add("ShownMain");
        document.getElementById("login-container").classList.add("hiddenMain");
        document.getElementById("username-display").classList.remove("hiddenMain");
        document.getElementById("LoginBtn").classList.remove("disabledConfirmBtn");
        document.getElementById("loadingUserBox").innerHTML = '';
        loadPage();
    }

    function failedLogin() {
        document.getElementById("LoginBtn").classList.remove("disabledConfirmBtn");
        document.getElementById("login-error-message").classList.remove("hiddenMain");
        document.getElementById("login-error-message").innerHTML = LangFlag === 0 ? "אחד או שני פרטי הכניסה שגויים" : 'One ore both Details are wrong';
    }
    if (sessionStorage.getItem('customToken')) {
        document.getElementById("loadingUserBox").innerHTML = `${LangFlag == 0 ? 'מאמת כתובת מייל וסיסמה' : 'Verifyng Email and Password'}<img src="assets/pics/loading.png" class="loading" id="loading1">`;
        setTimeout(() => {
            SucsessLogin()
        }, 300);
    }

    const loginForm = document.getElementById("login-form");
    const loginEmailInput = document.getElementById("login-email");
    const loginPasswordInput = document.getElementById("login-password");
    document.getElementById("GuestLoginBtn").addEventListener("click", async (e) => {
        e.preventDefault();
        document.getElementById("login-error-message").classList.add("hiddenMain");
        document.getElementById("LoginBtn").classList.add("disabledConfirmBtn");
        document.getElementById("loadingUserBox").innerHTML = `${LangFlag == 0 ? 'נכנס כאורח' : 'Loging in as guest'}<img src="assets/pics/loading.png" class="loading" id="loading1">`;
        async function login() {
            try {
                sessionStorage.setItem('LoggedInEmail', 'Guest')
                SucsessLogin()
            } catch (error) {
                console.error('Login failed:', error)
                failedLogin()
            }
        }
        await login();
        document.getElementById("loadingUserBox").innerHTML = '';
    });
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        document.getElementById("login-error-message").classList.add("hiddenMain");
        document.getElementById("LoginBtn").classList.add("disabledConfirmBtn");
        document.getElementById("loadingUserBox").innerHTML = `${LangFlag == 0 ? 'מאמת כתובת מייל וסיסמה' : 'Verifyng Email and Password'}<img src="assets/pics/loading.png" class="loading" id="loading1">`;
        const email = loginEmailInput.value;
        const password = loginPasswordInput.value;
        async function login() {
            try {
                const response = await fetch(servrPort + '/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }) // Send email and password in the request body

                });
                const { token } = await response.json();
                const userCredential = await signInWithCustomToken(auth, token);
                const idToken = await userCredential.user.getIdToken();
                sessionStorage.setItem('customToken', idToken)
                sessionStorage.setItem('LoggedInEmail', email)
                function refreshIdToken() {
                    if (auth.currentUser) {
                        auth.currentUser.getIdToken(true)
                            .then((newIdToken) => {
                                sessionStorage.setItem("customToken", newIdToken);
                            })
                            .catch((error) => {
                                console.error("Error refreshing ID token:", error);
                            });
                    } else {
                        console.log("No user is logged in.");
                    }
                }
                intervalId=setInterval(refreshIdToken, 59 * 60 * 1000);
                SucsessLogin()
            } catch (error) {
                console.error('Login failed:', error)
                failedLogin()
            }
        }
        await login();
        document.getElementById("loadingUserBox").innerHTML = '';
    });

    async function logout() {
        const response = await fetch(servrPort + '/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ LoggedInEmail }) // Send email and password in the request body

        });
        const result = await response.json();

        if (result.success === 1) {
            document.getElementById("hostLangOut").innerHTML = document.getElementById("hostLangIn").innerHTML;
            document.getElementById("hostLangIn").innerHTML = "";
            document.getElementById("contenet").classList.add("hiddenMain");
            document.getElementById("login-container").classList.remove("hiddenMain");
            document.getElementById("username-display").innerText = '';
            document.getElementById("LangIndictor") ? document.getElementById("LangIndictor").classList.add("initial_lang_location") : "";
            document.getElementById("hostLangIn").innerHTML = document.getElementById("hostLangOut").innerHTML;
            document.getElementById("contenet").classList.remove("ShownMain");
            document.getElementById("username-display").classList.add("hiddenMain");
            DisableItems();
            document.getElementById("LangIndictor").classList.remove("functionLabelDisable");
            sessionStorage.clear();
            clearInterval(intervalId);
            document.getElementById("DefValDisplayBox").classList.remove("DefValDisplayBox");
            document.getElementById("DefValDisplayBox").classList.add("hiddenValBox");
            document.getElementById("logout-btn").disabled = false;
            document.getElementById("logout-btn").classList.remove("disabledConfirmBtn");
            // Handle successful login (e.g., redirect to a dashboard)
        } else {
            console.log('Logout failed');
        }
    }

    const idleTimeLimit = 59 * 60 * 1000;
    function resetIdleTimer() {
        clearTimeout(idleTimeout);
        idleTimeout = setTimeout(() => {
            setTimeout(async () => {
                await logout();
                logutwindowClose();
                clearInterval(intervalId);
            }, 3000);
            document.getElementById("LogoutMesseag").innerHTML = "מתנתק אוטומטית<br>המושב עבר";
            logutwindowopen()
        }, idleTimeLimit);
    }
    window.onload = resetIdleTimer;
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);

    function logutwindowopen() {
        DisableItems();
        exitConfirmBox();
        document.getElementById("LogoutBox").classList.remove("hiddenMain");
        document.getElementById("LogoutBox").classList.add("resetPasswordBox");
    }

    function logutwindowClose() {
        document.getElementById("LogoutBox").classList.add("hiddenMain");
        document.getElementById("LogoutBox").classList.remove("resetPasswordBox");
    }

    const logoutButton = document.getElementById("logout-btn");
    logoutButton.addEventListener("click", async (e) => {
        logutwindowopen();
        setTimeout(async () => {
            await logout();
            logutwindowClose()
        }, 500);
    });

    document.getElementById("closeForgtBox").addEventListener("click", function (event) {
        document.getElementById("resetPasswordBox").classList.remove("resetPasswordBox");
        document.getElementById("resetPasswordBox").classList.add("hiddenMain");
        resetPassBoxOpen = false;
        exitConfirmBox();
    });

    const forgotPasswordBtn = document.getElementById("forgotPassword");
    forgotPasswordBtn.addEventListener("click", async (e) => {
        const email = loginEmailInput.value;
        document.getElementById("resetPasswordBox").classList.add("resetPasswordBox");
        document.getElementById("resetPasswordBox").classList.remove("hiddenMain");
        document.getElementById("resetPassword").classList.add("hiddenMain")
        document.getElementById("closeForgtBox").classList.remove("hiddenMain")
        setTimeout(() => {
            resetPassBoxOpen = true;
        }, 500);
        document.getElementById("resetsPassMesseag").innerHTML = `${LangFlag == 0 ? 'מאמת מייל' : 'Verifying email'}<img src="assets/pics/loading.png" class="loading" id="loading2">`;
        async function forgotPassword(email) {
            const response = await
                fetch(servrPort + '/forgotPassowrd', {
                    method: 'POST',
                    body: JSON.stringify({ email: email }),
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(response => {
                        return response.text();  // Try reading as plain text
                    })
                    .then(text => {
                        try {
                            const jsonResponse = JSON.parse(text);
                            if (jsonResponse.success == 1) {
                                document.getElementById("resetPassword").classList.remove("hiddenMain")
                                document.getElementById("resetsPassMesseag").innerHTML = LangFlag == 0 ? 'לחץ לקבלת מייל לאיפוס סיסמה' : 'Press to send password reset button';
                            } else {
                                document.getElementById("resetPassword").classList.add("hiddenMain")
                                document.getElementById("closeForgtBox").classList.remove("hiddenMain")
                                document.getElementById("resetsPassMesseag").innerHTML = LangFlag == 0 ? 'כתובת מייל לא נמצאה, פנה לבעלים לקבלת משתמש' : 'Email adress was not found, please contact owner to get an account';
                            }
                        } catch (error) {
                            console.error("Error parsing JSON:", error);
                        }
                    })
                    .catch(error => {
                        console.error("Request failed:", error);
                    });
        }
        await forgotPassword(email)
    });

    const forgotPasswordBtnInner = document.getElementById("ForgotPassword-Upref");
    forgotPasswordBtnInner.addEventListener("click", async (e) => {
        const email = sessionStorage.getItem('LoggedInEmail');
        document.getElementById("resetPasswordBox").classList.add("resetPasswordBox");
        document.getElementById("resetPasswordBox").classList.remove("hiddenMain");
        document.getElementById("resetPassword").classList.add("hiddenMain")
        document.getElementById("closeForgtBox").classList.remove("hiddenMain");
        setTimeout(() => {
            resetPassBoxOpen = true;
        }, 500);
        document.getElementById("resetsPassMesseag").innerHTML = `${LangFlag == 0 ? 'מאמת מייל' : 'Verifying email'}<img src="assets/pics/loading.png" class="loading" id="loading2">`;
        DisableItems();
        let confirmBox = document.getElementById("confirmBox");
        confirmBox.classList.remove("infoBox");    // Remove infoBox class
        confirmBox.classList.add("hiddenBox");
        async function forgotPassword(email) {
            const response = await
                fetch(servrPort + '/forgotPassowrd', {
                    method: 'POST',
                    body: JSON.stringify({ email: email }),
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(response => {
                        return response.text();  // Try reading as plain text
                    })
                    .then(text => {
                        try {
                            const jsonResponse = JSON.parse(text);
                            if (jsonResponse.success == 1) {
                                document.getElementById("resetPassword").classList.remove("hiddenMain")
                                document.getElementById("resetsPassMesseag").innerHTML = LangFlag == 0 ? 'לחץ לקבלת מייל לאיפוס סיסמה' : 'Press to send password reset button';
                            } else {
                                document.getElementById("resetPassword").classList.add("hiddenMain")
                                document.getElementById("closeForgtBox").classList.remove("hiddenMain")
                                document.getElementById("resetsPassMesseag").innerHTML = LangFlag == 0 ? 'כתובת מייל לא נמצאה, פנה לבעלים לקבלת משתמש' : 'Email adress was not found, please contact owner to get an account';
                            }
                        } catch (error) {
                            console.error("Error parsing JSON:", error);
                        }
                    })
                    .catch(error => {
                        console.error("Request failed:", error);
                    });
        }
        await forgotPassword(email)
    });

    const restPassButton = document.getElementById("resetPassword");
    restPassButton.addEventListener("click", async (e) => {
        document.getElementById("resetPasswordBox").classList.remove("resetPasswordBox");
        document.getElementById("resetPasswordBox").classList.add("hiddenMain");
        resetPassBoxOpen = false;
        exitConfirmBox()
        const email = loginEmailInput.value;
        async function resetPassowrd(email) {
            const response = await fetch(servrPort + '/resetPassowrd', {
                // const response = await fetch('http://localhost:10000/resetPassowrd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }) // Send email and password in the request body

            });
            const result = await response.json();

            if (result.success === 1) {
                // console.log ('rest pasword email sent')
            } else {
                // console.log('switch pasword failed');
            }
        }
        await resetPassowrd(email);

    });
}

logInPage();