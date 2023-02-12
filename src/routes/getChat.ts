import express from "express";
import { Application } from "express-ws";
import path from "path";

export function getChat(app:Application){
    app.get('/chat', (req, res) => {
        if (req.signedCookies.ssid){
            res.sendFile(path.join(__dirname, '../../pages/chat.html'))
            return
        }
        res.redirect('/')
    
      })
}