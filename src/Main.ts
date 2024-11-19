import { app, BrowserWindow, ipcMain } from "electron";
import * as path from 'path';
export default class Main {
    static application: Electron.App;
    static mainWindow: Electron.BrowserWindow;
    static main(): void
    {
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    }

    static onWindowAllClosed(): void {
        // MacOS requires explicit closing
        if (process.platform !== 'darwin')
            Main.application.quit();
    }

    static onReady(): void {
        Main.createMainWindow();
    }
    private static onClose(): void {
        Main.mainWindow.destroy();
    }

    private static createMainWindow(): void {
        this.mainWindow = new BrowserWindow({
            height: 600,
            width: 800,
            // remove the default titlebar
            titleBarStyle: 'hidden',
            // expose window controlls in Windows/Linux
            ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
            webPreferences: { preload: path.join(__dirname, "preload.js") }
        });

        this.mainWindow.loadFile("../index.html")
    }
}