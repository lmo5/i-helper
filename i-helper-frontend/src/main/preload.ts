import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('iHelper', {
  sendMessage: (message: string) => ipcRenderer.invoke('send-message', message),
  // Add more exposed functions for other features as needed
});