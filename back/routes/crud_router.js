const express = require('express');
const router = express.Router();
const workerController= require('../model/schema')



router.get('/', async function (req,res){
    try{
         let workers= await workerController.find({})
         res.json(workers.reverse());
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/',async function (req,res) {
    console.log(req.body);
 try{
    let worker=  new workerController(req.body)
    let result= await worker.save()
    res.json(result)
 }catch(err){
     console.log("in catch",err);
     res.status(500).json(err);

 }

});

router.put('/:id',async function(req,res){
    try{
          let id=req.params.id;
          let result= await workerController.findOneAndUpdate({_id:id},req.body,{runValidators: true})
          res.json(result);
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
});

router.delete('/:id',async function(req,res){
    try{
      let id=req.params.id;
      let result= await workerController.findByIdAndRemove({_id:id})
      res.json(result);
    }catch(err){
        console.log("in catch",err)
        res.status(500).send(err);
    }
});


module.exports = router;
