const {z}=require('zod');

const claimFormValidation=z.object({
      userName:z.string().min(1).max(100),
      email:z.string().email(),
      claimAmount:z.string(),
      claimDescription:z.string().min(1).max(500),
});

module.exports=claimFormValidation;