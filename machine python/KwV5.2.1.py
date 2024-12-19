import RPi.GPIO as GPIO
from multiprocessing import Manager, Process, Lock, Event
from threading import Lock
import os
import time
import signal
from time import sleep
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
from google.api_core.exceptions import DeadlineExceeded
import pytz
import sys

cred = credentials.Certificate("keg-washer-firebase-adminsdk-7ww1i-aa7938c93f.json")  # Path to your Firebase JSON key
firebase_admin.initialize_app(cred)
db = firestore.client()
local_tz = pytz.timezone("Asia/Jerusalem")

# GPIO Setup
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

# Initialize I2C and ADCs
i2c = busio.I2C(board.SCL, board.SDA)
ads = ADS.ADS1115(i2c)
Pressureinraw = AnalogIn(ads, ADS.P2)
Pressureoutraw = AnalogIn(ads, ADS.P3)

# Define pin numbers
Inputs = [25, 27, 24, 10, 18, 22, 14, 23]
Outputs = [6, 9, 11, 0, 5, 13, 19, 26, 21, 20, 16, 12, 15, 7, 8, 1]
Errlight = 6
InProceslight = 9
STBYlight = 11
ErrNmbr = 0

GBTN = 25
RBTN = 27
ErrBTN = 24
Water_Level= 10
pressure_cancel=18
ShutdownBtn=22
FillCaus=23
FillPaa=14
Inputs = [25,27,24,10,18,22,14,23]

STBYlight = 11
InProceslight = 9
Errlight =6
Pump = 13
Heat = 5
Main_Drain = 19
Water_In = 26
Air_In = 0
Caustic_In = 15
Caustic_Out = 7
Paa_In = 8
Paa_Out =16
Co2_In = 21
keg1= 12
keg2= 20
Ground_Pneu_valves= 1

statuslights=[STBYlight,InProceslight,Errlight]

Outputs = [6,9,11,0,5,13,19,26,21,20,16,12,15,7,8,1]

ErrNmbr= 0
Btnstatus=0
Callsucsess=0

Pressurein = 0
Pressureout= 0
PressureguageC = 30
Pressurinthresh=5
Pumppressurethresh=5
Pressuroutthresh= 5
kegpresuuredest= 15 

# Setup GPIO
GPIO.setup(Outputs, GPIO.OUT)
GPIO.setup(Inputs, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.output(Outputs, GPIO.LOW)

manager = Manager()
lock = Lock()
shared_values = manager.list([
    ('preboobotMeteg', 1),
    ('pressureMeteg', 0),
    ('FirstAirPurgeRecure', 1),
    ('FirstAirPurgeToff', 1.5),
    ('FirstAirPurgeTon', 1),
    ('InitialWaterFlud', 4),
    ('recureMedSquirt', 6),
    ('medSquirtWaterOn', 0.4),
    ('medSquirtWaterOff', 0.3),
    ('recureShortSquirt', 5),
    ('ShortSquirtWaterOn', 0.2),
    ('ShortSquirtWaterOff', 0.15),
    ('recureLongSquirt', 5),
    ('LongSquirtWaterOn', 1.6),
    ('LongSquirtWaterOff', 1.6),
    ('RinseWaterWithPump', 11),
    ('PostWaterPurgeRecure', 5),
    ('PostWaterPurgeTon', 1),
    ('PostWaterPurgeToff', 2),
    ('InitialCausticFlud', 5),
    ('CausticRinseKeg1', 15),
    ('CausticRinseKeg2', 15),
    ('pressurizeCausticInKeg', 10),
    ('causticSoakInKeg', 15),
    ('SecondCausticFlud', 15),
    ('recureShortCausticSquirt', 15),
    ('CausticSquirtPumpOn', 0.3),
    ('CausticSquirtPumpOff', 0.3),
    ('recurePurgeCausticSquirt', 7),
    ('airAndPumpIntervale', 0.2),
    ('recureLastCausticSquirt', 7),
    ('CausticLastSquirtPumpOn', 1.2),
    ('CausticLastSquirtPumpOff', 1.2),
    ('PostCausticPurgeRecure', 3),
    ('PostCausticPurgeTon', 0.75),
    ('PostCausticPurgeToff', 1),
    ('postCausticWaterRinseRecure', 3),
    ('postCausticWaterRinseRecureEachRins',5),
    ('postCausticWaterRinseOn', 1),
    ('postCausticWaterRinseOf', 2),
    ('SanitizeInitialKeg1', 35),
    ('SanitizeInitialKeg2', 35),
    ('SanitizeInitialBothKegs', 10),
    ('paaInitialPumpRecure', 15),
    ('paaInitialPumpOn', 0.3),
    ('paaInitialPumpOff', 0.3),
    ('paaSquirtRecure', 7),
    ('Co2PumpIntervale', 1.2),
    ('postSquirtSanitizeBothKegs', 10),
    ('co2PurgeKeg1Recure', 9),
    ('co2PurgeKeg1Open', 0.7),
    ('co2PurgeKeg1Closed', 2.4),
    ('co2PurgeKeg2Recure', 9),
    ('co2PurgeKeg2Open', 0.7),
    ('co2PurgeKeg2Closed', 2.4),
    ('co2PurgeBothKegsOpen', 5),
    ('co2PurgeBothKegsClosed',5),
    ('kegPdestination', 15),
    ('TimeOutPdestination', 12),
    ('PostTimeOutBuildP', 15),
    ('PTimeWhenSensorDisabled', 7),
])
buttons= manager.list([
    ('green',0),
    ('red',0)
])
counters=manager.list([
    ('full_cycle',0),
    ('purge_cycle',0),
    ('Short_cycle',0),
    ('log_counter',0)
])
procIND=manager.list([
    ('procIND',0)
])
previous_values = {key: value for key, value in shared_values}


log_ref = db.collection("Washer-Logs")
current_log_id=0


Live_log_ref = db.collection("users").document("Live-Logs")

def update_log_count():
    with lock:  # Assuming 'lock' is a properly initialized threading.Lock or multiprocessing.Lock
        counters[3] = (counters[3][0], counters[3][1] + 1)
        
class FirestoreLogger:    
    
    def __init__(self):
        self.buffer = ""
        Live_log_ref = db.collection("users").document("Live-Logs")
    
    def write(self, message):
        
        self.buffer += message  # Accumulate the message in the buffer
        if "\n" in self.buffer:  # Process only when a newline is encountered
            lines = self.buffer.split("\n")
            for line in lines[:-1]:  # Process all complete lines
                if line.strip():  # Avoid empty lines
                    sys.__stdout__.write(line + "\n")  # Print to console in real time
                    update_log_count()
                    try:
                        Live_log_ref.update({str(counters[3][1]): line})
                    except Exception as e:
                        sys.__stdout__.write(f"Firestore update error: {e}\n")
            self.buffer = lines[-1]  # Keep the remaining partial line in the buffer

    def flush(self):
        if self.buffer.strip():  # Flush any remaining text in the buffer
            sys.__stdout__.write(self.buffer + "\n")
            try:
                Live_log_ref.update({str(counters[3][1]): self.buffer})
            except Exception as e:
                sys.__stdout__.write(f"Flush Firestore update error: {e}\n")
            self.buffer = ""
            
def init_firebase():
    import firebase_admin
    from firebase_admin import credentials, firestore
    
    # Path to your Firebase credentials
    cred = credentials.Certificate("keg-washer-firebase-adminsdk-7ww1i-aa7938c93f.json")
    # Initialize the Firebase app if it hasn't been initialized already
    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred)
    return firestore.client()

def update_cycle_count(log_ref, cycle_type, increment,current_log_id):
    with lock:
        for i, (key, value) in enumerate(counters):
            if key == cycle_type:
                new_value = value + increment
                counters[i] = (key, new_value)
                try:
                    log_ref.document(current_log_id).update({cycle_type: new_value*2})
                    print(f"{cycle_type} updated successfully in Firestore.")
                except Exception as e:
                    print(f"Error updating {cycle_type} in Firestore: {e}")

