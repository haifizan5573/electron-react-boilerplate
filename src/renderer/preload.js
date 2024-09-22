const { contextBridge, ipcRenderer } = require('electron');

// Safely expose ipcRenderer to the renderer process
contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, callback) => ipcRenderer.on(channel, callback),
  apiUrl: process.env.API_URL || 'http://localhost:8000/api',
});
