const mongoose=require("mongoose");

const insurerSchema=new mongoose.Schema({
      userName:{
            type:String,
            required:true
      },
      email:{
            type:String,
            required:true
      },
      password:{
            type:String,
            required:true
      }
})

const Insurer=mongoose.model("Insurer",insurerSchema);
module.exports=Insurer;