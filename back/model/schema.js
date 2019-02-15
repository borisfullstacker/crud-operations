const mongoose= require('mongoose');

const schema=mongoose.Schema

const workers= new schema({
    hours: {
        type:Number,
        required:[true,"Plese insert a number"]
    },
    name:{
        type:String,
        required:true
    },
    pic:{
        type:String,
    }
})


const Mymodel= mongoose.model('workers',workers)
module.exports =Mymodel;