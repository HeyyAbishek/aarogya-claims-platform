const bcrypt=require('bcryptjs');
const passwordHash=async (password)=>{

      return await bcrypt.hash(password,10);
}
module.exports=passwordHash;