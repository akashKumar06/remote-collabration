import { Connection } from "../db/connection";
const express = require("express")
const cors= require("cors")
const signupModel= require('../models/user.model')

const app =express()
app.use(express.json())
app.use(cors())

app.post('/signup',(req,res)=>{
    signupModel.create(req.body)
    .then(signup=> res.json(signup))
    .catch(err=> res.json(err))
})

app.post("/login",(req,res)=>{
    const {email,password} = req.body;
    signupModel.findOne({email:email})
    .then(user=>{
       if(user){ 
        if(user.password===password){
            res.json("Success")
        }
        else{
            res.json("the password is incorrect")
        }
    } else{
        res.json("No record existed")
    }
    })
})