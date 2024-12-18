
## README: Keg Washer System (Version 5.2.1)

### Overview
The Keg Washer System automates the cleaning and sanitizing of beer kegs, 
the system is DIY built integrating hardware mostly bought on ali-express and software components. 
It features precise cycle control, real-time parameter updates via Firebase, and a user-friendly web interface for monitoring and customization.
---

### Motivations
This system was built buy a brewer who learned to write code and loves DIY, not a machine engineer who learned how to brew… 😊
therefore the machine may not be fully perfect, things could be done better! Please let me know if you have suggestions on **Yisrael@atlow.co.il**
---

### Features
1. **Preboot Test Cycle**: Verifies the functionality of sensors, valves, and relays (~2 minutes).
2. **Full Cycle**:
   - **Air Purge**: Clears residual beer using compressed air until the green button is released.
   - **Water Rinse**: Rinses the kegs with water (~30 seconds).
   - **Air Purge**: Purges the system post-rinse (~20 seconds).
   - **Caustic Rinse**: Cleans with caustic solution (~60 seconds). The caustic solution could be replaced with PBW or other cleaning aid of your choice.
   - **After Caustic Rinse**: The system is purged with air and rinsed with water (the default is 3 times) (~80 seconds).
   - **Sanitization**: Uses peracetic acid (~90 seconds). PAA can be replaced with StarSan or sanitizer of your choice.
   - **CO2 Purge**: Purges the system post-sanitization (~60 seconds).
   - **CO2 Pressurization**: Builds keg pressure (~45 seconds).
3. **Sanitation Cycle**: Focuses solely on peracetic acid sanitization (~3 minutes).
4. **Purge Cycle**: Uses compressed air to clear full kegs (~2 minutes).
---

### Hardware Requirements
1. **Raspberry Pi**
2. **Power Supply**:
   - 220VAC input.
   - 220VAC to 24VDC converter.
   - Power supply for Raspberry Pi.
3. **Actuators**:
   - 1 pump (220VAC relay-controlled).
   - 16 24V relays for solenoid valves and lights.
   - 2 220VAC relays.
   - 1 220VAC relay with adjustable timer.
   - 1 electric switch (to turn off the pressure system if wanted).
   - 3 signal lamps.
   - 1 on/off switch.
4. **Sensors**:
   - 2 pressure sensors connected via ADS1115.
   - ADC converter.
   - 1 water level float sensor.
5. **Buttons**:
   - Green, red, emergency stop, fill water, and fill caustic tank switches.
6. **Heating Element**:
   - Controlled via a 220VAC relay.
7. **Pneumatic Components**:
   - 10 pneumatic solenoids.
   - 10 pneumatic valves.
8. **Miscellaneous**:
   - Electric project box.
   - 2 keg couplers.
   - Metal framing for electric box, kegs, pump, caustic, and PAA tanks.

---

### Setup Instructions
#### Hardware
1. Refer to the wiring diagram (included) for detailed connections between GPIO pins, relays, and components.
2. **GPIO Assignments**:
   ```
   Green BTN = 25
   Red BTN = 27
   Emergency BTN = 24
   Water_Level sensor = 10
   Pressure_cancel = 18
   Shutdown BTN = 22
   Fill Caustic switch = 23
   Fill PAA Switch = 14
   Standby light = 11
   In Process light = 9
   Error light = 6
   Pump = 13
   Heat = 5
   Main_Drain = 19
   Water_In = 26
   Air_In = 0
   Caustic_In = 15
   Caustic_Out = 7
   PAA_In = 8
   PAA_Out = 16
   CO2_In = 21
   Keg1 = 12
   Keg2 = 20
   ```
3. Ensure all power supplies are stable and securely connected.

#### Troubleshooting
1. **Relay Fails to Trigger**: Inspect relay and GPIO pin connections.
2. **Button Unresponsive**: Confirm GPIO pins and button wiring.
3. **Status Lights Not Working**: Verify GPIO outputs and light connections.
4. **Firebase Connection Issues**: Confirm internet connectivity and credentials.
5. **Kegs Don’t Empty**: Switch to a stronger compressor or use extended purge times.

---

### Software
#### Python Script
Install dependencies:
```bash
sudo apt-get install python3-pip
pip3 install RPi.GPIO firebase-admin Adafruit-circuitpython-ads1x15 pytz
```
Create a service file to ensure that the keg washer program runs on boot of the raspberry pi:
If you don’t want your raspberry pi to run the keg washer program automatically on boot skip the following stages.

```bash
sudo nano /etc/systemd/system/kegwasher.service
```

Fill the service file with these details, make sure to mention your own .env with firebase credentials (check firbase setup):

