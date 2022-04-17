# SE Project Media Monitor Dashboard

This repo houses the dashboard code for our teams SE Capstone project at UTD. The central repo can be found [here](https://github.com/conniebc/SE4485).

### Installation and start up

To run, clone this repo and run ```npm install``` in the repo folder.

Create a .env folder in your source folder and copy the names from the .env.example.
The ```REACT_APP_SOURCE_X_URL``` should be set to the URL of the server hosting the video (```http://localhost:8080/video``` is a likely one if you're using the [Stream Simulator](https://github.com/feiyan16/Stream-Simulator)). ```REACT_APP_MONITOR_URL``` should be set to the URL of the websocket from the [Monitor](https://github.com/feiyan16/Monitoring-Module). ```http://localhost:5555/``` is the default set in the [main.py](https://github.com/feiyan16/Monitoring-Module/blob/master/main.py) right now.
