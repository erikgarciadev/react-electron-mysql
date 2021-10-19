// Modules to control application life and create native browser window
const {  BrowserWindow } = require('electron')
const { getConnection } = require('./database')
const path = require('path')
const isDev  = require('electron-is-dev')

require('@electron/remote/main').initialize()

async function createProduct(product){
    try{
        const conn = await getConnection()
        product.price = parseFloat(product.price)
        const result = await conn.query('INSERT INTO product SET ?', product)   

        product.id = result.insertId
        return product
    }catch(err){
        console.log(err)
    }
}

let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 520,
        height: 660,
        // resizable: false,
        // maximizable: false,
        // fullscreenable: false,
        // frame: false,
        webPreferences: {
            // preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    // and load the index.html of the app.
    // mainWindow.loadURL('http://localhost:3000')
    mainWindow.loadURL(
        isDev 
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    )

    require("@electron/remote/main").enable(mainWindow.webContents)
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
    // if (isDev) {
    //     mainWindow.webContents.openDevTools({ mode: 'detach' });
    // }
}

module.exports  = {
    createWindow,
    createProduct
}

