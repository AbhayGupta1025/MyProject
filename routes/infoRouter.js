const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Info = require('../models/info');
//const cors = require('./cors');
//var authenticate = require('../../Backend/authenticate');
const infoRouter = express.Router();
infoRouter.use(bodyParser.json());







infoRouter.route('/')
//.options( (req,res)=>{ res.sendStatus(200); })
.get(  (req,res,next)=> {
    Info.find({},(err,infos)=>{
        if(err){
            res.statusCode = 400;
            var err = new Error('First you have to fill the form')
            res.send(err);
        }
        else{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(infos);
            return;
        }
    })
   // .populate('user')
})
.post(  (req,res,next)=>{
    //console.log('hello');
    Info.findOne({email: req.body.email},(err,info)=>{
        if(err){
            res.statusCode = 400;
            res.send(err);
        }
        else if (!err && info !== null){
            res.statusCode = 400;
            var err = new Error('You have already filled the form')
            res.send(err);
            //console.log()
        }
        else{
            info = new Info({email: req.body.email});
            
            info.age = req.body.age;
            info.gender = req.body.gender;
            info.country = req.body.country;
            info.facetype = req.body.facetype;
            info.facetone = req.body.facetone;
            info.bodytype = req.body.bodytype;            
            info.save((err, info)=>{
                if(err){
                    res.statusCode = 400;
                    var err = new Error('Form is not filled correctly');
                    res.send(err);
                }
                else{
                    res.statusCode=200;
                    res.setHeader('Content-Type','application/json');
                    res.json({status: "OK"});
                    //console.log('You have filled form correctly');
                }
            });

        }
    });
        
        //console.log(req.body);
});/*
.put( (req,res,next)=>{
res.statusCode = 403;
res.end('PUT operation  not supported on /infos');
})

.delete( authenticate.verifyAdmin,(req,res,next)=>{
    Infos.remove(req.query)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>console.log(err))
    .catch((err)=> console.log(err)); 
});
         
    */
               







/*

infoRouter.route('/:infoId')
//.options( (req,res)=>{ res.sendStatus(200); })
.get(  (req,res,next)=> {
    Info.findOne({email: req.query.email})
    //.populate('comments.author')
    .then((info)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(info);
    }, (err)=>console.log(err))
    .catch((err)=>console.log(err));
})
.post( (req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /infos/'+req.params.infoId);
})
.put( (req,res,next)=>{

    res.statusCode = 403;
    res.end('PUT operation not supported on /infos/'+req.params.infoId);
})

.delete( authenticate.verifyAdmin,(req,res,next)=>{
  
    res.statusCode = 403;
    res.end('DELETE operation not supported on /infos/'+req.params.infoId);
  
});*/







module.exports = infoRouter;