```bash
[Unit]
Description=My Awesome Service
Wants=network-online.target
After=network-online.target nss-lookup.target

[Service]
EnvironmentFile=/home/raspberry/Desktop/keg-washer-firebase-adminsdk-7ww1i-aa79>
ExecStart=/usr/bin/python3 /home/raspberry/Desktop/KwV5.py
WorkingDirectory=/home/raspberry/Desktop
StandardOutput=inherit
StandardError=inherit
Restart=on-failure
RestartSec=10s
User=raspberry
Environment="PATH=/usr/bin:/usr/local/bin"
[Install]
WantedBy=multi-user.target
```

After creating the service file, reload systemd to read the new service configuration:

```bash
sudo systemctl daemon-reload
```

Enable the service to start on boot, and then start the service immediately:

```bash
sudo systemctl enable kegwasher.service sudo systemctl start myapp.service
```


---
If you skipped creating the service file- on each time you want to run the keg washer-
Run the script:
```bash
python3 KwV5.1.7.py
```

---

### Python Code Explained
# Keg Washer System Python Script Overview

The Python script for the keg washer system is highly modular, with each function playing a critical role in the automated cleaning, sanitizing, and error-handling process for beer kegs. Below, I've elaborated on each function to give you a more descriptive understanding of their purpose and functionality, organized into logical groups based on their role in the system.

## Function Groups

1. **Cycle Management Functions**: Functions that handle the overall cleaning, sanitizing, and pressurizing cycles, providing an overview of what each cycle entails and detailing the flow of action functions.
2. **Action Functions**: Functions called within cycles to perform specific cleaning or sanitizing actions.
3. **Supporting Functions**: Functions that provide support during cycles, such as pressure checks or conversions.
4. **Background Functions**: Functions that run continuously to support system safety and operation.
5. **Utility Functions**: Functions that manage the system setup, error handling, and overall workflow.

## Detailed Descriptions

### Cycle Management Functions

1. **Cycle()**: The `Cycle()` function initiates a complete cleaning, sanitizing, and pressurizing cycle. It sequentially manages all the stages of cleaning, including air purging, water rinsing, caustic rinsing, and final pressurization. This function ensures that the entire cleaning process runs smoothly and thoroughly, leaving the kegs clean, sanitized, and pressurized for immediate use.

   **Flow of Actions**:
   - `AirPurge()`: Begins with purging the keg with compressed air to remove any initial residues.
   - `WaterSquirt()`: Performs a thorough rinse with water to clean out the inside of the keg.
   - `AirPurge()`: Another air purge follows to ensure all water is expelled.
   - `causticrinse()`: Introduces caustic solution to break down organic matter inside the keg.
   - `AirPurge()`: Ensures any remaining caustic is expelled.
   - `WaterSquirt()`: Rinses the keg to remove the caustic residue.
   - `paasanitize()`: Applies peracetic acid (PAA) for final sanitization of the keg.
   - `Co2purge()`: Uses CO2 to expel any remaining PAA and prepare the keg for pressurization.
   - `kegprssurize()`: Pressurizes the keg with CO2 to ensure it is ready for use.

2. **ShortCycle()**: The `ShortCycle()` function runs a shortened version of the complete cycle, focusing primarily on quick sanitization. This cycle skips the caustic rinse, making it ideal for situations where a fast turnaround is required, such as when kegs are needed urgently or when they are already mostly clean and only require final sanitization.

   **Flow of Actions**:
   - `paasanitize()`: Applies PAA to sanitize the keg.
   - `Co2purge()`: Uses CO2 to remove the PAA and prepare the keg for use.
   - `kegprssurize()`: Pressurizes the keg to ensure it is ready for immediate use.

3. **purgecycle()**: The `purgecycle()` function is designed to clear any residual contents from the kegs without running a complete cleaning cycle. This function is used to empty kegs and prepare them for maintenance or storage by purging with air to ensure all contents are removed.

   **Flow of Actions**:
   - `AirPurge()`: Repeatedly purges the keg with air to ensure all residual contents are removed, preparing the system for the next cycle or maintenance.

### Action Functions

