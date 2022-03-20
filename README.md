# nodejs-lidar

A Simple NodeJS server that listens for Lidar measurements on UDP and puts them on a Realtime Graph. This uses the TF Mini+ Lidar which connects to the Raspberry Pi over the UART. We use the [tfmini agent](https://github.com/lloydroc/tfmini_agent) to interface.

A detailed explanation and guide is [here](https://lloydrochester.com/post/hardware/realtime-lidar-nodejs/).

# Install NodeJS

This was done on a Raspberry Pi 4. Since there are multiple builds for ARM in Node you may have to find the correct one. Here is how I installed `node`.

```
wget https://nodejs.org/dist/v16.14.0/node-v16.14.0-linux-armv7l.tar.gz
tar xf node-v16.14.0-linux-armv7l.tar.gz
cd node-v16.14.0-linux-armv7l/
echo 'export PATH=$PATH:$HOME/node-v16.14.0-linux-armv7l/bin' >> ~/.bashrc
```

You'll know this will work if you an type:
```
$ which node
/home/pi/node-v16.14.0-linux-armv7l/bin/node
$ node --help
some stuff
```

# Install dependencies

We only have `socket.io` and `node-static` as dependencies.

```
npm install
```

# Run the server

Simply run the server which listens on port `8081` for UDP and `8080` for HTTP.

```
$ node server.js
```
