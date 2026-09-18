//zod 
const { z } = require('zod');

const loginValidation = z.object({
      email: z.string().email(),
      password: z.string().min(4).max(100),
});

module.exports = loginValidation;