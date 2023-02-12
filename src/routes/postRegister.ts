import bodyParser from "body-parser";
import { Application } from "express-ws";
import { createUser } from "../repositories/userRepository";
import { findUserByEmail } from "../repositories/userRepository";

export function postRegister(app:Application){
    app.post('/register', bodyParser.urlencoded(), 
    async(req, res) =>{
        const email = req.body.email;
        const name = req.body.name;

        if(!email || !name){
            res.status(400).send('Bad Request')
            return
        }
        else{
          const existingUser = await findUserByEmail(email);
        if (existingUser) {
            res.status(400).send('Email already used');
            return
        }
        else
        {
        const user = await createUser(name, email)
        res.cookie('ssid', user.id, {signed:true, httpOnly:true, sameSite:true});
        res.redirect('/');}}
    })
}