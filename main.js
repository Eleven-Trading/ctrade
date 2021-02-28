/***************************************************
 * REQUIRE
 ***************************************************/
const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev');
if (isDev) {
    console.log('Running in development');
    require('electron-reload')(__dirname, {
        electron: require('${__dirname}/../../node_modules/electron')
    })
} else {
    console.log('Running in production');
}

/***************************************************
 * FUNCTIONS
 ***************************************************/


/***************************************************
 * VARIABLES
 ***************************************************/
let window = undefined
var windowWidth = 700
var windowHeight = 50

/***************************************************
 * APP
 ***************************************************/
app.whenReady().then(() => { createWindow()})



/***************************************************
 * DECLARE WINDOW
 ***************************************************/
let createWindow = () => {
    window = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        frame: false,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInSubFrames: true
        }
    })
    window.webContents
        .executeJavaScript('localStorage.getItem("screenSize")', true)
        .then(result => {
            if (result != null) {
                var screenSize = JSON.parse(result)
                var screenWidth = screenSize.monitorWidth
                var screenHeight = screenSize.monitorHeight

                window.setSize(screenWidth,screenHeight)
            }
        });

    window.loadURL(`file://${path.join(__dirname, 'index.html')}`)

}


/***************************************************
 * APP QUIT
 ***************************************************/
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