def get_current_settings():
    doc_ref = db.collection("parameters").document("updated")
    btn_ref =db.collection("buttons").document("butons")
    while True:
        try:
            db.collection("users").document("keg-washer").update({
                "`last-connection`": datetime.now(local_tz)
            })
        except Exception as e:
            print (f"failed to write last-connection, {e}")
        try:
            doc = doc_ref.get()
            btn = btn_ref.get()
        except Exception as e:
            print(f"Error fetching data from server: {e}")
            sleep(1)
            continue
        if doc.exists:
            updated_data = doc.to_dict()
            for i, (key, value) in enumerate(shared_values):
                if key in updated_data:
                    new_value = updated_data[key]
                    if new_value != value:  # Check if the value has changed
                        with lock:
                            shared_values[i] = (key, new_value)  # Update shared_values
                        print(f"Updated Parameter{key}: {value} -> {new_value} from online platform")
        if btn.exists:
            btn_data = btn.to_dict()
            for i, (key, value) in enumerate(buttons):
                if key in btn_data:
                    btn_value = btn_data[key]
                    if btn_value != value:  # Check if the value has changed
                        with lock:
                            buttons[i] = (key, btn_value)  # Update shared_values
                        print(f"Button changed! {key}: {value} -> {btn_value}")
        sleep(1)

async def fetch_settings_once():
    print("Fetching parameters from server...")
    doc_ref = db.collection("parameters").document("updated")
    max_attempts = 10
    try:
        db.collection("users").document("keg-washer").update({
            "`last-connection`": datetime.now(local_tz)
        })
    except Exception as e:
        print (f"failed to write last-connection, {e}")
    for attempt in range(max_attempts):
        try:
            doc = doc_ref.get(timeout=30)
            if doc.exists:
                updated_data = doc.to_dict()
                for i, (key, value) in enumerate(shared_values):
                    if key in updated_data:
                        new_value = updated_data[key]
                        if new_value != value:  # Check if the value has changed
                            with lock:
                                shared_values[i] = (key, new_value)  # Update shared_values
                print("Successfully fetched data.")
                return  # Exit after successful fetch
            else:
                print("Data does not exists in server!")
        except DeadlineExceeded as e:
            if attempt < max_attempts - 1:
                wait_time = min(2 ** attempt, max_delay)  # Exponential backoff with a cap
                print(f"Attempt {attempt+1}: Deadline exceeded, retrying in {wait_time} seconds...")
                time.sleep(wait_time)
            else:
                print("Failed to fetch settings after maximum attempts. Using default values.")
        except Exception as e:
            print(f"Error fetching Firestore document: {e}")
    print("launching washer with default settings.")  

def protectheat():
    if GPIO.input(Water_Level) == GPIO.LOW:
        print('Heat on')
    else:
        print('Heat off')
    while True:
        if GPIO.input(Water_Level) == GPIO.LOW:
            GPIO.output(Heat, GPIO.HIGH)
        else:
            GPIO.output(Heat, GPIO.LOW)

def convert_pressure():
    global Pressurein, Pressureout, Pressureinraw, Pressureoutraw, PressureguageC
    VLin = 0.4
    VLout = 0.451
    pressureinmed = PressureguageC * (Pressureinraw.voltage - VLin) / 4
    pressureoutmed = PressureguageC * (Pressureoutraw.voltage - VLout) / 4
    Pressurein = round(pressureinmed, 2)
    Pressureout = round(pressureoutmed, 2)
    print('Pressure in:',Pressurein,'PSI, Pressure out:',Pressureout,'PSI')

def checkpruessurecanceled():
    global Pressurein
    global Pressureout
    i=0
    x=0
    y=0
    if (next(val for key, val in shared_values if key == 'pressureMeteg')==0):
        i=11
        x=1
        print ("pressure check is disabled from online platform")
    else:
        print ("pressure check is enabled from online platform > proceeding to check pressure")

    while i<10:
        if GPIO.input(pressure_cancel) == GPIO.HIGH:
            if y==0:
                x=1
                i=i+1
            if y==1:
                i=0
            y=0
        if GPIO.input(pressure_cancel) == GPIO.LOW:
            if x==0:
                y=1
                i=i+1
            if x==1:
                i=0
            x=0
    if x==1:
        print('pressure check disabled from mechanichal switch')
        Pressurein=10000
        Pressureout=1000
    if y==1:
        Pressurein=0
        Pressureout=0
        cunvertpressure()
 
def Err(ErrNmbr):
    x=0
    while True:
        if ErrNmbr == 1:
            print('Air input Err #1')
            GPIO.output(Air_In, GPIO.HIGH)
            GPIO.output(Errlight, GPIO.HIGH)
            sleep(1)
            GPIO.output(Air_In, GPIO.LOW)
            sleep(1)
        if ErrNmbr == 2:
            print('Water input Err #2')
            GPIO.output(Water_In, GPIO.HIGH)
            GPIO.output(Errlight, GPIO.HIGH)
            sleep(1)
            GPIO.output(Water_In, GPIO.LOW)
            sleep(1)
        if ErrNmbr == 3:
            print('Caustic input Err #3')
            GPIO.output(Caustic_In, GPIO.HIGH)
            GPIO.output(Errlight, GPIO.HIGH)
            sleep(0.5)
            GPIO.output(Caustic_In, GPIO.LOW)
            sleep(0.5)
        if ErrNmbr == 4:
            print('Co2 input Err #4')
            GPIO.output(Co2_In, GPIO.HIGH)
            GPIO.output(Errlight, GPIO.HIGH)
            sleep(1)
            GPIO.output(Co2_In, GPIO.LOW)
            sleep(1)
        if ErrNmbr == 5:
            print('Emergancy BTN Err #7')
            GPIO.output(Errlight, GPIO.HIGH)
            sleep(1)
            GPIO.output(Errlight, GPIO.LOW)
        if ErrNmbr == 6:
            print('Timed Out building Pressure- pressure is',Pressureout,'PSI')
            GPIO.output(Errlight, GPIO.HIGH)
            GPIO.output(Co2_In, GPIO.HIGH)
            sleep(1)
            GPIO.output(Co2_In, GPIO.LOW)
        if ErrNmbr == 7:
            print('Paa input Err #5')
            GPIO.output(Paa_In, GPIO.HIGH)
            GPIO.output(Errlight, GPIO.HIGH)
            sleep(1)
            GPIO.output(Paa_In, GPIO.LOW)
            sleep(1)
  
def Pauseindicator():
    GPIO.output(Outputs, GPIO.LOW)
    GPIO.output(STBYlight, GPIO.HIGH)
    while True:
        GPIO.output(InProceslight, GPIO.HIGH)
        print('Paused! Press green BTN to Resume')
        sleep(0.5)
        GPIO.output(InProceslight, GPIO.LOW)
        sleep(0.5)

def filltanks():
    while True:
        if GPIO.input(FillCaus) == GPIO.LOW:
            GPIO.output(Ground_Pneu_valves, GPIO.HIGH)
            GPIO.output(Water_In, GPIO.HIGH)   
            GPIO.output(Caustic_In, GPIO.HIGH)
        if GPIO.input(FillPaa) == GPIO.LOW:
            GPIO.output(Ground_Pneu_valves, GPIO.HIGH)
            GPIO.output(Water_In, GPIO.HIGH)   
            GPIO.output(Paa_In, GPIO.HIGH)
        if GPIO.input(FillCaus) == GPIO.HIGH and GPIO.input(FillPaa) == GPIO.HIGH:
            GPIO.output(Ground_Pneu_valves, GPIO.LOW)
            GPIO.output(Water_In, GPIO.LOW)
        if GPIO.input(FillCaus) == GPIO.HIGH:
            GPIO.output(Caustic_In, GPIO.LOW)
        if GPIO.input(FillPaa) == GPIO.HIGH:
            GPIO.output(Paa_In, GPIO.LOW)