1. **AirPurge(Recure, purgetimeon, purgetimeoff)**: The `AirPurge()` function is used to purge the kegs with compressed air. It repeats the purge operation a specified number of times (`Recure`), with controlled durations for the purge (`purgetimeon`) and rest (`purgetimeoff`). This step is essential for removing any residual liquid or contaminants from the kegs, ensuring they are clean and dry before proceeding to the next stage of the cleaning cycle. The function also includes pressure checks to verify that the system is operating within safe parameters.
2. **WaterSquirt()**: The `WaterSquirt()` function manages the water rinsing process, where the keg is flushed with water to remove any remaining residue. It controls the timing and sequence of water flow, allowing for multiple squirt types—including medium, short, and long squirts—based on predefined settings. This flexibility ensures that the kegs are thoroughly cleaned before chemical sanitization. The function also checks pressure to confirm that the water is being dispensed correctly and safely.
3. **causticrinse()**: This function is responsible for the caustic rinse stage of the cleaning process. It manages the flow of caustic solution through the keg, as well as the pressurization and depressurization cycles. It also handles pressure checks to make sure the rinse is proceeding as intended. This stage is critical for breaking down organic matter inside the keg, and the function ensures that all surfaces are in contact with the caustic for an adequate amount of time to achieve effective cleaning.
4. **PumpSquirt(Purge)**: The `PumpSquirt()` function controls the pump to squirt either caustic or PAA into the keg for sanitation. Depending on the selected purge type (air or CO2), it determines the appropriate number of squirts and duration for each squirt. This helps ensure that the kegs are properly sanitized with the correct chemical and that the internal surfaces are exposed to the cleaning agents for the optimal amount of time.
5. **paasanitize()**: The `paasanitize()` function handles the sanitization process using PAA (peracetic acid). It controls various outputs to pump PAA into the keg, maintaining adequate pressure throughout the process. After sanitizing, it uses CO2 to purge the PAA, ensuring that the keg is ready for use. Peracetic acid is a powerful oxidizing agent used as a sanitizer due to its effectiveness in killing bacteria, viruses, and other pathogens without leaving harmful residues. This function plays a key role in the final sanitization, ensuring that no harmful bacteria or residues are left inside the keg.
6. **Co2purge()**: The `Co2purge()` function uses CO2 gas to purge the kegs after the PAA sanitization step. The function alternates CO2 between the kegs, maintaining proper timing for opening and closing the CO2 valves. This process ensures that all excess liquid or remaining PAA is expelled from the keg, leaving it pressurized and free from any contaminants or oxygen. The function also includes checks to make sure that sufficient pressure is being maintained throughout the purge.
7. **kegprssurize()**: This function pressurizes the keg with CO2 until the desired pressure is reached. It continuously monitors the input and output pressure values to verify that the keg is properly pressurized. If the system detects any anomalies, such as the pressure taking too long to build, it will adjust accordingly or raise an error. This step is crucial for preparing the keg for immediate use in the dispensing process, ensuring that it is properly pressurized to maintain product quality.

### Supporting Functions

1. **convert_pressure()**: This function reads the raw analog values from the pressure sensors connected to the ADS1115 ADC, converts them into meaningful pressure readings in PSI, and updates global variables for input and output pressure. The conversion takes into account calibration offsets (VLin and VLout) and scales the raw voltage accordingly. Accurate pressure readings are critical for the proper functioning of the cleaning and sanitizing cycles, as they help ensure that the system maintains the necessary pressure during different stages of keg processing.
2. **checkpruessurecanceled()**: This function monitors if the pressure check process has been manually canceled by the operator. It uses a physical button input to determine whether the pressure metering should be turned off. If canceled, the pressure values are set to extremely high or zero to indicate that the process has been interrupted. This safety measure allows operators to manually intervene when needed, ensuring that unexpected conditions can be addressed promptly without damaging the system.

### Background Functions

1. **protectheat()**: The purpose of this function is to safeguard the heating element by monitoring the water level. The heating element is switched off when the water level sensor indicates a low level, and it is turned on when the water level is adequate. This ensures that the heating element is never exposed to conditions that could lead to overheating, such as operating without sufficient water. The function runs continuously to provide real-time protection, preventing damage to the equipment and ensuring operator safety.

