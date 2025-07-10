const express = require('express');
const AsyncHandler = require('../utils/AsyncHandler');
const mongoose = require('mongoose');
const route = express.Router();
const Group = require('../models/Group')
const User = require('../models/User')
//middleware protect
const protect = require('../middlewares/AuthMiddlewares')
// contoh login.js
const jwt = require('jsonwebtoken');
// login route
/*
route.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, 'SECRET', { expiresIn: '1d' });

  res.status(200).json({ token });
});

route.post('/register',AsyncHandler(async(req,res) => {
    const {name,email,password} = req.body;
    if(!name||!email||!password){
        return res.status(400).json({error:'not found'})
    };
    // save ke mongoDb
    const newUser = await User.create({name,email,password});
    res.status(200).json({message:'registered',
        dat:newUser
    })
}))
*/
route.post('/api/group/post',AsyncHandler(async(req,res) => {
    // get body
    // memberEmail return lits
    const {name,description,memberEmail} = req.body;
    //req.user
    //const creation = req.user
    /*if(!name||!description||!memberEmail|| !Array.isArray(memberEmail)){
        return res.status(400).json({error:'data name dan descriptioon tidak boleh kosong'})
    }*/
    // check email yang diinput ke User.Post
    // cari di User mongoDb
    /*
    const memberIn = await User.find({email : {$in:memberEmail}});
    // ambil id dari user
    const memberId = memberIn.map((i) => i._id.toString());
    if(!memberId.includes(creation._id.toString())){
        //masukan juga creatin ke memberId
        memberId.push(creation._id.toString())
    }*/
    //convert kembali ke Object
    // 2. Konversi kembali ke ObjectId sebelum disimpan // pastikan ini sudah ada
    /*const memberIdObj = memberId.map(id => new mongoose.Types.ObjectId(id));*/
    
    // save to mongodb
    //await Group.create({name,description,members:memberIdObj});
    await Group.create({name,description})
    res.status(200).json({status:'data sukses ditambahkan'
    })
}))
//get all the data
route.get('/api/dashboard',AsyncHandler(async(req,res) => {
    // get all data in mongoDb
    const getData = await Group.find({});
    res.json(getData);
}))

//buat ngeload di form update biar tinggal edit existing text
route.get('/api/group/:id',AsyncHandler(async(req,res) => {
    // get param
    const {id} = req.params;
    //mongodb
    const search = await Group.findById(id);
    if(!search){
        return res.json(404).json({error:'Group Not Found'})
    }
    res.json({
        name:search.name,
        description: search.description,
        addMember: search.addMember,
    });
}))
// update
route.post('/api/group/:id',AsyncHandler(async(req,res) => {
    // update mongodb
    // get param id
    const {id} = req.params;
    //ambil body
    const {name,description} =  req.body;
    // update di mongoDb
    const upd = await Group.updateOne({_id:id},{name,description});
    res.status(200).json({status:'data update'})
}))

route.delete('/api/group/:id',AsyncHandler(async(req,res) => {
    // ambil param
    const {id} = req.params;
    // delete in mongodb
    const deleted = await Group.findByIdAndDelete(id);
    res.status(200).json({
        message:'deleted success',
        data:deleted,
    })
}))
module.exports = route;
