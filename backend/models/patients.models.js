const mongoose=require("mongoose");

const patientSchema=new mongoose.Schema({
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

const Patient=mongoose.model("Patient",patientSchema);
module.exports=Patient;