2. **get_current_settings()**: This function is responsible for continuously fetching the latest configuration parameters from Firebase. It retrieves data from the "parameters" collection in Firestore and updates a shared list of settings used throughout the program. This allows real-time synchronization between the web interface and the physical keg washer system. It ensures that any parameter changes made by users, such as adjusting the cleaning cycle time or changing pressure thresholds, are reflected in the operation without requiring a restart. Additionally, it updates the last connection timestamp in the Firestore database, ensuring that system status is logged and that the device is actively connected to the network.
3. **filltanks()**: The `filltanks()` function is responsible for managing the filling of different tanks, including caustic and peracetic acid (PAA), based on the inputs from GPIO pins. These GPIO pins are connected to switches that can be manually activated to fill the tanks with water or other agents, but this feature is only enabled when a cycle is not running. The function ensures that the cleaning agents are available in the required quantities for the subsequent cleaning cycle stages, maintaining the effectiveness of the washing and sanitizing process.
4. **shutdown()**: This function monitors the shutdown button. The shut down button is “pressed” as long the machine on/off switch is on. Once the on/off switch is turned off- a the Raspberry pi still gets power for a minute, but the power button is no longer pressed which powers off the system when it has still has power. It provides a controlled shutdown mechanism to prevent abrupt power losses, which could damage the system or result in incomplete cleaning cycles. By ensuring that the shutdown process is deliberate and verified, it protects both the hardware and the cleaning process.
5. **checkbtn()**: The `checkbtn()` function monitors the status of various control buttons, such as the green (start), red (stop), and emergency buttons, and updates the global button status variable accordingly. This function is crucial for user interaction, allowing the operator to control the keg washer, pause or stop cycles, or initiate emergency stops if necessary. It provides a direct link between physical button presses and the corresponding system behavior.
6. **Pauseindicator()**: This function visually signals that the keg washer system is paused. It turns on the green standby light and repeatedly blinks the orange in-process light until the system resumes operation. This visual cue helps operators understand the system status at a glance and ensures that the system's paused state is clearly communicated, minimizing confusion during manual interventions or troubleshooting.

### Utility Functions

1. **Err(ErrNmbr)**: This error-handling function is designed to manage and signal different types of errors in the system. Depending on the error number (`ErrNmbr`), it triggers specific outputs, such as activating lights or controlling solenoid valves. Each error corresponds to a specific issue, such as:

   - Err #1: Air input failure.
   - Err #2: Water input failure.
   - Err #3: Caustic input failure.
   - Err #4: CO2 input failure.
   - Err #5: Emergency button pressed.
   - Err #6: Timeout while building pressure.
   - Err #7: PAA input failure.

By using visual indicators (red error light) and controlling relevant outputs, the function provides clear feedback to the operator, helping to identify and resolve problems efficiently.

2. **fetch_settings_once()**: This function works similarly to `get_current_settings()` but runs only once. It is used to initialize key parameters before the system begins a cycle. By fetching the settings only once, it ensures that the keg washer starts with the correct initial configuration. This setup is essential for configuring operational parameters, such as timing for each cycle phase or pressure limits, providing a stable starting point before entering the main operation loop.

3. **Stdby()**: The `Stdby()` function resets the keg washer system to standby mode. It clears all outputs and sets up the GPIO pins for input and output, preparing the system for a new cycle. It also turns on the green standby light, signaling that the system is ready and waiting for user input to begin a cleaning cycle. This function is crucial for ensuring that all components are in a known state before initiating a new operation, reducing the risk of unexpected behavior.

4. **boot()**: The `boot()` function initializes critical services and prepares the system for normal operation. It starts necessary safety processes like heat element protection and shutdown monitoring, then runs a series of initial checks to ensure all components are functioning properly. If successful, it calls the `main()` function to start the regular operational flow. This boot process is crucial for ensuring the system is in a stable and ready state before initiating any keg cleaning operations.
5. **main()**: The `main()` function acts as the primary operational loop for the keg washer system. It continuously checks the button inputs, handles process flow, manages different cleaning cycles, and controls how the system responds to user inputs. It also manages the transition between different states, such as pausing, resuming, or stopping cycles, and starts appropriate processes based on button interactions. This function is essential for orchestrating the various subprocesses and ensuring the entire system operates as intended.




In summary, the keg washer Python script is meticulously designed to manage the complete automation of keg cleaning and sanitization, ensuring safety, efficiency, and proper functionality at each stage. Each function plays a specific role, from monitoring inputs and handling errors to controlling valves, pumps, and indicators, all while maintaining real-time synchronization with the Firebase database for dynamic operation control.


---

#### Frontend
Deploy the web interface locally or on a server using:
```bash
python3 -m http.server
```
Using GitHub Pages is a good option as well.  
Make sure to change the port address to your server's port (see Backend description).

#### Backend Description
The backend, written in `index.js`, is a Node.js application using the Express framework.  
It handles Firebase authentication and database interactions. Key features include user login, parameter updates, and error handling.  
A good option for running the backend server is **Render.io**, which can build and deploy a Node server.  
Make sure to create a cron job on **cronjob.com** to ping the server and keep it "awake" every 15 minutes.

---

### Firebase Setup Guide
1. Go to Firebase Console and create a new project.
2. Add your app to the Firebase project and generate configuration files.
3. Enable Firestore and set up collections like `parameters` and `buttons` as required.
4. Enable email/password authentication in the Firebase Console.
5. Generate a private key JSON file for Firebase Admin SDK and update the backend and Python scripts with their location and environment secrets.

---

### Wiring Diagram
Refer to the provided wiring diagram for setup and GPIO pin connections.

---

For more details, refer to the User Manual or to Documentation folder on this repository.