def Stdby():
    print('Stand By, Reddy for cycle, press button to start!')
    GPIO.cleanup()
    Outputs = [6,9,11,0,5,13,19,26,21,20,16,12,15,7,8,1]
    Inputs = [25,27,24,10,18,22,14,23]
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(Outputs, GPIO.OUT)
    GPIO.setup(Inputs, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.output(Outputs, GPIO.LOW)
    GPIO.output(STBYlight, GPIO.HIGH)
 
def AirPurge(Recure,purgetimeon,purgetimeoff):
    print('Air purge: air in for',purgetimeon,'seconds, keg empty for', purgetimeoff,'seconds, repeet', Recure,'times' )
    global ErrNmbr
    GPIO.output(Air_In, GPIO.HIGH)
    GPIO.output(keg1, GPIO.HIGH)
    GPIO.output(keg2, GPIO.LOW)
    t=0
    while t<300:
        sleep(0.01)
        t=t+1
    checkpruessurecanceled()
    if Pressurein<Pressurinthresh:
        ErrNmbr =1
        Err(1)
    x = 0
    while x <Recure:
        GPIO.output(Air_In, GPIO.HIGH)
        t=0
        while t< purgetimeon:
            sleep(0.01)
            t=t+0.01
        GPIO.output(Air_In, GPIO.LOW)
        t=0
        while t< purgetimeoff:
            sleep(0.01)
            t=t+0.01
        x = x+1
    x = 0
    GPIO.output(keg2, GPIO.HIGH)
    GPIO.output(keg1, GPIO.LOW)
    while x <Recure:
        GPIO.output(Air_In, GPIO.HIGH)
        t=0
        while t< purgetimeon:
            sleep(0.01)
            t=t+0.01
        GPIO.output(Air_In, GPIO.LOW)
        t=0
        while t< purgetimeoff:
            sleep(0.01)
            t=t+0.01
        x = x+1
    x = 0
    GPIO.output(keg1, GPIO.HIGH)    
    t=0
    while t< purgetimeon:
        sleep(0.01)
        t=t+0.01
    GPIO.output(Air_In, GPIO.LOW)
    t=0
    while t< purgetimeoff:
        sleep(0.01)
        t=t+0.01

def WaterSquirt():
    print('rinsing with water')
    global Pressurein
    global ErrNmbr
    t=0
    while t<30:
        sleep(0.01)
        t=t+1
    GPIO.output(Water_In, GPIO.HIGH)
    A=(next(val for key, val in shared_values if key == 'InitialWaterFlud')*100)
    while t<A:
        sleep(0.01)
        t=t+1
    GPIO.output(keg1, GPIO.LOW)
    GPIO.output(keg2, GPIO.LOW)
    checkpruessurecanceled()
    if Pressurein<Pressurinthresh:
        ErrNmbr =2
        Err(2)
    i = 1
    GPIO.output(keg1, GPIO.HIGH)
    GPIO.output(keg2, GPIO.HIGH)
    B=(next(val for key, val in shared_values if key == 'recureMedSquirt')) 
    medSquirtWaterOn= (next(val for key, val in shared_values if key == 'medSquirtWaterOn')*100)
    medSquirtWaterOff=(next(val for key, val in shared_values if key == 'medSquirtWaterOff')*100)
    while i <B:
        GPIO.output(Water_In, GPIO.HIGH)
        t=0
        while t<medSquirtWaterOn:
            sleep(0.01)
            t=t+1
        GPIO.output(Water_In, GPIO.LOW)
        t=0
        while t<medSquirtWaterOff: 
            sleep(0.01)
            t=t+1
        i= i+1
    i = 1
    C=(next(val for key, val in shared_values if key == 'recureShortSquirt')) 
    while i < C:
        GPIO.output(Water_In, GPIO.HIGH)
        t=0
        D=(next(val for key, val in shared_values if key == 'ShortSquirtWaterOn')*100)
        while t<D:
            sleep(0.01)
            t=t+1
        GPIO.output(Water_In, GPIO.LOW)
        t=0
        E=(next(val for key, val in shared_values if key == 'ShortSquirtWaterOff')*100)
        while t<E:
            sleep(0.01)
            t=t+1
        i= i+1
    i = 1
    E=(next(val for key, val in shared_values if key == 'recureLongSquirt'))
    F=(next(val for key, val in shared_values if key == 'LongSquirtWaterOn')*100)
    G=(next(val for key, val in shared_values if key == 'LongSquirtWaterOff')*100)
    while i < E: 
        GPIO.output(Water_In, GPIO.HIGH)
        GPIO.output(Air_In, GPIO.HIGH)
        t=0
        while t<F: 
            sleep(0.01)
            t=t+1
        GPIO.output(Water_In, GPIO.LOW)
        GPIO.output(Air_In, GPIO.LOW)
        t=0
        while t<G: 
            sleep(0.01)
            t=t+1
        i= i+1  
    GPIO.output(Water_In, GPIO.HIGH)
    t=0
    while t<200:
        sleep(0.01)
        t=t+1
    GPIO.output(Pump, GPIO.HIGH)
    t=0
    H=(next(val for key, val in shared_values if key == 'RinseWaterWithPump')*100)
    while t<H: 
        sleep(0.01)
        t=t+1
    GPIO.output(Pump, GPIO.LOW)
    t=0
    while t<200:
        sleep(0.01)
        t=t+1
    GPIO.output(Water_In, GPIO.LOW)

def PumpSquirt(Purge): # - changeble vars
    if Purge== 0:
        print('the Pump is squirting with Caustic & air')
    if Purge== 21:
        print('the Pump is squirting with Paa & co2')
    global ErrNmbr
    PaaPumpuRecure=next(val for key, val in shared_values if key == 'paaInitialPumpRecure')
    PaaPumpOn=next(val for key, val in shared_values if key == 'paaInitialPumpOn')*100
    PaaPumpOff=next(val for key, val in shared_values if key == 'paaInitialPumpOff')*100
    CausticPumpuRecure=next(val for key, val in shared_values if key == 'recureShortCausticSquirt')  
    CausticPumpOn=next(val for key, val in shared_values if key == 'CausticSquirtPumpOn')*100
    CausticPumpOff=next(val for key, val in shared_values if key == 'CausticSquirtPumpOff')*100
    if Purge==Co2_In:
        pumpRecure=PaaPumpuRecure
        pumpOn=PaaPumpOn
        pumpOff=PaaPumpOff
        string="CO2"
    if Purge==Air_In:
        pumpRecure=CausticPumpuRecure
        pumpOn=CausticPumpOn
        pumpOff=CausticPumpOff
        string="Air"
    i = 0

    print(f"squirting {string} - {pumpRecure} Times, pumpOn for {pumpOn/100} seconds, pumpOff for {pumpOff/100} seconds")
    while i < pumpRecure : 
        GPIO.output(Pump, GPIO.HIGH)
        t=0
        while t<pumpOn:
            sleep(0.01)
            t=t+1                                                                   
        GPIO.output(Pump, GPIO.LOW)
        t=0
        while t<pumpOff:
            sleep(0.01)
            t=t+1
        i= i+1
    GPIO.output(Pump, GPIO.HIGH)
    i = 1
    withAir=next(val for key, val in shared_values if key == 'recurePurgeCausticSquirt')  
    withCo2= next(val for key, val in shared_values if key == 'paaSquirtRecure')
    if Purge==Co2_In:
        rcurePumpAndAirSquirt=withCo2
    if Purge==Air_In: 
        rcurePumpAndAirSquirt=withAir
    I=(next(val for key, val in shared_values if key == 'Co2PumpIntervale')*100)
    J=(next(val for key, val in shared_values if key == 'airAndPumpIntervale')*100)
    while i < rcurePumpAndAirSquirt : 
        GPIO.output(Pump, GPIO.HIGH)
        GPIO.output(Purge, GPIO.HIGH)
        if Purge==Co2_In:
            GPIO.output(Purge, GPIO.HIGH)
            t=0
            while t<I: 
                sleep(0.01)
                t=t+1
        if Purge==Air_In:
            t=0
            while t<J:
                sleep(0.01)
                t=t+1
            GPIO.output(Purge, GPIO.LOW)
            sleep(1)
        GPIO.output(Pump, GPIO.LOW)
        GPIO.output(Purge, GPIO.LOW)
        t=0
        while t<120:
            sleep(0.01)
            t=t+1
        i= i+1
    i = 1
    if Purge==Air_In:
        t=0
        while t<40:
            sleep(0.01)
            t=t+1
    K= (next(val for key, val in shared_values if key == 'recureLastCausticSquirt'))
    L= (next(val for key, val in shared_values if key == 'CausticLastSquirtPumpOn')*100)
    M= (next(val for key, val in shared_values if key == 'CausticLastSquirtPumpOff')*100)
    while i < K:
        GPIO.output(Pump, GPIO.HIGH)
        t=0
        while t<L:
            sleep(0.01)
            t=t+1
        GPIO.output(Pump, GPIO.LOW)
        t=0
        while t<M: 
            sleep(0.01)
            t=t+1
        i= i+1
    GPIO.output(Pump, GPIO.LOW)
    print("squirt done > mooving on...")

def causticrinse():
    global ErrNmbr
    GPIO.output(keg2, GPIO.HIGH)
    GPIO.output(keg1, GPIO.HIGH)
    t=0
    while t<50:
        sleep(0.01)
        t=t+1
    GPIO.output(Water_In, GPIO.HIGH)
    t=0
    while t<20:
        sleep(0.01)
        t=t+1
    GPIO.output(Water_In, GPIO.LOW)
    t=0
    while t<1:
        sleep(0.01)
        t=t+1
    GPIO.output(Pump, GPIO.HIGH)
    GPIO.output(Caustic_In, GPIO.HIGH)
    GPIO.output(Main_Drain, GPIO.LOW)
    GPIO.output(keg1, GPIO.LOW)
    GPIO.output(keg2, GPIO.LOW)
    GPIO.output(Caustic_Out, GPIO.HIGH)
    t=0
    while t<200: 
        sleep(0.01)
        t=t+1
    t=0
    checkpruessurecanceled()
    while t<200:
        sleep(0.01)
        t=t+1
    if Pressurein<Pumppressurethresh:
        ErrNmbr =3
        Err(3)
    GPIO.output(keg1, GPIO.HIGH)
    GPIO.output(keg2, GPIO.HIGH)
    t=0
    InitialCausticFlud=(next(val for key, val in shared_values if key == 'InitialCausticFlud')*100)
    while t<InitialCausticFlud:
        sleep(0.01)
        t=t+1
    GPIO.output(keg1, GPIO.HIGH)
    GPIO.output(keg2, GPIO.LOW)
    t=0
    CausticRinseKeg1=(next(val for key, val in shared_values if key == 'CausticRinseKeg1')*100)
    while t<CausticRinseKeg1:
        sleep(0.01)
        t=t+1
    GPIO.output(keg1, GPIO.LOW)
    GPIO.output(keg2, GPIO.HIGH)
    t=0
    CausticRinseKeg2=(next(val for key, val in shared_values if key == 'CausticRinseKeg2')*100)
    while t<CausticRinseKeg2: 
        sleep(0.01)
        t=t+1
    GPIO.output(keg1, GPIO.HIGH)
    GPIO.output(Caustic_Out, GPIO.LOW)
    t=0
    pressurizeCausticInKeg=(next(val for key, val in shared_values if key == 'pressurizeCausticInKeg')*100)
    while t<pressurizeCausticInKeg: 
        sleep(0.01)
        t=t+1
    GPIO.output(Caustic_Out, GPIO.HIGH)
    PumpSquirt(Air_In) #caustic pump squirt
    GPIO.output(Water_In, GPIO.HIGH)
    GPIO.output(keg1, GPIO.HIGH)
    GPIO.output(keg2, GPIO.HIGH)
    t=0
    while t<50:
        sleep(0.01)
        t=t+1
    GPIO.output(Water_In, GPIO.LOW)
    t=0
    while t<1:
        sleep(0.01)
        t=t+1
    GPIO.output(Pump, GPIO.HIGH)
    GPIO.output(Caustic_In, GPIO.HIGH)
    GPIO.output(Caustic_Out, GPIO.HIGH)
    t=0
    SecondCausticFlud=(next(val for key, val in shared_values if key == 'SecondCausticFlud')*100)
    while t<SecondCausticFlud:
        sleep(0.01)
        t=t+1
    t=0
    GPIO.output(Caustic_Out, GPIO.LOW)
    GPIO.output(Pump, GPIO.LOW)
    causticSoakInKeg=(next(val for key, val in shared_values if key == 'causticSoakInKeg')*100)
    while t<causticSoakInKeg:
        sleep(0.01)
        t=t+1
    GPIO.output(Caustic_In, GPIO.LOW)
    GPIO.output(Caustic_Out, GPIO.HIGH)
    PostCausticPurgeRecure=next(val for key, val in shared_values if key == 'PostCausticPurgeRecure')  
    PostCausticPurgeTon=next(val for key, val in shared_values if key == 'PostCausticPurgeTon')  
    PostCausticPurgeToff=next(val for key, val in shared_values if key == 'PostCausticPurgeToff')  
    AirPurge(PostCausticPurgeRecure,PostCausticPurgeTon,PostCausticPurgeToff)
    GPIO.output(Caustic_Out, GPIO.LOW)

def paasanitize():
    global ErrNmbr
    GPIO.output(Water_In, GPIO.HIGH)
    t=0
    while t<20:
        sleep(0.01)
        t=t+1
    GPIO.output(Water_In, GPIO.LOW)
    t=0
    while t<7:
        sleep(0.01)
        t=t+1
    GPIO.output(Paa_In, GPIO.HIGH)
    GPIO.output(Pump, GPIO.HIGH)
    t=0
    GPIO.output(Main_Drain, GPIO.LOW)
    GPIO.output(keg1, GPIO.LOW)
    while t<400:
        sleep(0.01)
        t=t+1
    checkpruessurecanceled()
    if Pressurein<Pumppressurethresh:
        ErrNmbr =7
        Err(7)
    GPIO.output(Main_Drain, GPIO.LOW)
    GPIO.output(Paa_Out, GPIO.HIGH)
    GPIO.output(keg2, GPIO.LOW)
    GPIO.output(keg1, GPIO.HIGH)
    t=0
    A=(next(val for key, val in shared_values if key == 'SanitizeInitialKeg1')*100)
    B=(next(val for key, val in shared_values if key == 'SanitizeInitialKeg2')*100)
    C=(next(val for key, val in shared_values if key == 'SanitizeInitialBothKegs')*100)
    D=(next(val for key, val in shared_values if key == 'postSquirtSanitizeBothKegs')*100)
    while t<A: 
        sleep(0.01)
        t=t+1
    GPIO.output(keg1, GPIO.LOW)
    GPIO.output(keg2, GPIO.HIGH)
    t=0
    while t<B:
        sleep(0.01)
        t=t+1
    GPIO.output(keg1, GPIO.HIGH)
    GPIO.output(Paa_Out, GPIO.LOW)
    t=0
    while t<C:
        sleep(0.01)
        t=t+1
    GPIO.output(Paa_Out, GPIO.HIGH)
    PumpSquirt(Co2_In) 
    t=0
    while t<D:
        sleep(0.01)
        t=t+1
    GPIO.output(Pump, GPIO.LOW)
    print("sintainion over")

def Co2purge():
    global ErrNmbr
    GPIO.output(Paa_In, GPIO.LOW)
    GPIO.output(Co2_In, GPIO.HIGH)
    GPIO.output(keg1, GPIO.HIGH)
    GPIO.output(keg2, GPIO.HIGH)
    r=0
    while r<100:
        sleep(0.01)
        r=r+1
    GPIO.output(keg1, GPIO.LOW)
    r=0
    while r<200:
        sleep(0.01)
        r=r+1
    checkpruessurecanceled()
    if Pressurein<Pressurinthresh:
        ErrNmbr =4
        Err(4)
    GPIO.output(keg1, GPIO.HIGH)
    GPIO.output(keg2, GPIO.LOW)
    c=0
    recure=(next(val for key, val in shared_values if key == 'co2PurgeKeg1Recure'))
    co2Open=(next(val for key, val in shared_values if key == 'co2PurgeKeg1Open')*100)
    co2Closed=(next(val for key, val in shared_values if key == 'co2PurgeKeg1Closed')*100)
    print(f"purging with co2 {recure} times, co2 open for {co2Open/100} seconds, co2 closed for {co2Closed/100} seconds")
    
    while c <recure:
        GPIO.output(Co2_In, GPIO.HIGH)
        t=0
        while t<co2Open:
            sleep(0.01)
            t=t+1
        GPIO.output(Co2_In, GPIO.LOW)
        t=0
        while t<co2Closed:
            sleep(0.01)
            t=t+1
        c= c+1
    GPIO.output(keg1, GPIO.LOW)
    GPIO.output(keg2, GPIO.HIGH)
    c = 0
    co2PurgeKeg2Recure=(next(val for key, val in shared_values if key == 'co2PurgeKeg2Recure'))
    co2PurgeKeg2Open=(next(val for key, val in shared_values if key == 'co2PurgeKeg2Open')*100)
    co2PurgeKeg2Closed=(next(val for key, val in shared_values if key == 'co2PurgeKeg2Closed')*100)
    co2PurgeBothKegsOpen=(next(val for key, val in shared_values if key == 'co2PurgeBothKegsOpen')*100)
    while c<co2PurgeKeg2Recure:
        GPIO.output(Co2_In, GPIO.HIGH)
        t=0
        while t<co2PurgeKeg2Open:
            sleep(0.01)
            t=t+1
        GPIO.output(Co2_In, GPIO.LOW)
        t=0
        while t<co2PurgeKeg2Closed: 
            sleep(0.01)
            t=t+1
        c= c+1
    GPIO.output(keg1, GPIO.HIGH)
    GPIO.output(Co2_In, GPIO.HIGH)
    t=0
    while t<co2PurgeBothKegsOpen: 
        sleep(0.01)
        t=t+1
    GPIO.output(Co2_In, GPIO.LOW)
    t=0
    co2PurgeBothKegsClosed=(next(val for key, val in shared_values if key == 'co2PurgeBothKegsClosed')*100)
    while t<co2PurgeBothKegsClosed: #let paa come out after closing co2
        sleep(0.01)
        t=t+1
    GPIO.output(Paa_Out, GPIO.LOW)

def kegprssurize():
    global Pressurein
    global Pressureout
    global ErrNmbr
    GPIO.output(Co2_In, GPIO.HIGH)
    GPIO.output(keg1, GPIO.LOW)
    GPIO.output(keg2, GPIO.LOW)
    t=0
    while t<200:
        sleep(0.01)
        t=t+1
    checkpruessurecanceled()
    if Pressurein<(Pressuroutthresh+1):
        ErrNmbr =4
        Err(4)
    TK= time.time()
    TO= time.time()
    TT=TO-TK
    GPIO.output(keg1, GPIO.HIGH)
    GPIO.output(keg2, GPIO.HIGH)
    checkpruessurecanceled()
    kegpresuuredest= next(val for key, val in shared_values if key == 'kegPdestination')
    TimeOutPdestination=next(val for key, val in shared_values if key == 'TimeOutPdestination')
    PTimeWhenSensorDisabled= next(val for key, val in shared_values if key == 'PTimeWhenSensorDisabled')
    while Pressureout<kegpresuuredest:
        sleep(0.2)
        checkpruessurecanceled()
        TO= time.time()
        TT=TO-TK
        if TT>TimeOutPdestination: 
            print('Timed Out building Pressure: pressure is',Pressureout,'PSI, building pressure for 15 s') 
            sleep(PTimeWhenSensorDisabled)
            Pressureout= Pressuroutthresh+1
    if TT<7 and GPIO.input(pressure_cancel) == GPIO.LOW:
        TS=7-TT
        TTT=round(TT,1)
        TSS=round(TS,1)
        print('it took',TTT,'seconds to get to', Pressuroutthresh, 'PSI, pressurizing for',TSS,'more seconds')
        sleep(TS)
    if GPIO.input(pressure_cancel) == GPIO.HIGH:
        t=0
        print(f'pressure detect is off, building pressure for {PTimeWhenSensorDisabled} seconds') 
        while t<PTimeWhenSensorDisabled:
            sleep(0.01)
            t=t+1
    GPIO.output(Co2_In, GPIO.LOW)
 
def Cycle(current_log_id):
    print('start full Cycle')
    #start cycle and purge until btn is up
    db = init_firebase()
    log_ref = db.collection("Washer-Logs")
    with lock:
        procIND[0] = (procIND[0][0], 1)
    global ErrNmbr
    global Pressurein
    global Pressureout
    global full_Cycle_count
    GPIO.output(Outputs, GPIO.LOW)
    GPIO.output(InProceslight, GPIO.HIGH)
    GPIO.output(Main_Drain, GPIO.HIGH)
    GPIO.output(Ground_Pneu_valves, GPIO.HIGH)
    FirstAirPurgeRecure= next(val for key, val in shared_values if key == 'FirstAirPurgeRecure')
    FirstAirPurgeToff= next(val for key, val in shared_values if key == 'FirstAirPurgeToff')
    FirstAirPurgeTon= next(val for key, val in shared_values if key == 'FirstAirPurgeTon')
    AirPurge(FirstAirPurgeRecure,FirstAirPurgeTon,FirstAirPurgeToff)
    while GPIO.input(GBTN) == GPIO.LOW:
        AirPurge(FirstAirPurgeRecure,FirstAirPurgeTon,FirstAirPurgeToff) 
    #first water rinse and purge:
    t=0
    while t<50:
        sleep(0.01)
        t=t+1
    WaterSquirt()
    PostWaterPurgeRecure= next(val for key, val in shared_values if key == 'PostWaterPurgeRecure')
    PostWaterPurgeTon= next(val for key, val in shared_values if key == 'PostWaterPurgeTon')
    PostWaterPurgeToff= next(val for key, val in shared_values if key == 'PostWaterPurgeToff')
    AirPurge(PostWaterPurgeRecure,PostWaterPurgeTon,PostWaterPurgeToff) 
    #caustic rins
    print('starting Caustic rinse')
    causticrinse()
    #water rinse post caustic X3
    GPIO.output(Main_Drain, GPIO.HIGH)
    z= 0
    postCausticWaterRinseRecureEachRins=next(val for key, val in shared_values if key == 'postCausticWaterRinseRecureEachRins')
    postCausticWaterRinseOn=next(val for key, val in shared_values if key == 'postCausticWaterRinseOn')
    postCausticWaterRinseOf=next(val for key, val in shared_values if key == 'postCausticWaterRinseOf')
    while z<(next(val for key, val in shared_values if key == 'postCausticWaterRinseRecure')):
        print('post caustic rins #',z+1)
        WaterSquirt()
        AirPurge(postCausticWaterRinseRecureEachRins,postCausticWaterRinseOn,postCausticWaterRinseOf) #in betweein water rinse air purge - changeble vars
        z=z+1
    #paa sanitize
    print('starting Paa sanitation')
    paasanitize()
    print('Purging keg with Co2')
    #purge With CO2
    Co2purge()
    print('Building Pressure in keg to',Pressuroutthresh,'PSI')
    #build pressure
    kegprssurize()
    print('Full Cycle is sucssesfully over!')
    sleep(0.5)
    with lock:
        procIND[0] = (procIND[0][0], 0)
    Stdby()
    update_cycle_count(log_ref, 'full_cycle', 1,current_log_id)

     
def ShortCycle(current_log_id):
    print('start Short Cycle')
    #start cycle and purge until btn is up
    db = init_firebase()
    log_ref = db.collection("Washer-Logs")
    with lock:
        procIND[0] = (procIND[0][0], 1)
    global ErrNmbr
    global Pressurein
    global Pressureout
    global short_Cycle_count
    GPIO.output(Outputs, GPIO.LOW)
    GPIO.output(InProceslight, GPIO.HIGH)
    GPIO.output(Ground_Pneu_valves, GPIO.HIGH)
    #paa sanitize
    print('starting Paa sanitation')
    paasanitize()
    print('Purging keg with Co2')
    #purge With CO2
    Co2purge()
    print('Building Pressure in keg to',Pressuroutthresh,'PSI')
    #build pressure
    kegprssurize()
    print('Short Cycle sucssesfully over!')
    sleep(0.5)
    with lock:
        procIND[0] = (procIND[0][0], 0)
    Stdby()
    update_cycle_count(log_ref, 'Short_cycle', 1,current_log_id)
 
def purgecycle(current_log_id):
    db = init_firebase()
    log_ref = db.collection("Washer-Logs")
    with lock:
        procIND[0] = (procIND[0][0], 1)
    global Pressurein
    global Pressureout
    global purge_Cycle_count
    print('start keg purge cycle')
    GPIO.output(Outputs, GPIO.LOW)
    GPIO.output(Ground_Pneu_valves, GPIO.HIGH)
    GPIO.output(Main_Drain, GPIO.HIGH)
    GPIO.output(InProceslight, GPIO.HIGH)
    AirPurge(15,1,1)
    print('purge cycle sucssesfully  over!')
    with lock:
        procIND[0] = (procIND[0][0], 0)
    Stdby()
    update_cycle_count(log_ref, 'purge_cycle', 1,current_log_id)
    

def checkbtn():
    global Btnstatus
    Btnstatus = 0
    if GPIO.input(ErrBTN) == GPIO.HIGH:
        Btnstatus=3#err butoon
    if GPIO.input(GBTN) == GPIO.HIGH and GPIO.input(RBTN) == GPIO.LOW:
        Btnstatus=2#red buton
    if GPIO.input(RBTN) == GPIO.HIGH and GPIO.input(GBTN) == GPIO.LOW:
        Btnstatus=1#gree btn
    if GPIO.input(RBTN) == GPIO.LOW and GPIO.input(GBTN) == GPIO.LOW:
        Btnstatus=4#green and red
    if (next(val for key, val in buttons if key == 'green'))== 1:
        Btnstatus=1
    if (next(val for key, val in buttons if key == 'red'))== 1:
        Btnstatus=2

def shutdown(current_log_id_f):
    shutdown_started = False
    shutdown_push_time = 0
    shutdown_push_req = 10
    sucssesfully_update=Event()
    def update_and_delete():
        try:
            log_ref.document(current_log_id_f).update({"off": datetime.now(local_tz)})
            log = Live_log_ref.get()
            if log.exists:
                fields = log.to_dict().keys()
                updates = {field: firestore.DELETE_FIELD for field in fields}
                Live_log_ref.update(updates)
                sucssesfully_update.set()
        except Exception as e:
            print(f"Error during shutdown process: {e}")
    
    while True:
        while shutdown_push_time < shutdown_push_req:
            time.sleep(0.01)
            if GPIO.input(ShutdownBtn) == GPIO.HIGH and not shutdown_started:
                shutdown_push_time += 1
        print('Shutting down...')
        shutdown_process = Process(target=update_and_delete)
        shutdown_process.start()
        sleep(10)
        if sucssesfully_update.is_set():
            sleep(1)
            print("Keg washer is off")
            sleep(3)
        else:
            print("Failed to update off time and remove machine live logs.")
            shutdown_process.terminate()
        os.system("sudo systemctl poweroff")
        
def main(current_log_id):
    global ErrNmbr
    OutputstateH= None
    procind=0
    Pause=0
    stop=0
    push_req = 70
    Pauseproc= None
    fillproc = Process(target=filltanks)
    fillproc.start()
    Pause=0
    Stdby()
    print('Stdby set (for first time)')
    proc= None
    push_req = 40
    ErrNmbr=0
    starttime=0
    resumetime=0 
    pausedtime=0
    totaltime=0
    pauseddurationtime=0
    printtime=0
    RPtime=0
    minutes=00
    seconds=00
    
    def converttime(TT):
        global seconds
        global minutes        
        if TT<10:
            seconds=int(TT)
            print('00:0{}'.format(seconds))
        if TT>9 and TT<60:
            seconds=int(TT)
            print('00:{}'.format(seconds))
        if TT>60:
            M= round(TT/60,0)
            minutes=int(M)
            S=round((TT-(minutes*60)),0)
            seconds= int(S)
            if seconds<0:
                minutes=minutes-1
                seconds=seconds+60
            if minutes<9:
                if seconds>9:
                    print('0{}:{}'.format(minutes,seconds)) 
                if seconds<10:
                    print('0{}:0{}'.format(minutes,seconds))
            if minutes>9:
                if seconds>9:
                    print('{}:{}'.format(minutes,seconds)) 
                if seconds<10:
                    print('{}:0{}'.format(minutes,seconds))
                
    while True:
        db = init_firebase()
        log_ref = db.collection("Washer-Logs")
        pushTime = 0
        pressed = 0
        if stop==1:
            totaltime = (time.time() - starttime)
            printtime=round(totaltime,2)
            print('Stdby parameters set, program ran for-')
            converttime(printtime)
            fillproc = Process(target=filltanks)
            fillproc.start()
            proc= None
            push_req = 70
            ErrNmbr=0
            procind=0
        while pushTime < push_req:#butoon examin
            checkbtn()
            sleep(0.01)
            pushTime = pushTime+1
            if Btnstatus==3 and ErrNmbr!=5:#checks if emergancy button is pressed
                push_req=20
                pressed=1
            if Pause==1 and Btnstatus==2 or Pause==1 and Btnstatus==4:
                push_req=20
            if Btnstatus==0: #checks if no butoon is pressed
                pushTime=0
                stop=0
                if proc and GPIO.input(GBTN) == GPIO.HIGH:
                    pressed = 1
            if proc!=None and proc.is_alive()==False:
                stop=1
                pushTime=push_req+1
        if pressed ==1: #will enter this loop only if a procces is runing and triger button was reliesed or in an emergancy eror           
            if Btnstatus==1:#green button scenarios
                if procind==1 or procind==3: 
                    if Pause==1: #checks if a cycle is currently Paused and green button was pressed log enogh to resume..
                        if Pauseproc:#if Pause indicator is on, turn it off
                            Pauseproc.terminate()
                            Pauseproc=None
                            Pause=0
                        GPIO.output(Outputs, GPIO.LOW)
                        if OutputstateH:
                            GPIO.output(OutputstateH, GPIO.HIGH)
                        os.kill(proc.pid, signal.SIGCONT)
                        resumetime= time.time()
                        pauseddurationtime=resumetime-pausedtime
                        starttime= starttime+pauseddurationtime
                        printtime=round(RPtime,2)
                        print('resume','Paused for',round(pauseddurationtime,2),' seconds')
                        converttime(printtime)
                        push_req = 20
                        pressed=0
                    if Pause ==0 and pressed==1:#checks if standert cycle was trigered and not Paused
                        if proc.is_alive()==True and procIND[0][1]==1: #checks if cycle is active via checking standby light- for pausing
                            x=0
                            OutputstateH=[]
                            while x<16:
                                r=(Outputs[x])
                                if GPIO.input(r) == GPIO.HIGH:
                                    OutputstateH.append(r)
                                x=x+1
                            i=6
                            if i in OutputstateH:
                                totaltime = (time.time() - starttime)
                                printtime=round(totaltime,2)
                                proc.terminate()
                                Stdby()
                                stop=1 
                                proc=None
                                ErrNmbr = 0
                                print('stop/Eror wss reset by green buton')
                                converttime(printtime)
                            else:
                                os.kill(proc.pid, signal.SIGSTOP)
                                Pauseproc= Process(target=Pauseindicator)
                                Pauseproc.start()
                                pausedtime= time.time()
                                RPtime= (time.time() - starttime)
                                printtime=round(RPtime,2)                            
                                print('Pause')
                                converttime(printtime)
                                Pause=1
                                push_req = 70
                        if proc.is_alive()==True and procIND[0][1]==0:
                            proc.terminate()
                            proc=None
                            procind=0
                if procind==2 or procind==4:#if another proc was trigered (emergancy eror/keg empty cycle) it will stop and return to standby
                    if proc.is_alive()==True and procIND[0][1]==0:
                            proc.terminate()
                            proc=None
                            procind=0
                    if Pause==1:#if Pause indicator is on, turn it off
                        Pauseproc.terminate()
                        Pauseproc=None
                        Pause=0
                    if proc.is_alive()== True:
                        totaltime = (time.time() - starttime)
                        printtime=round(totaltime,2)
                        proc.terminate()
                        Stdby()
                        stop=1 
                        proc=None
                        ErrNmbr = 0
                        print('stop/Eror wss reset by green buton')
                        converttime(printtime)
            if Btnstatus==2:#red button will stop any procces and return to standby
                if Pause==1:#if Pause indicator is on, turn it off
                    Pauseproc.terminate()
                    Pauseproc=None
                    Pause=0
                if proc.is_alive()== True:
                    totaltime = (time.time() - starttime)
                    printtime=round(totaltime,2)
                    proc.terminate()
                    Stdby()
                    stop=1 
                    proc=None
                    ErrNmbr = 0
                    print('stop/Eror wss reset by red buton')
                    converttime(printtime)
            if Btnstatus==3:#emergancy button will stop any procces and return to standby
                if Pause==1:#if Pause indicator is on, turn it off
                    Pauseproc.terminate()
                    Pauseproc=None
                    Pause=0
                if proc:
                    proc.terminate()
                    totaltime = (time.time() - starttime)
                    printtime=round(totaltime,2)
                    print('total time of cycle was:')
                    converttime(printtime)
                ErrNmbr = 5
                proc = Process(target=Err,args=(5,))
                proc.start()
                procind=4
                push_req = 20
            if Btnstatus ==4:#green & red buttons toogether will stop any procces and return to standby/
                if Pause==1:#if Pause indicator is on, turn it off
                    Pauseproc.terminate()
                    Pauseproc=None
                    Pause=0
                if proc.is_alive()== True:
                    totaltime = (time.time() - starttime)
                    printtime=round(totaltime,2)
                    print('total time of cycle was:')
                    converttime(printtime)
                    proc.terminate()
                    Stdby()
                    stop=1 
                    proc=None
                    ErrNmbr = 0
                    print('stop/Eror wss reset by red and green buton')
        if proc==None and stop ==0 and ErrNmbr==0:#if no proc is runing, and procces wasnt just aborted- will start apropriete procces
            print('starting a cycle(full/short/purge)')
            if fillproc.is_alive()== True:
                fillproc.terminate()
            starttime = time.time()
            print("Start Time: 00:00",)
            if Btnstatus==1:
                proc = Process(target=Cycle, args=(current_log_id,))
                procind=1
            if Btnstatus == 2:
                proc = Process(target=purgecycle, args=(current_log_id,))
                procind=2
            if Btnstatus==4:
                proc = Process(target=ShortCycle, args=(current_log_id,))
                procind=3
            GPIO.output(Outputs, GPIO.LOW)
            proc.start()
            push_req=10
        checkbtn()
    
async def boot():   
    global ErrNmbr
    global Pressurein
    global Pressureout
    global VLout
    global VLin
    global Callsucsess
    global current_log_id
    Errproc= None
    testsucsess=0
    pressed=0
    current_log_id=datetime.now().isoformat()
    
    Heatproc = Process(target=protectheat)
    Heatproc.start()
    
    
    Shutproc = Process(target=shutdown,args=(current_log_id,))
    Shutproc.start()
    
    
    def fetcing_signal():
        GPIO.output(Outputs, GPIO.LOW)
        GPIO.output(InProceslight, GPIO.HIGH)
        z=0
        while z<1:
            GPIO.output(Errlight, GPIO.HIGH)
            sleep(0.3)
            GPIO.output(Errlight, GPIO.LOW)
            sleep(0.3)
            
    prefetch_signal=Process(target=fetcing_signal)
    prefetch_signal.start()
    
    sleep(10)###
    try:
        log= Live_log_ref.get()
        fields = log.to_dict().keys()
        updates = {field: firestore.DELETE_FIELD for field in fields}
        x=0
        while (x==0):
            snap = Live_log_ref.get()
            snap_dict = snap.to_dict() if snap.exists else {}
            if len(snap_dict) != 0:  # Check if the document is not empty
                try:
                    Live_log_ref.update(updates)
                except Exception as e:
                    print (f"failed to delete live logs, {e}")
            else:
                x = 1 
    except Exception as e:
        print (f"failed to fetch live logs, {e}")
    try:
        log_ref.document(current_log_id).set({"On":datetime.now(local_tz)})
    except Exception as e:
        print (f"failed to update 'on' time, {e}") 
    await fetch_settings_once()
    
    print("Boot process initialized")
    print('heat elament protection active')
    print('Shutdown protection active')
    
    prefetch_signal.terminate()
    GPIO.output(Outputs, GPIO.LOW)
    
    def preboot():
        GPIO.output(Outputs, GPIO.LOW)
        x=0
        while x<3:
            a=statuslights[x]
            GPIO.output(statuslights, GPIO.LOW)
            GPIO.output(a, GPIO.HIGH)
            x=x+1
            sleep(0.5)
            if x==3:
                x=0
                GPIO.output(statuslights, GPIO.LOW)
        if GPIO.input(pressure_cancel) == GPIO.LOW:
            print('Launching test cycle')
            
    prebootproc = Process(target=preboot)
    prebootproc.start()

    DbInfoProc = Process(target=get_current_settings,)
    DbInfoProc.start()
    
    GPIO.output(Outputs, GPIO.LOW) 
    sleep(2)
    B=next(val for key, val in shared_values if key == 'preboobotMeteg')
    if (B==1):
        print("Pre Boot test enabled online, launching preboot")
    elif (B==0):
        print("Pre Boot test disabled online, skipng the preboot")
        prebootproc.terminate()
        testsucsess=1
    while B>0:
        ErrNmbr=0
        if pressed==0:
            print('Click green buton to start test cycle')
        if Errproc==None:
            if pressed==1:
                print('Click green button to reset')
            pressed=0
        Boot_push_req = 5
        Boot_pushTime = 0
        EMRG=0
        while Boot_pushTime < Boot_push_req:
            sleep(0.01)
            checkbtn()
            if Btnstatus==0:
                if EMRG==1:
                    prebootproc = Process(target=preboot)
                    prebootproc.start()
                    EMRG=0
            if Btnstatus==1:
                Boot_pushTime=Boot_pushTime+1
                GPIO.output(Errlight,GPIO.LOW)
            else:
                Boot_pushTime=0
                pressed=0
                if Errproc:
                    pressed=1
            if Btnstatus==3:
                prebootproc.terminate()
                GPIO.output(statuslights, GPIO.LOW)
                GPIO.output(Errlight,GPIO.HIGH)
                print('Emergancy BTN Err #5')
                EMRG=1
                sleep(0.5)
            if Btnstatus==0 and prebootproc.is_alive()== True and Errproc:
                GPIO.output(statuslights, GPIO.LOW)
                GPIO.output(Ground_Pneu_valves, GPIO.HIGH)
                prebootproc.terminate()
            if GPIO.input(FillCaus) == GPIO.LOW:
                GPIO.output(Ground_Pneu_valves, GPIO.HIGH)
                GPIO.output(Water_In, GPIO.HIGH)   
                GPIO.output(Caustic_In, GPIO.HIGH)
            if GPIO.input(FillPaa) == GPIO.LOW:
                GPIO.output(Ground_Pneu_valves, GPIO.HIGH)
                GPIO.output(Water_In, GPIO.HIGH)   
                GPIO.output(Paa_In, GPIO.HIGH)
            if GPIO.input(FillCaus) == GPIO.HIGH and GPIO.input(FillPaa) == GPIO.HIGH:
                GPIO.output(Water_In, GPIO.LOW)
            if GPIO.input(FillCaus) == GPIO.HIGH:
                GPIO.output(Caustic_In, GPIO.LOW)
            if GPIO.input(FillPaa) == GPIO.HIGH:
                GPIO.output(Paa_In, GPIO.LOW)
        if pressed==1:
            Errproc.terminate()
            prebootproc.terminate()
            prebootproc = Process(target=preboot)
            prebootproc.start()
            Errproc=None
        if Errproc==None and pressed==0 and testsucsess==0:
            prebootproc.terminate()           
            if GPIO.input(pressure_cancel) == GPIO.LOW:
                global Pressurein
                global Pressureout
                GPIO.output(statuslights, GPIO.HIGH)
                GPIO.output(Errlight, GPIO.LOW)
                testsucsess=0
                print('testing water input')
                GPIO.output(Water_In, GPIO.HIGH)
                sleep(2)
                if GPIO.input(pressure_cancel) == GPIO.HIGH:
                    print('pressure check canceled')
                    Pressurein=10000
                if GPIO.input(pressure_cancel) == GPIO.LOW:
                    checkpruessurecanceled()
                if Pressurein<Pressurinthresh:
                    ErrNmbr =2
                    prebootproc.terminate()
                    GPIO.output(Outputs, GPIO.LOW)
                    GPIO.output(Ground_Pneu_valves, GPIO.HIGH)
                    GPIO.output(Errlight, GPIO.HIGH)
                    GPIO.output(Main_Drain, GPIO.HIGH)
                    Errproc = Process(target=Err,args=(2,))
                    Errproc.start()
                if ErrNmbr<1:
                    print('testing Air input')
                    GPIO.output(Water_In, GPIO.LOW)
                    sleep(0.1)
                    GPIO.output(Air_In, GPIO.HIGH)
                    sleep(2)
                    GPIO.output(keg1, GPIO.LOW)
                    GPIO.output(keg2, GPIO.LOW)
                    sleep(2)
                    if GPIO.input(pressure_cancel) == GPIO.HIGH:
                        print('pressure check canceled')
                        Pressurein=10000
                    if GPIO.input(pressure_cancel) == GPIO.LOW:
                        checkpruessurecanceled()
                    if Pressurein<Pressurinthresh:
                        ErrNmbr =1
                        prebootproc.terminate()
                        GPIO.output(Outputs, GPIO.LOW)
                        GPIO.output(Ground_Pneu_valves, GPIO.HIGH)
                        GPIO.output(Errlight, GPIO.HIGH)
                        Errproc = Process(target=Err,args=(1,))
                        Errproc.start()
                if ErrNmbr<1:
                    print('test caustic input')
                    GPIO.output(keg1, GPIO.HIGH)
                    GPIO.output(keg2, GPIO.HIGH)
                    sleep(2)
                    GPIO.output(Air_In, GPIO.LOW)
                    sleep(0.2)
                    GPIO.output(Water_In, GPIO.HIGH)
                    sleep(0.5)
                    GPIO.output(Water_In, GPIO.LOW)
                    GPIO.output(Caustic_In, GPIO.HIGH)
                    GPIO.output(Pump, GPIO.HIGH)
                    sleep(2)
                    GPIO.output(keg1, GPIO.LOW)
                    GPIO.output(keg2, GPIO.LOW)
                    sleep(2)
                    if GPIO.input(pressure_cancel) == GPIO.HIGH:
                        print('pressure check canceled')
                        Pressurein=10000
                    if GPIO.input(pressure_cancel) == GPIO.LOW:
                        checkpruessurecanceled()
                    if Pressurein<Pumppressurethresh:
                        ErrNmbr =3
                        prebootproc.terminate()
                        GPIO.output(Outputs, GPIO.LOW)
                        GPIO.output(Ground_Pneu_valves, GPIO.HIGH)
                        GPIO.output(Errlight, GPIO.HIGH)
                        Errproc = Process(target=Err,args=(3,))
                        Errproc.start()
                if ErrNmbr<1:
                    print('testing Paa input ')
                    GPIO.output(keg1, GPIO.HIGH)
                    GPIO.output(keg2, GPIO.HIGH)
                    sleep(2)
                    GPIO.output(Caustic_In, GPIO.LOW)
                    GPIO.output(Pump, GPIO.LOW)
                    GPIO.output(Water_In, GPIO.HIGH)
                    sleep(0.5)
                    GPIO.output(Water_In,GPIO.LOW)
                    sleep(0.1)
                    GPIO.output(Paa_In, GPIO.HIGH)
                    GPIO.output(Pump, GPIO.HIGH)
                    sleep(2)
                    GPIO.output(keg1, GPIO.LOW)
                    GPIO.output(keg2, GPIO.LOW)
                    sleep(2)
                    if GPIO.input(pressure_cancel) == GPIO.HIGH:
                        print('pressure check canceled')
                        Pressurein=10000
                    if GPIO.input(pressure_cancel) == GPIO.LOW:
                        checkpruessurecanceled()
                    if Pressurein<Pumppressurethresh:
                        ErrNmbr =7
                        prebootproc.terminate()
                        GPIO.output(Outputs, GPIO.LOW)
                        GPIO.output(Ground_Pneu_valves, GPIO.HIGH)
                        GPIO.output(Errlight, GPIO.HIGH)
                        Errproc = Process(target=Err,args=(7,))
                        Errproc.start()
                if ErrNmbr<1:
                    print('testing Co2 input')
                    GPIO.output(keg1, GPIO.HIGH)
                    GPIO.output(keg2, GPIO.HIGH)
                    sleep(2)
                    GPIO.output(Paa_In, GPIO.LOW)
                    GPIO.output(Pump, GPIO.LOW)
                    sleep(0.1)
                    GPIO.output(Co2_In, GPIO.HIGH)
                    sleep(2)
                    GPIO.output(keg1, GPIO.LOW)
                    GPIO.output(keg2, GPIO.LOW)
                    sleep(2)
                    if GPIO.input(pressure_cancel) == GPIO.HIGH:
                        print('pressure check canceled')
                        Pressurein=10000
                    if GPIO.input(pressure_cancel) == GPIO.LOW:
                        checkpruessurecanceled()
                    if Pressurein<Pressuroutthresh:
                        ErrNmbr =4
                        prebootproc.terminate()
                        GPIO.output(Outputs, GPIO.LOW)
                        GPIO.output(Ground_Pneu_valves, GPIO.HIGH)
                        GPIO.output(Errlight, GPIO.HIGH)
                        Errproc = Process(target=Err,args=(4,))
                        Errproc.start()
                if ErrNmbr<1:
                    GPIO.output(Co2_In, GPIO.LOW)
                    GPIO.output(keg1, GPIO.HIGH)
                    GPIO.output(keg2, GPIO.HIGH)
                    GPIO.output(Water_In, GPIO.HIGH)
                    sleep(2)
                    GPIO.output(Water_In, GPIO.HIGH)
                    sleep(4)
                    GPIO.output(Water_In, GPIO.LOW)
                    GPIO.output(Air_In, GPIO.HIGH)
                    sleep(1)
                    GPIO.output(Air_In, GPIO.HIGH)
                    sleep(3)
                    GPIO.output(keg1, GPIO.LOW)
                    GPIO.output(keg2, GPIO.LOW)
                    GPIO.output(Air_In, GPIO.LOW)
                    GPIO.output(Main_Drain, GPIO.LOW)
                    GPIO.output(statuslights, GPIO.LOW)
                    testsucsess=1
                    x=0
            else:
                testsucsess=1
                x=0
        if testsucsess==1:
            while x<3:
                GPIO.output(statuslights, GPIO.HIGH)
                sleep(0.5)
                GPIO.output(statuslights, GPIO.LOW)
                sleep(0.5)
                x=x+1 
        print('pre boot cycle compleete!')
        B=B-1
    GPIO.output(Ground_Pneu_valves, GPIO.HIGH)
    checkbtn()
    main(current_log_id)

def launch():
    import asyncio
    sys.stdout = FirestoreLogger()
    asyncio.run(boot()) 
     
if __name__ == "__main__":    
    launch()